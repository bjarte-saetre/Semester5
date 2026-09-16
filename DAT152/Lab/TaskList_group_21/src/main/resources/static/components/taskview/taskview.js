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

// TaskView er hovedkomponenten som kobler TaskList og TaskBox til serveren.
// Alle fetch-kallene i oppgaven skal ligge i denne komponenten.
class TaskView extends HTMLElement {

    // Lager Shadow DOM og finner komponentene og elementene som skal brukes senere.
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

    // Kobler komponentene sammen og henter de første dataene fra serveren.
    async connectedCallback() {
        // Hindrer at oppsettet blir gjort flere ganger.
        if (this.initialized) {
            return;
        }

        this.initialized = true;

        // Leser API-adressen fra data-serviceurl i index.html.
        this.serviceurl = this.dataset.serviceurl;

        if (!this.serviceurl) {
            this.showError("Missing data-serviceurl.");
            return;
        }

        // TaskList gir beskjed til TaskView når statusen skal endres.
        this.tasklist.addChangestatusCallback((id, newStatus) => {
            this.changeTaskStatus(id, newStatus);
        });

        // TaskList gir beskjed til TaskView når en oppgave skal slettes.
        this.tasklist.addDeletetaskCallback((id) => {
            this.deleteTask(id);
        });

        // TaskBox gir den nye oppgaven til TaskView.
        this.taskbox.addNewtaskCallback((task) => {
            this.addTask(task);
        });

        // Åpner TaskBox når brukeren trykker på New task.
        this.newTaskButton.addEventListener("click", () => {
            this.taskbox.show();
        });

        try {
            // Statusene må hentes før oppgavene og TaskBox åpnes.
            await this.loadStatuses();
            await this.loadTasks();

            this.newTaskButton.disabled = false;
            this.updateMessage();
        } catch (error) {
            this.showError(`Could not load data: ${error.message}`);
        }
    }

    // Henter alle statusene og sender dem videre til TaskList og TaskBox.
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

    // Henter alle oppgavene og viser dem én etter én i TaskList.
    async loadTasks() {
        const response = await fetch(`${this.serviceurl}/tasklist`);

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

    // Sender en ny oppgave til serveren og viser den når den er lagret.
    async addTask(task) {
        try {
            const response = await fetch(`${this.serviceurl}/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
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

    // Sender den nye statusen til serveren og oppdaterer riktig tabellrad.
    async changeTaskStatus(id, newStatus) {
        try {
            const response = await fetch(`${this.serviceurl}/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data.responseStatus) {
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

    // Ber serveren slette oppgaven og fjerner deretter raden fra TaskList.
    async deleteTask(id) {
        try {
            const response = await fetch(`${this.serviceurl}/task/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (!data.responseStatus) {
                throw new Error("The server could not delete the task.");
            }

            this.tasklist.removeTask(data.id);
            this.updateMessage();
        } catch (error) {
            this.showError(`Could not delete task: ${error.message}`);
        }
    }

    // Viser hvor mange oppgaver som finnes i TaskList.
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

    // Viser en lesbar feilmelding øverst på siden.
    showError(message) {
        this.messageElement.textContent = message;
    }
}

customElements.define("group21-taskview", TaskView);
