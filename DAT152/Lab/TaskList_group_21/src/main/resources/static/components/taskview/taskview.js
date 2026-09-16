import "../tasklist/tasklist.js";
import "../taskbox/taskbox.js";

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${new URL('taskview.css', import.meta.url)}">

    <h1>Tasks</h1>

    <div id="message"><p>Waiting for server data.</p></div>
    <div id="newtask">
        <button type="button" disabled>New task</button>
    </div>

    <group21-tasklist></group21-tasklist>
    <group21-taskbox></group21-taskbox>`;

/**
 * Parent component for the task application.
 *
 * TODO: Implement the orchestration and every Ajax request in this class.
 * TaskView may communicate with TaskList and TaskBox only through their APIs.
 */
class TaskView extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.append(template.content.cloneNode(true));

        this.tasklist = this.shadowRoot.querySelector("group21-tasklist");
        this.taskbox = this.shadowRoot.querySelector("group21-taskbox");
        this.messageElement = this.shadowRoot.querySelector("#message");
        this.newTaskButton = this.shadowRoot.querySelector("#newtask button");
        this.serviceurl = "";
        this.initialized = false;
    }

    /**
     * TODO:
     * 1. Prevent initialization from running more than once.
     * 2. Read this.dataset.serviceurl; do not hard-code the API address.
     * 3. Register TaskList callbacks for status changes and deletion.
     * 4. Register TaskBox's callback for new tasks.
     * 5. Open TaskBox when New task is clicked.
     * 6. Fetch statuses before tasks, then enable New task.
     * 7. Handle errors through the message element.
     */
    connectedCallback() {
        // TODO: Implement.
    }

    /**
     * GET {serviceurl}/allstatuses.
     * On responseStatus=true, pass allstatuses to both child components.
     */
    async loadStatuses() {
        // TODO: Implement with fetch and async/await.
    }

    /**
     * GET {serviceurl}/tasklist.
     * On responseStatus=true, call tasklist.showTask for every returned task.
     */
    async loadTasks() {
        // TODO: Implement with fetch and async/await.
    }

    /**
     * POST {serviceurl}/task with JSON {title, status}.
     * On success, display response.task, close TaskBox, and update the message.
     * @param {{title: string, status: string}} task
     */
    async addTask(task) {
        // TODO: Implement with fetch and async/await.
    }

    /**
     * PUT {serviceurl}/task/{id} with JSON {status: newStatus}.
     * Only update TaskList when responseStatus is true.
     * @param {number} id
     * @param {string} newStatus
     */
    async changeTaskStatus(id, newStatus) {
        // TODO: Implement with fetch and async/await.
    }

    /**
     * DELETE {serviceurl}/task/{id}.
     * Only remove the task from TaskList when responseStatus is true.
     * @param {number} id
     */
    async deleteTask(id) {
        // TODO: Implement with fetch and async/await.
    }

    /**
     * Use tasklist.getNumtasks(). Show "No tasks were found." for zero,
     * otherwise "Found N task(s).". Insert dynamic text with textContent.
     */
    updateMessage() {
        // TODO: Implement.
    }

    /** @param {string} message */
    showError(message) {
        // TODO: Show a readable error using textContent.
    }
}

customElements.define("group21-taskview", TaskView);
