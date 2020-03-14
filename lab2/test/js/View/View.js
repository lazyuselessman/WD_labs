export default class View {
    constructor(model) {
        this.model = model;
    }

    test() {
        document.querySelector('#main').innerHTML = `<h3>Test</h3>
            <div id="test"></div>
            <div><button class="back">back</button></div>`

        const pairs = this.model.getPairs();
        const pairsHtml = pairs.map((pair) => {
            return `
            <input type="radio" name="answers" value="${pair.id}">${pair.english}<br>`;
        }).join("");

        const correctPair = this.model.getCorrectPair(pairs);
        document.querySelector('#test').innerHTML = `${correctPair.ukrainian}
            <div id="answers">
                ${pairsHtml}
            </div>
            <div id="correctAnswer">
                <button class="submit-button">Submit</button>
            </div>
            `
    }

    correctAnswer() {
        document.querySelector('#correctAnswer').innerHTML = `Correct answer is ` +
            this.model.correctPair.english +
            `<br>
            Correct answers: <span id="result"></span>
            <br>
            <button class="next-button">Next</button>`;
    }

    dictionary() {
        document.querySelector('#main').innerHTML = `<h3>Dictionary</h3>
            <div id="settings"></div>
            <div><button class="back">back</button></div>`
        const pairsHtml = this.model.dictionary.map((pair) => {
            return `
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
                </tr>`;
        }).join("");

        document.querySelector('#settings').innerHTML = `<table border="1"><tr><th>Ukrainian</th><th>English</th><th>Operation</th></tr>${pairsHtml}</table>
        <button class="add-button">Add</button>`
    }
}