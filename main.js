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
    return country.name.common;
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

  const filteredNames = [];
  for (let countryName of countryNames) {
    if (countryName.substring(0, value.length).toLowerCase() === value) {
      filteredNames.push(countryName);
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

  removeAutocompleteDropdown();
}

// inputEl.addEventListener('keyup', (e) => {
//   if (e.code === 'Enter') {
//     console.log(buttonEl.innerHTML);
//     // if(buttonEl.innerHTML === )
//     console.log('enter was pressed');
//   }
// });

// // Функция использует данные с сервера для использования в HTML и рендерит карточку
// function renderCards(data, className = '') {
//   const html = `<article class="country ${className}">
//         <img class="country__img" src="${data.flags.svg}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${data.population}</p>
//           <p class="country__row"><span>🗣️</span>${
//             Object.entries(data.languages)[0][1]
//           }</p>
//           <p class="country__row"><span>💰</span>${
//             Object.entries(Object.entries(data.currencies)[0][1])[0][1]
//           }</p>
//         </div>
//       </article>`;
//   // Выводим на страницу карточку и убираем прозрачность
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = '1';
// }
// // Функция запрашивает данные для страны и создает карточку
// function getCountryData(country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   // Выполняем действия с данными после их загрузки
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     const neighbour = data.borders[0];
//     // Вывод карточки с первой страной
//     renderCards(data);

//     // Запрос нк сервеу внутри первой call-back функции
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();
//     // // Выполнение доействий с данными после их щагрузки
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       // Выврл на страницу карточки соседней страны
//       renderCards(data2, 'neighbour');
//     });
//   });
// }
// btn.addEventListener('click', () => {
//   getCountryData('usa');
// });

// * Fetch - делаем то же самое, что сверху, но с Fetch
/*
function getCountryData (country) {
  const request = fetch('https://restcountries.com/v3.1/name/${country}')
  console.log(request); // Promise {<pending>}
}
getCountryData('russia')
  В fetch() параметр передаем URL откуда получаем данные. В отличие от XMLHttpRequest не пишем open (соответственно и GET), send, Это подставляется автоматически
  Выводя результат fetch в консоль, мы видим результат - Promise
  Promise - некий контейнер, в который получаю данные от fetch, либо в случае негативного ответа сделать действие
  Т.е. сейчас функция fetch стала Promise, к которой мы можем применить метод THEN - метод создания хранилища статусов. Оно используется для трансформации Promise
  Это хранилище статусов очень похоже на некоторые свойства XMLHttpRequest.
  Можно сказать, что THEN для FETCH, это аналогия SEND для XMLHTTPREQUEST
  Fetch('URL').THEN(function(response){})...

  const request = fetch('https://restcountries.com/v3.1/name/${country}').THEN(function(response){console.log(response)}) ;  // Response - Куча статусов

  НО ГДЕ ДАННЫЕ?!
  ОНИ В THEN, но в формате JSON. И чтобы перевести из JSON в объект тут используем не стандартный парс, а именно МЕТОД JSON.
  smth.json().
  Так мы тоже получим промис

  const request = fetch('https://restcountries.com/v3.1/name/${country}').THEN(function(response){console.log(response.json)}); // очередной Promise, но у которого есть PromiseResult - массив данных

  Так как это опять промис, мы будем опять использовать THEN
  const request = fetch('https://restcountries.com/v3.1/name/${country}')
  .THEN(function(response){
  return response.json
  }).THEN(function(data){console.log(data)});

  И еще раз. FETCH
  1) создаем запрос const request = fetch('URL') - получаем промис - хранилище для запросов Fetch
  2) .then(callback(response){return response.json()] - трансформируем промис в статусы и внутри конвертируем из json в нужный формат, объекта или массва ; Но это опять промис
  3) .then(callBack(data) {return data} - трансформируем еще один промис, уже получаем нормальные данные
*/

//asdasdasdasdasdaasdasdsa
//asdasdasdasdasdaasdasdsa
//asdasdasdasdasdaasdasdsa
//asdasdasdasdasdaasdasdsa
//asdasdasdasdasdaasdasdsa

// Fetch без обработки ошибок
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
//   countriesContainer.style.opacity = 1;
// }

// function getCountryData(country) {
//   // Страна
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCards(data[0]);
//       const neighbour = data[0].borders[0];
//       // Страна сосед
//       // Чтобы не было адской пирамиды вызовов, делаем return
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           // деструктурируем, т.к. data - массив и flags прочесть не получится, будет ругаться
//           const [res] = data;
//           console.log(res);
//           renderCards(res, 'neighbour');
//         });
//     });
// }
// btn.addEventListener('click', () => {
//   getCountryData('usa');
// });

//! Fetch с обработкой ошибок, например нет соединения или Страна не найдена или соседних стран нет + добавили все соседние страны
// function getCountryFromInput(){
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
// btn.addEventListener('click', () => {
//   getCountryData('austria');
// });

// dsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfds

//! Reverse geolocation fetch then
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
// function getJSON(url, errorMsg = 'Что-то пошло не так. ') {
//   return fetch(url).then((response) => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} ${response.status})`);
//     }
//     return response.json();
//   });
// }
// // Страна по геолокации
// function getCountryByLocation() {
//   // Определяем местоположение
//   navigator.geolocation.getCurrentPosition(
//     function (pos) {
//       const { latitude, longitude } = pos.coords;
//       console.log(latitude);
//       console.log(longitude);
//       fetch(
//         `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${reverseGeoApiKey}`
//       )
//         .then((response) => {
//           //         В случае ошибки
//           if (!response.ok) {
//             throw new Error(`Что то пошло не так (${response.status})`);
//           }
//           return response.json();
//         })
//         // Определяем страну по геолокации
//         .then((result) => {
//           console.log(result.results[0].country);
//           const country = result.results[0].country;
//           return fetch(`https://restcountries.com/v3.1/name/${country}`);
//         })
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data[0]);
//           renderCards(data[0]);
//           // Страна сосед и обработка если нет соседних стран
//           const neighbourData = data[0].borders;
//           if (!neighbourData) {
//             throw new Error(`соседних стран нет`);
//           }
//           const neighbour = data[0].borders[0];
//           return getJSON(
//             `https://restcountries.com/v3.1/alpha/${neighbour}`
//           ).then((data) => {
//             const [res] = data;
//             renderCards(res, 'neighbour');
//           });
//         })
//         .catch(function (err) {
//           renderError(`Что-то пошло не так из-за ошибки ${err.message}.`);
//           console.log(err);
//         })
//         .finally(() => {
//           countriesContainer.style.opacity = 1;
//         });
//     },
//     function () {
//       alert('Вы не передали свою гео-локацию');
//     }
//   );
// }

// btn.addEventListener('click', () => {
//   getCountryByLocation();
// });

// new Promise(function (result, reject) {
//   navigator.geolocation.getCurrentPosition(result, reject);
// }) // Когда нам не нужно присваивать ничего лишнего в result, а нужно просто дать результат, то можно и не создавать конструкцию  CallBack функции. Просто написать само ключевое слово из Promise и все.
//   .then(function (data) {
//     console.log(data);
//   });

// ! Async/Await переделать в
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
async function getJSON(url, errorMsg = 'Что-то пошло не так. ') {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${errorMsg} ${response.status})`);
  }
  return response.json();
}

async function getCountryData(country) {
  // Страна, и сообщение если страна не найдена
  try {
    const data = await getJSON(
      `https://restcountries.com/v3.1/name/${country}`,
      'Что-то пошло не так. Вероятно в названии страны допущена ошибка'
    );
    renderCards(data[0]);
    // Страны соседи
    const neighboursData = data[0].borders;
    if (!neighboursData) {
      throw new Error(`соседних стран нет`);
    }
    // Сделаем через Promise.all для одновременных запросов по каждому соседу. Массив для PromiseReults каждой соседней страны
    const neighboursFetches = neighboursData.map((neighbour) =>
      getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    );
    const neighbours = await Promise.all(neighboursFetches);
    for (const neighbourTitle of neighbours) {
      const [res] = neighbourTitle;
      renderCards(res, 'neighbour');
    }
  } catch (err) {
    renderError(`Что-то пошло не так из-за ошибки - ${err.message}.`);
  } finally {
    countriesContainer.style.opacity = 1;
  }
}

// ! Выведем несколько столиц. ПАРАЛЛЕЛЬНЫЙ Async/Await
// async function get3Capital(c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       fetch(`https://restcountries.com/v3.1/name/${c1}`).then(function (
//         response
//       ) {
//         return response.json();
//       }),
//       fetch(`https://restcountries.com/v3.1/name/${c2}`).then(function (
//         response
//       ) {
//         return response.json();
//       }),
//       fetch(`https://restcountries.com/v3.1/name/${c3}`).then(function (
//         response
//       ) {
//         return response.json();
//       }),
//     ]);
//     console.log(data.map((val) => val[0].capital.join(''))); // (3) ['Washington, D.C.', 'Ankara', 'Paris']
//   } catch (err) {
//     console.log(err);
//   }
// }
// get3Capital('usa', 'turkey', 'france');
/*

Если отключим интернет и нажмем на кнопку, то укажет на ошибку в Fetch - Uncaught (in promise)
Нам нужно отловить эту ошибку
ПЕРВЫЙ THEN имеет 2 параметра - 1-func что будет в ответе от URL, 2-функция на случай если нет ответа от URL и будет обрабатывать ошибки
Выведем в консоль, получаем не красное уведомление
TypeError: Failed to fetch
Копируем и вставляем эти обработки ошибок в первые .then
Но так долго, нудно, ебано, повторяющийся код. Есть способ убрать повторения обработки ошибок - CATCH

ИСПОЛЬЗУЕМ .CATCH после последнего then первого fetch ЧЕРЕЗ ТОЧЕЧНУЮ ЗАПИСЬ, т.е. цепочкой (если внутри вложенные есть, в противном случае после каждого последнего)
Так в консоли тоже выводятся отловленные ошибки.
Теперь добавим инфу для пользователя

Создадим отдельную функцию, которая будет обрабатывать ошибку и будем вставлять ее в этот CATCH

.FINALLY - метод с callback, который выполнится в любом случае, не важно, был положительный или отрицательный ответ от сервера.
Запись опять, как у THEN и у CATCH точечная
Туда можем складывать все то, что имеет повторения и не зависит от ошибок. В нашем случае это присвоение прозрачности объекту
  countriesContainer.style.opacity = 1;

Все заебись, все работает


Если название страны неверное, то будет ошибка - сервер не сможет понять и выдаст ошибку 404. Чтобы этого избежать, нужно использовать обработку этой ошибки **в ПЕРВОМ THEN функции FETCH**
Добавляем строки по условию

Немного раздражает, что есть повторающийся then. Чуть поколдуем - создадим функцию помощник
function getJSON.
Вставим туда url, первый then и затем эту функцию везде, где были первые then

И последнее - обработаем ошибку, если у страны нет соседей вовсе.
*/
