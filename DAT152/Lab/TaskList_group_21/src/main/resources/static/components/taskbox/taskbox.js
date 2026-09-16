const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${new URL('taskbox.css', import.meta.url)}">
    <dialog>
        <span id="close" role="button" aria-label="Close">&times;</span>
        <div>
            <div>Title:</div>
            <div>
                <input type="text" size="25" maxlength="80"
                    placeholder="Task title" autofocus>
            </div>
            <div>Status:</div>
            <div><select></select></div>
        </div>
        <p><button type="submit">Add task</button></p>
    </dialog>`;

// TaskBox viser dialogboksen der brukeren kan skrive inn en ny oppgave.
// Den sender oppgaven videre med callbacks, men kontakter ikke serveren selv.
class TaskBox extends HTMLElement {

    // Lager Shadow DOM, finner elementene i dialogen og kobler til knappene.
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.append(template.content.cloneNode(true));

        this.dialog = this.shadowRoot.querySelector("dialog");
        this.titleInput = this.shadowRoot.querySelector("input");
        this.statusSelect = this.shadowRoot.querySelector("select");
        this.addButton = this.shadowRoot.querySelector("button[type='submit']");
        this.closeButton = this.shadowRoot.querySelector("#close");
        this.newtaskCallbacks = [];

        // Lukker dialogen når brukeren trykker på krysset.
        this.closeButton.addEventListener("click", () => {
            this.close();
        });

        // Kontrollerer tittelen og sender den nye oppgaven videre til TaskView.
        this.addButton.addEventListener("click", () => {
            const title = this.titleInput.value.trim();

            if (title === "") {
                window.alert("You must enter a task title.");
                this.titleInput.focus();
                return;
            }

            const task = {
                title,
                status: this.statusSelect.value
            };

            for (const callback of this.newtaskCallbacks) {
                callback(task);
            }
        });
    }

    // Tømmer det gamle tekstfeltet og åpner dialogen.
    show() {
        this.titleInput.value = "";
        this.dialog.showModal();
        this.titleInput.focus();
    }

    // Tømmer statusmenyen og legger inn statusene som kom fra serveren.
    setStatuseslist(list) {
        this.statusSelect.replaceChildren();

        for (const status of list) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            this.statusSelect.append(option);
        }
    }

    // Lagrer en funksjon som skal kjøres når brukeren legger til en oppgave.
    addNewtaskCallback(callback) {
        this.newtaskCallbacks.push(callback);
    }

    // Lukker dialogen.
    close() {
        this.dialog.close();
    }
}

customElements.define("group21-taskbox", TaskBox);
