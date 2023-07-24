"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

// const request1 = new XMLHttpRequest();
// request1.open("GET", "https://meowfacts.herokuapp.com/?count=3");
// request1.send();

// request1.addEventListener("load", function () {
//   const data = JSON.parse(request1.responseText);
//   console.log(data);
//   const [text1, text2, text3] = data.data;
//   console.log(text1);
//   console.log(text2);
//   console.log(text3);
// });

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

// btn.addEventListener("click", function () {
//   getCountryData("australia");
// });

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

// * Async/Await
async function getCountry(country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) {
      throw new Error("У вас нет интернета");
    }
    const data = await res.json();

    return `Ваша страна ${data[0].name.common}`;
  } catch (err) {
    throw new Error("Что-то пошло не так");
  }
}
// getCountry("usa");

btn.addEventListener("click", function () {
  getCountry("usa");
});

const cont = getCountry("usa");
console.log(cont);

// Возврат данных через .then.catch
getCountry("usa")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });

// Возврат данных с помощью async/awiat
(async function () {
  try {
    const city = await getCountry("usa");
    console.log(city);
  } catch (err) {
    console.log(err);
  }
})();

/* 
todo 13-16 Параллельное выполнение promises
МЕТОД для Promise.ALL
Позволяет загрузить асинхронные данные синхронно
Для ситуаций, когда запустили несколько promise, но они должны выполняться в одно и то же время, т.е. работать параллельно
! Когда используешь async/await обязательно используй try catch

Получили 3 массива с названиями столиц
В консоли видно, что данные запрашиваются по очереди и на трафик тратится порядка 300-500 мс, почти полсекунды на каждый запрос.
Но нам не нужно, чтобы они выполнялись по очереди, это долго
А как сделать их одновременно?!
Используем метод Promise.All
Метод All в массив принимает запросы, которые будут выполняться одновременно. Создадим эти запросы
Теперь все загрузилось в одно и то же время
*/
async function get3Capital(c1, c2, c3) {
  try {
    // const response1 = await fetch(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data1] = await response1.json();

    // const response2 = await fetch(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data2] = await response2.json();

    // const response3 = await fetch(`https://restcountries.com/v3.1/name/${c3}`);
    // const [data3] = await response3.json();

    const data = await Promise.all([
      fetch(`https://restcountries.com/v3.1/name/${c1}`).then((res) =>
        res.json()
      ),
      fetch(`https://restcountries.com/v3.1/name/${c2}`).then((res) =>
        res.json()
      ),
      fetch(`https://restcountries.com/v3.1/name/${c3}`).then((res) =>
        res.json()
      ),
    ]);
    const dataAll = data.map(function (val) {
      return val[0].capital[0];
    });
    console.log(dataAll);
  } catch (err) {
    console.log(err);
  }
}
get3Capital("belarus", "russia", "turkey");
