export default class Pair {
    constructor(ukrainian, english) {
        this.id = Math.round(Math.random() * 100000).toString();
        this.ukrainian = ukrainian;
        this.english = english;
    }
}