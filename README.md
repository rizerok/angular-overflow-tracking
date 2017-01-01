#Overflow-tracking
Данная директива отслеживает переполнение элемента, в зависимости от значения (html, gradient)
обрабатывает его.

##Установка с npm:
в терминале
```sh
	npm i angular-overflow-tracking --save
```  
в проекте 
```javascript
	import angular from 'angular';
	import 'angular-overflow-tracking';

	var app = angular.module('app',[
    		'overflow-tracking'
	]);
```
или можно скачать готовый дистрибутив [ссылка](http://bashinsky.pro/sources/angular-overflow-tracking/bundle/js/overflow-tracking.js)
и просто подключить к проекту
```html
<script src="../node_modules/angular/angular.js"></script>
<script src="../bundle/js/overflow-tracking.js"></script>
```
##Использование
```html
  <div overflow-tracking="html"></div>
```
- ***overflow-tracking="html"*** выполняет рекурсивный обход
детей контейнера и вырезает по слову, пока контейнер переполнен. По умолчанию resize="100" [demo](http://bashinsky.pro/sources/angular-overflow-tracking/demo/demo.html)

- ***overflow-tracking="html" added-word="string"***
добавляет слово в конец контейнера

- ***overflow-tracking="html" container=".overflow-container"*** находит по 
селектору дочерний элемент и вырезает по слову пока родительский контейнер переполнен. [demo](http://bashinsky.pro/sources/angular-overflow-tracking/demo/demo2.html)

- ***overflow-tracking="html" resize="200"*** добавляет задержку в милисекундах
на действия директивы, при ресайзе окна браузера.

- ***overflow-tracking="gradient"*** вычисляет background-color, line-height
и в зависимости от "position" добавляет gradient. По умолчанию gradient="hor" size="0.2"

- ***overflow-tracking="gradient" gradient="hor"*** градиент по горизонтали. [demo](http://bashinsky.pro/sources/angular-overflow-tracking/demo/demo3.html)

- ***overflow-tracking="gradient" gradient="ver"*** градиент по виртикали. [demo](http://bashinsky.pro/sources/angular-overflow-tracking/demo/demo4.html)

- ***overflow-tracking="gradient" size="0.2"*** устанавливает размер градиента.
Значения в диапозоне от 0 до 1. По умолчанию size="0.2
