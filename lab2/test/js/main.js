import Controller from "../js/Controller/Controller.js";
import Model from "../js/Model/Model.js";
import View from "../js/View/View.js";


export default class Menu {
    constructor(controller) {
        this.controller = controller;
        document.querySelector('#main').addEventListener('click', (e) => this.onClick(e)); // 'main' changes
        this.init();
    }

    init() {
        document.querySelector('#main').innerHTML = `
            <button class="test">Test</button>
            <button class="dictionary">Dictionary</button>`
    }

    onClick(e) {
        if (e.target.className === 'test') {
            this.test();
            return;
        }
        if (e.target.className === 'dictionary') {
            this.dictionary();
            return;
        }
        if (e.target.className === 'back') {
            this.init();
            return;
        }
    }

    test() {
        if (this.controller.model.dictionary.length < 3) {
            alert(`Add some words at least ${amountAnswers}`);
        }
        else {
            controller.view.test(controller.n);
        }
    }

    dictionary() {
        controller.view.dictionary();
    }
}


const amountAnswers = 3;
let model = new Model();
let view = new View(model);
let controller = new Controller(model, view, amountAnswers);

let menu = new Menu(controller);

menu.controller.model.add('Вода', 'Water');
menu.controller.model.add('Банка', 'Jar');
menu.controller.model.add('Книга', 'Book');
menu.controller.model.add('Дерево', 'Tree');
menu.controller.model.add('Рослина', 'Plant');
menu.controller.model.add('Сік', 'Juice');
menu.controller.model.add('Вітер', 'Wind');
menu.controller.model.add('Вікно', 'Window');
