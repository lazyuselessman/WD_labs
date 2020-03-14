export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        document.querySelector('#main').addEventListener('click', (e) => this.onClick(e)); // 'settings' changes
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

    addPair() {
        this.model.add();
        this.view.dictionary();
    }

    editPair(id) {
        this.model.edit(id);
    }

    deletePair(id) {
        this.model.delete(id);
    }

    savePair(id) {
        this.model.save(id);
    }

    cancelPair(id) {
        this.model.cancel(id);
    }

    submit() {
        this.model.submit();
        this.view.correctAnswer();
    }

    next() {
        this.view.test();
    }
}