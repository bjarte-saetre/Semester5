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

/**
 * Modal component used to collect the title and status of a new task.
 *
 * TODO: Implement this class. TaskBox owns every element and event listener
 * inside the dialog. It must not use fetch/Ajax or access TaskList/TaskView.
 */
class TaskBox extends HTMLElement {

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

        this.closeButton.addEventListener("click", () => {
            this.close()
        });
        this.addButton.addEventListener("click", () => {
            const title = this.titleInput.value.trim();

            if (title === "") {
                window.alert("You must enter a task title.");
                this.titleInput.focus();
                return;
            }
            const task = {title: title, status: this.statusSelect.value};

            for (const callback of this.newtaskCallbacks) {
                callback(task);
            }
        });
    }

    /** Open the modal dialog. @public */
    show() {
        this.titleInput.value = "";
        this.dialog.showModal();
        this.titleInput.focus();
    }

    /**
     * Populate SELECT with possible statuses using createElement/textContent.
     * Do not use server data with innerHTML.
     * @public
     * @param {Array<string>} list
     */
    setStatuseslist(list) {

        this.statusSelect.replaceChildren(); //fjerner alle eksisterende <option>-element

        for (const status of list) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            this.statusSelect.append(option);
        }

    }

    /**
     * Store a callback that receives {title, status} on Add task.
     * @public
     * @param {function({title: string, status: string}): void} callback
     */
    addNewtaskCallback(callback) {

        this.newtaskCallbacks.push(callback);


    }

    /** Close the modal through the HTMLDialogElement API. @public */
    close() {
        this.dialog.close();
    }
}

customElements.define("group21-taskbox", TaskBox);
