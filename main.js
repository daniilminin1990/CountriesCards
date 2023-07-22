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
function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // Функция использует данные с сервера для использования в HTML коде
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

  // Выполняем действия с данными после их загрузки
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    // Выводим на страницу карточку с первой страной
    renderCards(data);
    const neighbor = data.borders[0];
    console.log(neighbor);

    // Создаем запрос к серверу внутри первой call-back функции
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);

      // Выводим на страницу карточку страны соседа
      renderCards(data2, "neighbour");
    });
  });
}

getCountryData("russia");

/* 
todo 13-4 Call-back hall
Об адской пирамиде вызовов
Разберемся как же сделать так, чтобы вторая карточка загружалась только после первой

В языке программирования есть свой ад. И этот ад называется адской пирамидой вызовов. И этот ад мы и создадим
Вырежем код от const html до вызова карточки на страницу и вставим в отдельную функцию
function renderCards(data), это те данные, которые будут приходить из const [data]

Теперь будем выводить второй карточкой страну "сосед", в свойстве data.borders
Для передачи еще одного соседа создадим еще один запрос request2. Но выводить соседа будем по коду https://restcountries.com/v3.1/alpha/{code}
Еще один обработчик события и снова JSON.parse
Получили массив но уже про соседа
Создадим переменную под эти данные
И Используем renderCards на data2

Для карточки соседа в HTML есть спец класс, который будет делать ее меньше и добавлять в коробку с названием "Страна сосед"
Чтобы это отображалось динамически, поправим функцию рендера. Добавим второй параметр className = '' и добавим className в article
А при вызове renderCards для соседа укажем второй параметр - имя класса 

Все то, что написано выше - адская пирамида вызовов

Можно продолжать эту пирамиду дальше и дальше, т.е. делать новые render для все новых и новых стран 
Все это из-за XMLHttpRequest
Но на смену ему пришел FETCH в 2015, который позволяет создавать цепочку вызовов друг за другом, упрощая визуально код и добавляя свои некоторые плюхи
Но это на след уроке
*/
