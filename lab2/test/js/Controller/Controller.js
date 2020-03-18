export default class Controller {
    constructor(model, view, n) {
        this.model = model;
        this.view = view;
        this.n = n;
        document.querySelector('#main').addEventListener('click', (e) => this.onClick(e)); // 'main' changes
    }

    onClick(e) {
        if (e.target.className === 'add-button') {
            this.addPair();
            return;
        }
        if (e.target.className === 'edit-button') {
            this.editPair(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'delete-button') {
            this.deletePair(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'save-button') {
            this.savePair(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'cancel-button') {
            this.cancelPair(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'submit-button') {
            this.submit();
            return;
        }
        if (e.target.className === 'next-button') {
            this.next();
            return;
        }
    }

    dictionary() {
        const dictionary = this.model.getDictionary();
        this.view.dictionary(dictionary);
    }

    addPair() {
        const ukrainian = prompt('Enter ukrainian word:', '');
        const english = prompt('Enter english word:', '');

        if (ukrainian != '' && english != '') {
            const pair = this.model.add(ukrainian, english);
            this.view.add(pair);
        }
        else {
            alert('Fill both inputs!')
        }
    }

    editPair(id) {
        const pair = this.model.getPair(id);
        this.view.edit(pair);
    }

    deletePair(id) {
        this.model.delete(id);
        this.view.delete(id);
    }

    savePair(id) {
        this.model.save(id);
        const pair = this.model.getPair(id);
        this.view.refresh(pair);
    }

    cancelPair(id) {
        const pair = this.model.getPair(id);
        this.view.refresh(pair);
    }

    submit() {
        this.model.submit();
        const correctPair = this.model.getCorrectPair();
        this.view.correctAnswer(correctPair);
    }

    next() {
        const pairs = this.model.getPairs(this.n);
        const correctPair = this.model.getCorrectPair();
        this.view.test(this.n, pairs, correctPair);
    }
}