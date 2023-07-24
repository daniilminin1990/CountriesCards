"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const request1 = new XMLHttpRequest();
request1.open("GET", "https://meowfacts.herokuapp.com/?count=3");
request1.send();

request1.addEventListener("load", function () {
  const data = JSON.parse(request1.responseText);
  console.log(data);
  const [text1, text2, text3] = data.data;
  console.log(text1);
  console.log(text2);
  console.log(text3);
});

// Функция запроса данных стран создает карточки + рендер карточки на странице
// function getCountryData(country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   // Функция использует данные с сервера для использования в HTML коде
//   function renderCards(data, className = "") {
//     const html = `<article class="country ${className}">
//       <img class="country__img" src="${data.flags.svg}" />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${data.population}</p>
//         <p class="country__row"><span>🗣️</span>${
//           Object.entries(data.languages)[0][1]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           Object.entries(Object.entries(data.currencies)[0][1])[0][1]
//         }</p>
//       </div>
//     </article>`;

//     // Выводим на страницу карточку и убираем нулевую прозрачность
//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   }

//   // Выполняем действия с данными после их загрузки
//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);

//     // Выводим на страницу карточку с первой страной
//     renderCards(data);
//     const neighbor = data.borders[0];
//     console.log(neighbor);

//     // Создаем запрос к серверу внутри первой call-back функции
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();
//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(this.responseText);

//       // Выводим на страницу карточку страны соседа
//       renderCards(data2, "neighbour");
//     });
//   });
// }

// getCountryData("russia");

function renderCards(data, className = "") {
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

  // Выводим на страницу карточку и убираем нулевую прозрачность
  countriesContainer.insertAdjacentHTML("beforeend", html);
}

// function getCountryData(country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCards(data[0]);
//     });
//   console.log(request);
// }
// getCountryData("russia");

// function getCountryData(country) {
//   // Страна1
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderCards(data[0]);
//       const neighbor = data[0].borders[0];
//       console.log(neighbor);

//       // Страна сосед
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (data) {
//           const [res] = data;
//           console.log(data); // получили страну соседа в формате массива
//           console.log(res); // получили страну соседа в формате объекта
//           renderCards(res, "neighbour");
//         });
//     });
//   console.log(request);
// }
// getCountryData("usa");

function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
}

/// Обработка ошибок

//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`);
//   console.log(request);
//   request
//     .then((response) => {
//       console.log(request);
//       console.log(response);

//       if (!response.ok) {
//         throw new Error(`Страна не найдена ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       renderCards(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = "asdaqs";

//       // Страна сосед
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Страна не найдена ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           const [res] = data;
//           renderCards(res, "neighbour");
//         });
//     })
//     .catch((err) =>
//       renderError(
//         `Что-то пошло не так из-за ошибки: ${err}. Попробуйте перезагрузить страницу или зайдите позже`
//       )
//     )
//     .finally(() => (countriesContainer.style.opacity = 1));
// }

// btn.addEventListener("click", function () {
//   getCountryData("usa");
// });

//
// Обработка ошибок через внешнюю функцию

// function getCountryData(country) {
//   // Страна1

//   function getJSON(url, errorMsg = "Что-то пошло не так.") {
//     return fetch(url).then(function (response) {
//       if (!response.ok) {
//         throw new Error(`${errorMsg}(${response.status})`);
//       }
//       return response.json();
//     });
//   }

//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`);

//   getJSON(`https://restcountries.com/v3.1/name/${country}`, "Страна не найдена")
//     .then((data) => {
//       renderCards(data[0]);
//       const neighbor = data[0].borders;
//       // const neighbor = "dfsfssgdsd";
//       if (!neighbor) {
//         throw new Error("Не найдено соседей");
//       }
//       // Страна сосед
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbor}`,
//         "Страна не найдена"
//       ).then((data) => {
//         const [res] = data;
//         renderCards(res, "neighbour");
//       });
//     })
//     .catch((err) => renderError(`Что-то пошло не так из-за ошибки: ${err}.`))
//     .finally(() => (countriesContainer.style.opacity = 1));
// }

// btn.addEventListener("click", function () {
//   getCountryData("australia");
// });

/* 
todo 13-9 Практика, появление карточки исходя из местоположения
С помощью стороннего API получали координаты страны и использовали в API, который рендерит карточку
Это эмуляция той задачи, которую дадут на работе
Подсказки:
1) Использовать API, встроенный в браузер, окошко, которое дает разрешение на определение моей геолокации. Скопировать координаты, вставить в другой API, который определит страну, а это значение вставить в наш выше написанный код
Допустим координаты я получу, но вот как определить страну по координатам?! Ответа нет, идем в гугл
https://geocode.xyz/api
Там есть строка Reverse Geocoding
curl 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'
Нам понадобится только https, причем нужен правильный формат. Здесь написано, что формат XML. Поменяем на JSON.
Но что после xml - запрос и какой-то api_key
api_key это ключ, который можно получить после регистрации (и оплаты сервиса), который как раз вставляется после auth=. В бесплатной версии срабатывает запрос 1 раз в сек. В зарегистрированных - 10 раз в сек. Если оплатить - больше. 1 клик сколько-то стоит
'https://geocode.xyz/51.50354,-0.12768?geoit=json&auth=421447806752157919442x96444'
*/

// Определяем координаты. Считай по-новой все написали, только без кнопки
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude); // 51.0966193 71.4245694
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`); // https://www.google.com/maps/@51.0966193,71.4245694

      // Используем API для обратной геолокации
      fetch(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=421447806752157919442x96444`
      )
        .then(function (response) {
          if (!response.ok) {
            throw new Error(`Что-то пошло не так. (${response.status})`);
          }
          return response.json();
        })
        .then((result) => {
          const country = result.country;
          // Чтобы вставить в API для определения страны, сделаем вернем новый fetch запрос о стране
          return fetch(`https://restcountries.com/v3.1/name/${country}`);
        }) // здесь продолжим этот fetch через then
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          renderCards(data[0]);
        })
        .catch((err) =>
          renderError(`Что-то пошло не так из-за ошибки: ${err}.`)
        )
        .finally(() => (countriesContainer.style.opacity = 1));
    },
    function () {
      alert("Вы не предоставили доступ к своей локации");
    }
  );
}
