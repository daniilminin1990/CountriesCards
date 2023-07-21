"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
/* 
Асинхронный код

todo 13-1 Практика 23 Асинхронный код. Что такое синхронный и асинхронный код
Что такое синхронный и асинхронный код

Синхронный код - код, который выполняется построчно сверху вниз
* В синхронном коде инструкции выполняются последовательно, одна за другой, в том порядке, в котором они были написаны.
* Каждая операция должна завершиться, прежде чем следующая будет выполнена.
* Код ожидает завершения каждой операции, прежде чем переходить к следующей.

Асинхронный код (Asynchronous code):
* В асинхронном коде некоторые операции могут быть запущены, но не завершены немедленно. Вместо этого они выполняются в фоновом режиме или по завершении определенных событий.
* Код не ожидает завершения асинхронных операций и продолжает выполнять другие инструкции.
* Результат асинхронной операции может быть доступен позже, после завершения операции.

console.log('Начало');

// setTimeout - асинхронная функция, которая вызовет колбэк через 1000 миллисекунд (1 секунда)
setTimeout(function() {
  console.log('Колбэк выполнен');
}, 1000);

console.log('Конец');

Начало
Конец
Колбэк выполнен

Обратите внимание, что "Колбэк выполнен" появляется позже, чем "Конец", потому что 
setTimeout запускает асинхронную операцию и продолжает выполнение кода без ожидания завершения операции.

todo 13-2 
*/
