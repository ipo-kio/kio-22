import React from 'react';
import ReactDOM from 'react-dom';


import Scene from "./components/Scene";

// //это требуется для компиляции scss файла со стилями для задачи, без webpack эта строка не нужна
// //     import './collatz.scss'

class stool{

    // Разработка задачи начинается с выбора идентификатора. Он должен состоять из маленьких букв, возможно, с подчеркиваниями.
    // В этой задаче идентификатор будет `collatz_js`. Каталог с задачей должен называться как id задачи. Основной файл с
    // исходным кодом должен называться как id задачи. Каталог с ресурсами должен называться как id-resources.
    // Класс с задачей должен называться как id задачи с большой буквы (Collatz_js).


//
//     /**
//      * создаем класс Collatz, конструктор может быть пустым, инициализация происходит позже.
//      * Конструктор может быть вызван не в браузере, поэтому из него нельзя обращаться к DOM.
//      * Это необходимо для автоматической проверки решений на сервере.
//      *
//      * @param settings произвольный объект настроек "лаборатории".
//      * Обычно settings содержит только информацию об уровне, например settings = {level : 2}
//      * @constructor
//      */
    constructor(settings) {
        this.settings = settings;
    }
//
// // Далее перечисляются функции, которые нужно реализовать
//
//     /**
//      * Возвращается ключ для хранения данных о процессе решения в localstorage, формируется на основе id и данных из
//      * настроек. В будущем этот метод будет удалён, ключ будет формироваться автоматически.
//      */
    id = function () {
        return "stool";
    };
//
//     /**
//      * Функция инициализации, в этой функции можно создавать интерфейс задачи и уже можно пользоваться KioApi
//      * @param domNode dom-узел, который нужно наполнять содержимым задачи
//      * @param kioapi ссылка на api для совершения всех действий с задачей
//      * @param preferred_width ширина div, в котором нужно создать условие задачи. Рекомендуется не использовать это
//      * значение, ширина окна браузера может меняться в процессе работы с лабораторией.
//      */
    initialize = function (domNode, kioapi, preferred_width) {
        console.log('preferred width in problem initialization', preferred_width);

        //сохраняем данные для будущего использования
        this.kioapi = kioapi;
        this.domNode = domNode;

        //settings могут иметь произвольные данные для инициализации, например, уровень
        console.log('problem level is', this.settings.level);

        //инициализируем интерфейс
        //инициализируем содержимое задачи в элементе domNode,
        //initInterface - это наш собственный приватный метод
        //В коде, по историческим причинам, используется jquery. Сейчас рекомендуется разрабатывать без него.

        this.scene = React.createRef()

        ReactDOM.render(
                <Scene ref = {this.scene} KioApi = {kioapi} />,
            document.getElementById(domNode)
        );

    };

    parameters = function () {
        return [
            {
                name: "distance", //название параметра
                title: "Расстояние до поверхности", //отображение названия для пользователя
                ordering: 'minimize', // 'maximize' - надо как можно больше, 'minimize' - как можно меньше
                view: ""
            },
            {
                name: "tilt_angle",
                title: "Угол наклона",
                ordering: 'minimize',
                view: "°"
            }

        ];
    };
//

//      * Ресурсы (изображения, звуки) должны находиться в каталоге с именем `[id-задачи]-resources`.
//      * Webpack настроен так, что он целиком копирует этот каталог в каталог dist с результатом.
//      *
//      * В общем случае, путь до ресурса считается от js-файла с задачей. Но т.к. все ресурсы находятся в каталоге
//      * `[id-задачи]-resources`, надо указывать этот каталог в пути.
//      * @returns [{id: String, src: String}]
//      */
    preloadManifest = function () {
        return [];
    };
//
//     /**
//      * Возвращает текущее решение в виде объекта,
//      * он будет сериализован с помощью JSON.stringify для хранения и передачи по сети, поэтому он должен содержать только
//      * строки, числа, массивы, внутренние объекты.
//      */
    solution = function () {

        // var x = this.process == null ? 0 : this.process.x;
        return this.scene.getParams(); // o.pos,  o.angle
    };
//
//     /**
//      * Загрузка решения в задачу. В качестве аргумента solution будет передан объект, который
//      * до этого был сформирован в методе solution. При загрузке решения нужно обновить данные через kioapi.submitResult
//      * @param solution решение для загрузки
//      */
    loadSolution = function (solution) {
        this.scene.loadSolution(solution)

        // Надо вызвать kioapi.submitResult(), это уже делается в обработчике события 'change' поля ввода решения.
        // Поэтому вызываем обработчик этого события: вызываем в своём событии

    };
//
}
