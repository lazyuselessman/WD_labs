import Pair from "../Model/Pair.js";

export default class Model {
    constructor() {
        this.dictionary = [];
        this.counter = 0;
        this.correctPair = new Pair('', '');

        if (window.Worker) {
            this.myWorker = new Worker("js/Model/worker.js");

            this.myWorker.onmessage = function (e) {
                document.getElementById("result").innerHTML = e.data;
            }
        }
    }

    getPairs() {
        let pairs = [];
        let pair = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
        pairs.push(pair);
        for (let size = 0; size < 2; size++) {
            let fail = false;
            while (!fail) {
                fail = true;
                pair = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
                for (let i = 0; i < pairs.length; i++) {
                    if (pairs[i].id == pair.id) {
                        fail = false;
                        break;
                    }
                }
            }
            pairs.push(pair);
        }

        return pairs;
    }

    getCorrectPair(pairs) {
        this.correctPair = pairs[Math.floor(Math.random() * pairs.length)];
        return this.correctPair;
    }

    submit() {
        let answers = document.getElementById("answers").children;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].type == 'radio') {
                if (answers[i].checked == true) {
                    if (answers[i].value == this.correctPair.id) {
                        if (window.Worker) {
                            this.myWorker.postMessage(1);
                        }
                    }
                    else {
                        if (window.Worker) {
                            this.myWorker.postMessage(0);
                        }
                    }
                    break;
                }
            }
        }
    }

    add() {
        const ukrainian = prompt('Enter ukrainian word:', '');
        const english = prompt('Enter english word:', '');

        const pair = new Pair(ukrainian, english);

        this.dictionary.push(pair);
    }

    add_(ukrainian, english) {
        const pair = new Pair(ukrainian, english);
        this.dictionary.push(pair);
    }

    edit(id) {
        const itemIndex = this.dictionary.findIndex((pair) => pair.id === id);
        let pair = this.dictionary[itemIndex];

        document.getElementById(id).innerHTML = `
            <tr id="${pair.id}">
                <td style="color: black">
                    <input type="text" value="${pair.ukrainian}">
                </td>
                <td style="color: black">
                    <input type="text" value="${pair.english}">
                </td>
                <td>
                    <button data-id="${pair.id}" class="save-button">Save</button>
                    <button data-id="${pair.id}" class="cancel-button">Cancel</button>
                </td>
            </tr>`
    }

    delete(id) {
        const pairIndex = this.dictionary.findIndex((pair) => pair.id === id);
        this.dictionary.splice(pairIndex, 1);

        document.getElementById(id).remove();
    }

    save(id) {
        const pairIndex = this.dictionary.findIndex((pair) => pair.id === id);
        let pair = this.dictionary[pairIndex];

        pair.ukrainian = document.getElementById(id).children[0].children[0].value;
        pair.english = document.getElementById(id).children[1].children[0].value;

        document.getElementById(id).innerHTML = `
        <tr id="${pair.id}">
            <td style="color: black">
                ${pair.ukrainian}
            </td>
            <td style="color: black">
                ${pair.english}
            </td>
            <td>
                <button data-id="${pair.id}" class="edit-button">Edit</button>
                <button data-id="${pair.id}" class="delete-button">Delete</button>
            </td>
        </tr>`
    }

    cancel(id) {
        const pairIndex = this.dictionary.findIndex((pair) => pair.id === id);
        let pair = this.dictionary[pairIndex];

        document.getElementById(id).innerHTML = `
            <tr id="${pair.id}">
                <td style="color: black">
                    ${pair.ukrainian}
                </td>
                <td style="color: black">
                    ${pair.english}
                </td>
                <td>
                    <button data-id="${pair.id}" class="edit-button">Edit</button>
                    <button data-id="${pair.id}" class="delete-button">Delete</button>
                </td>
            </tr>`
    }
}