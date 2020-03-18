export default class View {
    test(n, pairs, correctPair) {
        const pairsHtml = pairs.map((pair) => {
            return `
            <input type="radio" name="answers" value="${pair.id}">${pair.english}<br>`;
        }).join("");
        document.querySelector('#main').innerHTML = `
            <h3>Test</h3>
            <div id="test">
                ${correctPair.ukrainian}
                <div id="answers">
                    ${pairsHtml}
                </div>
                <div id="correctAnswer">
                    <button class="submit-button">Submit</button>
                </div>    
            </div>
            <div>
                <button class="back">back</button>
            </div>`
    }

    correctAnswer(pair) {
        document.querySelector('#correctAnswer').innerHTML = `
            Correct answer is  ${pair.english}
            <br>
            Correct answers: <span id="result"></span>
            <br>
            <button class="next-button">Next</button>`;
    }

    dictionary(dictionary) {
        const pairsHtml = dictionary.map((pair) => {
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

        document.querySelector('#main').innerHTML = `<h3>Dictionary</h3>
            <div id="dictionary">
                <table border="1" id="table">
                    <tr>
                        <th>Ukrainian</th>
                        <th>English</th>
                        <th>Operation</th>
                    </tr>
                    ${pairsHtml}
                </table>
                <button class="add-button">Add</button>
            </div>
            <div>
                <button class="back">back</button>
            </div>`
    }

    add(pair) {
        let p = document.createElement("tr");
        p.id = pair.id;
        p.innerHTML = `
            <td style="color: black">
            ${pair.ukrainian}
            </td>
            <td style="color: black">
                ${pair.english}
            </td>
            <td>
                <button data-id="${pair.id}" class="edit-button">Edit</button>
                <button data-id="${pair.id}" class="delete-button">Delete</button>
            </td>`
        document.getElementById("table").children[0].appendChild(p);
    }

    edit(pair) {
        document.getElementById(pair.id).innerHTML = `
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

    refresh(pair) {
        document.getElementById(pair.id).innerHTML = `
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

    delete(id) {
        document.getElementById(id).remove();
    }
}