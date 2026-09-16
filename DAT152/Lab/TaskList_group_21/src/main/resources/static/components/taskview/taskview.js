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
    async connectedCallback() {
        if (this.initialized) {
            return;
        }

        this.initialized = true;
        this.serviceurl = this.dataset.serviceurl;

        if (!this.serviceurl) {
            this.showError("Missing data-serviceurl.");
            return;
        }

        this.tasklist.addChangestatusCallback((id, newStatus) => {
            this.changeTaskStatus(id, newStatus); //når statusen endres i tasklist
        });

        this.tasklist.addDeletetaskCallback((id) => {
            this.deleteTask(id); //når en oppgave slettes
        });

        this.tasklist.addNewtaskCallback((task) => {
            this.tasklist.addTask(task);
        });

        this.newTaskButton.addEventListener("click", () => {
            this.taskbox.show();
        });

        try {
            await this.loadStatuses();
            await this.loadTasks();

            this.newTaskButton.disabled = false;
            this.updateMessage();
        } catch(error) {
            this.showError(`Could not load data: ${error.message}`);
        }
    }

    /**
     * GET {serviceurl}/allstatuses.
     * On responseStatus=true, pass allstatuses to both child components.
     */
    async loadStatuses() {
        const response = await fetch(`${this.serviceurl}/allstatuses`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.responseStatus) {
            throw new Error("The server could not return the statuses.");
        }

        this.tasklist.setStatuseslist(data.allstatuses);
        this.taskbox.setStatuseslist(data.allstatuses);
    }

    /**
     * GET {serviceurl}/tasklist.
     * On responseStatus=true, call tasklist.showTask for every returned task.
     */
    async loadTasks() {
        const respone = await fetch(`${this.serviceurl}/tasklist`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.responseStatus) {
            throw new Error("The server could not return the tasks.");
        }

        for (const task of data.tasks) {
            this.tasklist.showTask(task);
        }
    }

    /**
     * POST {serviceurl}/task with JSON {title, status}.
     * On success, display response.task, close TaskBox, and update the message.
     * @param {{title: string, status: string}} task
     */
    async addTask(task) {
        try {
            const response = await fetch(`${this.serviceurl}/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task) //JavaScript-objektet om til JSON-tekst.
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data.responseStatus || !data.task) {
                throw new Error("The server could not add the task.");
            }

            this.tasklist.showTask(data.task);
            this.taskbox.close();
            this.updateMessage();
        } catch (error) {
            this.showError(`Could not add task: ${error.message}`);
        }
    }

    /**
     * PUT {serviceurl}/task/{id} with JSON {status: newStatus}.
     * Only update TaskList when responseStatus is true.
     * @param {number} id
     * @param {string} newStatus
     */
    async changeTaskStatus(id, newStatus) {

        try {
            const response = await fetch(`${this.serviceurl}/task${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status:newStatus
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data.responseStatus || !data.task) {
                throw new Error("The server could not change the status.");
            }

            this.tasklist.updateTask({
                id: data.id,
                status: data.status
            });
        } catch (error) {
            this.showError(`Could not change task status: ${error.message}`);
        }

    }

    /**
     * DELETE {serviceurl}/task/{id}.
     * Only remove the task from TaskList when responseStatus is true.
     * @param {number} id
     */
    async deleteTask(id) {

        try {
            const response = await fetch(`${this.serviceurl}/task${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data.responseStatus || !data.task) {
                throw new Error("The server could not delete the task.");
            }

            this.tasklist.removeTask(data.id);
            this.updateMessage();

        } catch (error) {
            this.showError(`Could not delete task: ${error.message}`);
        }

    }

    /**
     * Use tasklist.getNumtasks(). Show "No tasks were found." for zero,
     * otherwise "Found N task(s).". Insert dynamic text with textContent.
     */
    updateMessage() {

        const numberOfTasks = this.tasklist.getNumtasks();

        if (numberOfTasks === 0) {
            this.messageElement.textContent = "No tasks were found.";
            return;
        }

        let taskWord = "tasks";

        if (numberOfTasks === 1) {
            taskWord = "task";
        }

        this.messageElement.textContent =
            `Found ${numberOfTasks} ${taskWord}.`;

    }

    /** @param {string} message */
    showError(message) {
        this.messageElement.textContent = message;
    }
}

customElements.define("group21-taskview", TaskView);
