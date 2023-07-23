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

/* 
todo 13-5 fetch и promise
комментируем код выше и пишем по новой - с fetch
Для вызова функции fetch, пропишем ее внутри getCountry, и присвоим переменной request
fetch имеет параметры: 1) ссылка на APi, 2)  
fetch("")
Т.е. не используем GET или POST, т.к. он подставляется автоматически
В консоли request получаем Promise
Про промисы написано тут https://learn.javascript.ru/promise-basics
fetch это контейнер для будущего кода, который хочет использовать данные, которые мы получим с какого-то удаленного сервера. И мы будущему коду говорим что как только мы получим данные (они загрузятся и будут готовы к использованию), этот использующий код эти данные получит (request). Ну а если у нас будет какая-то ошибка, например сервер будет недоступен, и у пользователя нет интернета, то мы сможем сообщить использующему коду об этой ошибке. Например вывести информацию на странице, что что-то пошло не так

Promise - это контейнер и в случае успеха в него складываются данные с сервера. В случае негативного ответа
К переменной request, т.е. к промису, т.е. к fetch применим метод 
.then(function(response){
  console.log(response)
})
выйдет какая-то структура данных
Есть статус выполнения запроса, 
Т.е. какое-то хранилище статусов
То же самое мы получали, когда использовали XMLHttpRequest
const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/russia`);
  request.send();
  console.log(request);
  Здесь в консоли увидим структуру XMLHttpRequest, там есть свойство readyState = 4. Это состояние готовности, каждая цифра что-то значит. Об этом написано тут: https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/readyState
То есть получаем то же самое, что и в промисе
И вместо того, чтобы дальше создавать обработчик события, мы можем использовать этот then

Но где наши данные???
Чтобы получить наши данные, нужно воспользоваться методом JSON, но не тем, который использовали ранее, а вот таким:
response.json(). Если вывести его в консоль, то это тот же промис, но у него есть 
PromiseResult Array с нашими данными
Чтобы нам их получить, нужно завершить CallBack функцию для then словом return
return response.json()
Тем самым функция fetch станет результатом, который вернется с помощью метода json
и т.к. результат все-таки промис, то нужно опять использовать метод then(function(data){}). Т.е. в параметре указать data, наши данные, то же что и получали в предыдущем коде


Итого
then используется только для промисов
1) создаем запрос fetch().+2 метода: 1)then(какой-то ответ, например response){return response.json()}.2) then(function (data){console.log(data)})

Теперь опять вернем код renderCards и применим его во вновь написанном, во втором then
renderCards(data[0])

Перепишем код со стрелочными функциями
*/

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
  countriesContainer.style.opacity = 1;
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

function getCountryData(country) {
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCards(data[0]));
  console.log(request);
}
getCountryData("russia");
