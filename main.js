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

function getCountryData(country) {
  // Страна1

  function getJSON(url, errorMsg = "Что-то пошло не так.") {
    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error(`${errorMsg}(${response.status})`);
      }
      return response.json();
    });
  }

  const request = fetch(`https://restcountries.com/v3.1/name/${country}`);

  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Страна не найдена")
    .then((data) => {
      renderCards(data[0]);
      const neighbor = data[0].borders;
      // const neighbor = "dfsfssgdsd";
      if (!neighbor) {
        throw new Error("Не найдено соседей");
      }
      // Страна сосед
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        "Страна не найдена"
      ).then((data) => {
        const [res] = data;
        renderCards(res, "neighbour");
      });
    })
    .catch((err) => renderError(`Что-то пошло не так из-за ошибки: ${err}.`))
    .finally(() => (countriesContainer.style.opacity = 1));
}

btn.addEventListener("click", function () {
  getCountryData("australia");
});

/* 
todo 13-12 Промисификация часть 2
Избавимся от navigator API в синтаксис промисов и избавимся от callbackов в callbackах
*/
// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     const { latitude } = position.coords;
//     const { longitude } = position.coords;
//     // Используем API для обратной геолокации
//     fetch(
//       `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=421447806752157919442x96444`
//     )
//       .then(function (response) {
//         if (!response.ok) {
//           throw new Error(`Что-то пошло не так. (${response.status})`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         const country = result.country;
//         // Чтобы вставить в API для определения страны, сделаем вернем новый fetch запрос о стране
//         return fetch(`https://restcountries.com/v3.1/name/${country}`);
//       })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         renderCards(data[0]);
//       })
//       .catch((err) => renderError(`Что-то пошло не так из-за ошибки: ${err}.`))
//       .finally(() => (countriesContainer.style.opacity = 1));
//   },
//   function () {
//     alert("Вы не предоставили доступ к своей локации");
//   }
// );

// Перепишем этот код, используя промисификацию
new Promise(function (resolve, reject) {
  // navigator.geolocation.getCurrentPosition(
  //   function (position) {
  //     resolve(position);
  //   },
  //   function (err) {
  //     reject(err);
  //   }
  // );
  navigator.geolocation.getCurrentPosition(resolve, reject); // Т.е. говорим промису - запиши в result результат выполнения getCurrentPosition, а в reject при отрицательном
})
  // Так создали промис. Теперь обратимся к pos + используем then
  .then(function (data) {
    // В data будут лежать данные позитивного ответа
    console.log(data);
    // Если нужно вернуть какие-т о данные для другого API, можем дальше return ... ).then и пошла возня
  });

/* 
todo 13-13 Как работает async await
Это еще один синтаксический сахар.
Позволяет упростить работу с промисами, избавиться от лишних слов return и лишних callback и даже лишних методов.
Эта надстройка появилась в районе 2017 года
Async работает именно с ФУНКЦИЯМИ
Async делает функцию асинхронной, т.е. не блокирует выполнение кода после функции
Await работает с промисом, можно сказать заменяет then. И говорит "дождись ответ"
В таком варианте мы получим результат, который получали после первого then, в формате JSON, который нужно конвертировать
И можем воспользоваться json(), потом опять then, чтобы получить данные. Но у нас же есть await, поэтому применим его
Для демонстрации что функция асинхронная, сделаем следующее:
Перед ее объявлением выведем в консоль текст
*/
// Async/Await
async function getCountry(country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  console.log(data);
}
console.log("Hello");
getCountry("usa");

// Что лучше? То что тут, по старому fetch....then....then или код выше
// function getCountry1(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
// getCountry1("usa");
