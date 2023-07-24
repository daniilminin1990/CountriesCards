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
todo 13-10 Что такое промисификация
создадим отдельно свой промис
Работает синхронно.
Чтобы симулировать асинхронность, сделаем задержку
В таком случае в Promise будет <pending>, а результата не будет. Если раскроем его, то он будет с этим результатом постоянно. Но если нажмем на него через 2 секунды, то резульат изменится 
Т.е. в начале, пока не получили результата, промис находится в состоянии undefined, он дожидается результата
Именно поэтому мы используем метод then для нашего промиса. И LotteryTicket сработает только тогда, когда будет результат resolve или reject
Дополним код 
lotteryTicket.then(function (res) {
  console.log(res);
});
При положительном результате в консоли через 2 сек появится win, и PromiseState = fulfilled
А если негативный, то будет ошибка, lose не появится, а в PromiseState = rejected.

Для этого и нужен catch - вылавливать ошибки
После catch появляется результат в консоли, даже если отрицательный результат

Промисы позволяют работать с отложенным кодом, не заставляя останавливаться другой код
У промисов есть колбэк функция с 2 параметрами(2 состояния по итогу):
1) положительный ответ от сервера
2) негативный
В случае с сервером первый then - чтобы получить данные в нужном нам формате, вернуть их как новый промис
С помощью последнего then - получали результат этих преобразованных данных
Catch - отлавливаем эту ошибку

* Промисификация - превращение кода, который основан на колбэках, в более удобную структуру 

Например создадим callBack HELL, чтобы посмотреть
Например setTimeout на 6 сек

setTimeout(function () {
  console.log("Прошла 1 сек");
  setTimeout(() => {
    console.log("Прошло 2 сек");
    setTimeout(() => {
      console.log("Прошло 3 сек");
      setTimeout(() => {
        console.log("Прошло 4 сек");
        setTimeout(() => {
          console.log("Прошло 5 сек");
          setTimeout(() => {
            console.log("Прошло 6 сек");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

Для упрощения, т.е. для промисификации, создадим функцию function wait(seconds){}

function wait(seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
}

wait(2)
  .then(function () {
    console.log("Вы ждали 2 сек");
    return wait(1);
  })
  .then(function () {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })
  .then(() => {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })

Тем самым мы получаем ровную простыню
*/

const lotteryTicket = new Promise(function (resolve, reject) {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("win");
    } else {
      reject("lose");
    }
  }, 2000);
});

lotteryTicket
  .then(function (res) {
    console.log(lotteryTicket);
    console.log(res);
  })
  .catch(function (err) {
    console.error(err);
  });

console.log(lotteryTicket); // Promise {<rejected>: 'lose'} \n Uncaught (in promise) lose

setTimeout(function () {
  console.log("Прошла 1 сек");
  setTimeout(() => {
    console.log("Прошло 2 сек");
    setTimeout(() => {
      console.log("Прошло 3 сек");
      setTimeout(() => {
        console.log("Прошло 4 сек");
        setTimeout(() => {
          console.log("Прошло 5 сек");
          setTimeout(() => {
            console.log("Прошло 6 сек");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

function wait(seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
}

wait(2)
  .then(function () {
    console.log("Вы ждали 2 сек");
    return wait(1);
  })
  .then(function () {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })
  .then(() => {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })
  .then(() => {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })
  .then(() => {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })
  .then(() => {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  })
  .then(() => {
    console.log("Вы ждали еще 1 сек");
    return wait(1);
  });
