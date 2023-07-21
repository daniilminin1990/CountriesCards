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

/* 
todo 13-3 Подключаемся к API
Подключимся к API и будем создавать карточки стран
https://github.com/public-apis/public-apis
Там находим API REST COUNTRIES
https://restcountries.com/
Также нужно будет отправить запрос и получить данные, о странах
читаем документацию
Страна по имени - вкладка NAME. Пример https://restcountries.com/v3.1/name/deutschland
Создаем переменную, XMLHttpRequest
Настраиваем обработчик события
сохраним результат в переменную, деструктурированную
скопируем строки из html
Подставим данные из data в Html
выведем тег на страницу insertAdjacentHTML("after")
opacity = 1
Почему-то не работает
превратим все это в функцию
В ссылке на API поменяем страну на ${country}
Вызовем функцию
Бывает что не все свойства одинаковые и может возникнуть ошибка, что такого свойства нет
Это касается languages и currencies. Поэтому переделаем эти свойства в массив Object.entries и затем будем вызывать первый элемент
Object.entries(data.languages)[0][1];


*/

function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data); //
    const html = `<!-- <article class="country">
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
</article> -->`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
}

getCountryData("portugal");
