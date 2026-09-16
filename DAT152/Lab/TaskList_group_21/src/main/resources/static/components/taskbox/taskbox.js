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

        /*
         * TODO:
         * 1. Add a click listener to closeButton that calls this.close().
         * 2. Add a click listener to addButton.
         * 3. In the add listener, validate that the title is not empty.
         * 4. Create {title: ..., status: ...} from the input elements.
         * 5. Run every callback in this.newtaskCallbacks with that object.
         *
         * Do not send an Ajax request here. TaskView receives the new task
         * through the callback and communicates with the server.
         */
    }

    /** Open the modal dialog. @public */
    show() {
        // TODO: Clear old input, call showModal(), and focus the title field.
    }

    /**
     * Populate SELECT with possible statuses using createElement/textContent.
     * Do not use server data with innerHTML.
     * @public
     * @param {Array<string>} list
     */
    setStatuseslist(list) {
        // TODO: Implement.
    }

    /**
     * Store a callback that receives {title, status} on Add task.
     * @public
     * @param {function({title: string, status: string}): void} callback
     */
    addNewtaskCallback(callback) {
        // TODO: Implement.
    }

    /** Close the modal through the HTMLDialogElement API. @public */
    close() {
        // TODO: Implement.
    }
}

customElements.define("group21-taskbox", TaskBox);
