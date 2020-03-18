import Pair from "../Model/Pair.js";

export default class Model {
    constructor() {
        this.dictionary = [];
        this.correctPair = new Pair('', '');

        if (window.Worker) {
            this.myWorker = new Worker("js/Model/worker.js");

            this.myWorker.onmessage = function (e) {
                document.getElementById("result").innerHTML = e.data;
            }
        }
    }

    getPairs(n) {
        let pairs = [];
        let pair = this.dictionary[Math.floor(Math.random() * this.dictionary.length)];
        pairs.push(pair);
        for (let size = 0; size < n - 1; size++) {
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
        this.correctPair = pairs[Math.floor(Math.random() * pairs.length)];
        return pairs;
    }

    getDictionary() {
        return this.dictionary;
    }

    getCorrectPair() {
        return this.correctPair;
    }

    submit() {
        if (window.Worker) {
            const answers = document.getElementById("answers").children;
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].name == 'answers') {
                    if (answers[i].checked == true) {
                        if (answers[i].value == this.correctPair.id) {
                            this.myWorker.postMessage(1);
                        }
                        else {
                            this.myWorker.postMessage(0);
                        }
                        break;
                    }
                }
            }
        }
    }

    add(ukrainian, english) {
        const pair = new Pair(ukrainian, english);
        this.dictionary.push(pair);
        return pair;
    }

    getPair(id) {
        const itemIndex = this.dictionary.findIndex((pair) => pair.id === id);
        return this.dictionary[itemIndex];
    }

    delete(id) {
        const pairIndex = this.dictionary.findIndex((pair) => pair.id === id);
        this.dictionary.splice(pairIndex, 1);
    }

    save(id) {
        let pair = this.getPair(id);

        pair.ukrainian = document.getElementById(id).children[0].children[0].value;
        pair.english = document.getElementById(id).children[1].children[0].value;
    }
}