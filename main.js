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

// Promise.all()
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

/* 
todo 13-17 Доп методы параллельного кода
метод Promise.race() позволяет взять несколько запросов, но вернется самый быстрый из выполненных
Также как и All принимает в себя массив, потому что мы передаем несколько запросов
При вызове результата в консоль, res[0] (или res, не важно), выйдет самый быстрый результат
Чем может быть полезен -
тогда, когда данные пользователь пытается получить, они идут слишком долго или у него плохое интернет соединение
И мы как программисты должны решать эту проблему, если загрузка идет слишком долго
Как это сделать?!
Нужно создать свой собственный запрос, например запрос на 3 сек. И этот запрос нужно поместить в этот Promise.race. Тем самым  сработает либо функция которая загрузит данные, либо функция, которая сработает после 5 сек и выведет сообщение, что вы ждали слишком долго.
Создадим функцию timeout(sec)
Затем создадим еще один Promise.race, скопируем туда первый fetch из const res = await Promise.race()
Там сравним этот скопированный fetch и timeout. Также применим к этому race.then.catch


* Следующий метод Promise.allSettled()
Оч похоже на Promise.all()
Но в отличие от него вернет результат промисов, которые были выполнены, вне зависимости от того будет ли какой-либо из промисов отклонен
! В Promise.all(), если один из промисов будет отклонен, то остальное тоже работать не будет 
В консоли Promise.allSettled работает и выдает результат массива даже с отрицательным promise
А в Promise.all не вывел массив, но выдал только ошибку

* Следующий метод Promise.any()
Возвращает первый выполненный Promise
Вернул "Выполнен", даже если в списке есть отклоненные
Но если все promise будут отклонены, то будет ошибка
*/

// Promise.race()
(async function () {
  const res = await Promise.race([
    fetch(`https://restcountries.com/v3.1/name/usa`).then((res) => res.json()),
    fetch(`https://restcountries.com/v3.1/name/japan`).then((res) =>
      res.json()
    ),
    fetch(`https://restcountries.com/v3.1/name/canada`).then((res) =>
      res.json()
    ),
  ]);
  console.log(res); // Первым сработал Japan, во второй раз USA
})();

function timeout(sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Ожидание превысило ${sec} секунд`));
    }, sec * 1000);
  });
}
Promise.race([
  fetch(`https://restcountries.com/v3.1/name/usa`).then((res) => res.json()),
  timeout(0.4),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.log(err)); // Ожидание превысило 0.4 секунд

// Promise.allSettled()
Promise.allSettled([
  Promise.resolve("Выполнен"),
  Promise.reject("Отклонен"),
  Promise.resolve("Еще один Выполнен"),
]).then((res) => console.log(res));

// Сравним с Promise.all()
// Promise.all([
//   Promise.resolve("Выполнен"),
//   Promise.reject("Отклонен"),
//   Promise.resolve("Еще один Выполнен"),
// ]).then((res) => console.log(res));

// Promise.any()
Promise.any([
  Promise.resolve("Выполнен"),
  Promise.reject("Отклонен"),
  Promise.resolve("Еще один Выполнен"),
]).then((res) => console.log(res));
