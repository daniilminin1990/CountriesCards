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
todo 13-8 Обработка ошибок сервера
Посмотрим на типы ошибок от сервера и как мы можем их отлавливать и сообщать пользователю что что-то пошло не так
Посмотрим что содержит в себе переменная request
Получаем promise, который записывается в переменную. Некий отложенный контейнер, который будет ждать определенных действий от создающего кода, т.е. от нашего сервера ( в данный момент находится в состоянии pending == ожидание). Т.к. нет данных, мы не можем передать в другой код, для его использования. Мы просто создали обещание того, что тогда, когда данные прогрузятся, в эту коробочку у нас они поместятся. Далее делаем метод then, который сработает тогда, когда сервер отдаст все наши данные и переместит их в промис. Там request уже содержит Promise {<fulfilled>: Response}, т.е. получили какие-то данные

Если отключить интернет, то request будет pending, но PromiseState внутри == rejected

После вызова request в консоль в первом then, выведем еще response. В request есть свойство body: ReadableStream. Такое же свойство есть у response в консоли. Это свойство содержит данные, которые получили от request. В первом then мы конвертировали данные из JSON в вид объекта. Во втором then мы продолжаем использовать эти данные

Существует и другой вариант возникновения ошибки, не как в 13.7
Допустим укажем несуществующую страну в getCountryData
Получим ошибку 404 not found
Когда смотрим в консоли на первый request в PromiseResult видим свойство ok: false, а status: 404
GET https://restcountries.com/v3.1/name/usaasda 404 (Not Found)
Вот справка по кодам ответа от сервера: https://developer.mozilla.org/ru/docs/Web/HTTP/Status
Какие бывают кода и что они представляют.
Так как ошибку мы обнаруживаем уже сразу в первом промисе, сделаем там магию, условие
if (!response.ok) {
  throw new Error(`Страна не найдена ${response.status}`);
}
Что мы тут написали?
Если свойство response.ok == false, то нужно остановить выполнение кода и за это отвечает инструкция THROW(пробрось) (работает также как return - прекращает выполнение дальнейшего кода) и создает новый объект Error с помощью конструктора и эта ошибка будет с содержанием, написанным внутри (). И так как при ошибке мы получаем результат rejected, то у нас выполняется дальнейший метод catch, который выводит сообщение error, в которую и передается текст из if

Теперь про соседа. Там же тоже может быть ошибка. Например также, страна не существует
Вернем нормальное название страны в getCountryData, а в neighbor положим несуществующую страну
Скопируем код if, вставим в первый then для второй страны
Обратите внимание, код 400, а не 404, как было с первой страной

Но если так оставить код, то видно, что у нас куски кода оч похожи друг на друга (первый then для каждой страны)
Если карточек будет много, то код будет повторяться и раздражать

Создадим функцию-помощник в getCountryData, назовем getJSON (url, "Страна не найдена")
Подставим функцию в prmoise, вместо первого then для обеих стран

Последнее о еще одной предполагаемой ошибке - существуют страны, у которых нет соседей. Например Австралия
Сделаем то же самое, пропишем еще один if (!neighbor) {throw new Error("Не найдено соседей");}

*/
