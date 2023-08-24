'use strict';

const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');
const reverseGeoApiKey = '2782861fb2944909b32da2a65d8946dc';
const inputEl = document.querySelector('.autocomplete-input');
const ulForAutocomplete = document.querySelector('.autocomplete-wrapper');
const dropdown = document.querySelector('.dropdown');

// ! ВНИМАНИЕ . УДАЛИ API ключ после auth= при релизе

// Fetch all countries
// const arrOfAllCountriesName = [];
// function getAllCountries() {
//   fetch(`https://restcountries.com/v3.1/all`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       data;
//       console.log(data);
//       for (const country of data) {
//         arrOfAllCountries.push([
//           country.name.common,
//           country.translations.rus.common,
//         ]);
//       }
//     });
// }
// getAllCountriesName();
// console.log(arrOfAllCountries);

// Async await all countries

let countryNames = [];
async function getAllCountriesName() {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();

  countryNames = data.map((country) => {
    return [country.name.common, country.translations.rus.common];
  });

  // country.translations.rus.common,
}
getAllCountriesName();

// Слушатель событий при вводе в input
inputEl.addEventListener('input', onInputChange);

// Функция отвечает за изменения в поле input, создает свой array, заполненный странами, которые совпадают по вводимым буквам
function onInputChange() {
  removeAutocompleteDropdown();
  const value = inputEl.value.toLowerCase();

  if (value.length === 0) return;

  // Идентификация языка при вводе в input
  const language = /[А-Яа-яЁё]/i.test(inputEl.value) ? 1 : 0;

  const filteredNames = [];
  // ! Выводится только на английском
  for (let countryName of countryNames) {
    if (
      countryName[language].substring(0, value.length).toLowerCase() === value
    ) {
      filteredNames.push(countryName[0]);
    }
  }
  console.log(filteredNames);
  createAutocompleteDropdown(filteredNames);
}
// Рендеринг выпадающего списка HTML элементов с классами и id
function createAutocompleteDropdown(list) {
  const listEl = document.createElement('ul');
  listEl.className = 'autocomplete-list';
  // Для удаления повторяюшегося выпадающего списка
  listEl.id = 'autocomplete-list';

  list.forEach((country) => {
    const listItem = document.createElement('li');
    const countryButton = document.createElement('button');
    countryButton.innerHTML = country;
    // Вызов onCountryButtonClick при нажатии
    countryButton.addEventListener('click', onCountryButtonClick);
    listItem.appendChild(countryButton);
    listEl.appendChild(listItem);
  });

  ulForAutocomplete.appendChild(listEl);
}

// Функция для удаления предыдущих элементов выпадающего списка
function removeAutocompleteDropdown() {
  const listEl = document.querySelector('#autocomplete-list');
  if (listEl) listEl.remove();
}

// Функция для выбора страны из списка + запуск getCountryData
function onCountryButtonClick(e) {
  e.preventDefault();
  const buttonEl = e.target;
  inputEl.value = buttonEl.innerHTML;

  getCountryData(inputEl.value);
  // Удаляем предыдущие загруженные карточки
  countriesContainer.innerHTML = '';
  removeAutocompleteDropdown();
}

//! Fetch с обработкой ошибок, например нет соединения или Страна не найдена или соседних стран нет + добавили все соседние страны
function renderCards(data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data.languages)[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.entries(Object.entries(data.currencies)[0][1])[0][1]
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}

// Рендер ошибки в HTML
function renderError(message) {
  countriesContainer.insertAdjacentHTML('beforeend', message);
}

// Функция fetch с пробросом ошибки
function getJSON(url, errorMsg = 'Что-то пошло не так. ') {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status})`);
    }
    return response.json();
  });
}

function getCountryData(country) {
  // Страна, и сообщение если страна не найдена
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Что-то пошло не так. Вероятно в названии страны допущена ошибка'
  )
    .then((data) => {
      renderCards(data[0]);

      // Страны соседи
      const neighboursData = data[0].borders;
      console.log(neighboursData);
      if (!neighboursData) {
        throw new Error(`соседних стран нет`);
      }
      // Сделаем через Promise.all для одновременных запросов по каждому соседу. Массив для PromiseReults каждой соседней страны
      const neighboursFetches = neighboursData.map((neighbour) =>
        getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`)
      );
      return Promise.all(neighboursFetches);
    })
    .then((neighbours) => {
      for (const neighbourTitle of neighbours) {
        const [res] = neighbourTitle;
        renderCards(res, 'neighbour');
      }
    })
    .catch(function (err) {
      renderError(`Что-то пошло не так из-за ошибки - ${err.message}.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

//! Reverse geolocation fetch then
// Страна по геолокации
function getCountryByLocation() {
  // Определяем местоположение
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const { latitude, longitude } = pos.coords;
      console.log(latitude);
      console.log(longitude);
      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${reverseGeoApiKey}`
      )
        .then((response) => {
          //         В случае ошибки
          if (!response.ok) {
            throw new Error(`Что то пошло не так (${response.status})`);
          }
          return response.json();
        })
        // Определяем страну по геолокации
        .then((result) => {
          console.log(result.results[0].country);
          const country = result.results[0].country;
          return fetch(`https://restcountries.com/v3.1/name/${country}`);
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data[0]);
          renderCards(data[0]);
          // Страна сосед и обработка если нет соседних стран
          const neighboursData = data[0].borders;
          console.log(neighboursData);
          if (!neighboursData) {
            throw new Error(`соседних стран нет`);
          }
          const neighboursFetches = neighboursData.map((neighbour) =>
            getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`)
          );
          return Promise.all(neighboursFetches);
        })
        .then((neighbours) => {
          for (const neighbourTitle of neighbours) {
            const [res] = neighbourTitle;
            renderCards(res, 'neighbour');
          }
        })
        .catch(function (err) {
          renderError(`Что-то пошло не так из-за ошибки ${err.message}.`);
          console.log(err);
        })
        .finally(() => {
          countriesContainer.style.opacity = 1;
        });
    },
    function () {
      alert('Вы не передали свою гео-локацию');
    }
  );
}

btn.addEventListener('click', () => {
  getCountryByLocation();
});

// ! Async/Await для вводимых в input
// function renderCards(data, className = '') {
//   const html = `<article class="country ${className}">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${data.population}</p>
//             <p class="country__row"><span>🗣️</span>${
//               Object.entries(data.languages)[0][1]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.entries(Object.entries(data.currencies)[0][1])[0][1]
//             }</p>
//           </div>
//         </article>`;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
// }

// // Рендер ошибки в HTML
// function renderError(message) {
//   countriesContainer.insertAdjacentHTML('beforeend', message);
// }

// // Функция fetch с пробросом ошибки
// async function getJSON(url, errorMsg = 'Что-то пошло не так. ') {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`${errorMsg} ${response.status})`);
//   }
//   return response.json();
// }

// async function getCountryData(country) {
//   // Страна, и сообщение если страна не найдена
//   try {
//     const data = await getJSON(
//       `https://restcountries.com/v3.1/name/${country}`,
//       'Что-то пошло не так. Вероятно в названии страны допущена ошибка'
//     );
//     renderCards(data[0]);
//     // Страны соседи
//     const neighboursData = data[0].borders;
//     if (!neighboursData) {
//       throw new Error(`соседних стран нет`);
//     }
//     // Сделаем через Promise.all для одновременных запросов по каждому соседу. Массив для PromiseReults каждой соседней страны
//     const neighboursFetches = neighboursData.map((neighbour) =>
//       getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     );
//     const neighbours = await Promise.all(neighboursFetches);
//     for (const neighbourTitle of neighbours) {
//       const [res] = neighbourTitle;
//       renderCards(res, 'neighbour');
//     }
//   } catch (err) {
//     renderError(`Что-то пошло не так из-за ошибки - ${err.message}.`);
//   } finally {
//     countriesContainer.style.opacity = 1;
//   }
// }
