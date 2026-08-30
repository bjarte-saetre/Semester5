const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/tasklist.css"/>

    <div id="tasklist"></div>`;

const tasktable = document.createElement("template");
tasktable.innerHTML = `
    <table>
        <thead><tr><th>Task</th><th>Status</th></tr></thead>
        <tbody></tbody>
    </table>`;

const taskrow = document.createElement("template");
taskrow.innerHTML = `
    <tr>
        <td></td>
        <td></td>
        <td>
            <select>
                <option value="0" selected>&lt;Modify&gt;</option>
            </select>
        </td>
        <td><button type="button">Remove</button></td>
    </tr>`;

/**
  * TaskList
  * Manage view with list of tasks
  */
class TaskList extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(template.content.cloneNode(true));

        this.allstatuses = [];
    }

    /**
     * @public
     * @param {Array} list with all possible task statuses
     */
    setStatuseslist(allstatuses) {
        this.allstatuses = allstatuses;
    }

    /**
     * Add callback to run on change on change of status of a task, i.e. on change in the SELECT element
     * @public
     * @param {function} callback
     */
    addChangestatusCallback(callback) {
        /**
         * Fill inn the code
         */
    }

    /**
     * Add callback to run on click on delete button of a task
     * @public
     * @param {function} callback
     */
    addDeletetaskCallback(callback) {
        /**
         * Fill inn the code
         */
    }

    /**
     * Add task at top in list of tasks in the view
     * @public
     * @param {Object} task - Object representing a task
     */
    showTask(task) {
        const container = this.shadowRoot.querySelector("#tasklist");

        // Opprett tabellen første gang showTask blir kjørt
        let table = container.querySelector("table");

        if (table === null) {
            const tableClone = tasktable.content.cloneNode(true);
            container.append(tableClone);

            table = container.querySelector("table");
        }

        // Lag en ny oppgaverad fra taskrow-templaten
        const rowClone = taskrow.content.cloneNode(true);
        const row = rowClone.querySelector("tr");

        // Lagre ID-en på raden til updateTask() og removeTask() senere
        row.dataset.taskId = task.id;

        // De to første td-elementene er tittel og status
        const cells = row.querySelectorAll("td");
        cells[0].textContent = task.title;
        cells[1].textContent = task.status;

        // Fyll nedtrekkslisten med de mulige statusene
        const select = row.querySelector("select");
        const modifyOption = select.querySelector("option");

        for (const status of this.allstatuses) {
            const option = modifyOption.cloneNode(true);

            option.value = status;
            option.textContent = status;
            option.selected = false;

            select.append(option);
        }

        // Nyeste oppgave skal ligge øverst
        table.querySelector("tbody").prepend(row);
    }

    /**
     * Update the status of a task in the view
     * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
     */
    updateTask(task) {
        /**
         * Fill inn the code
         */
    }

    /**
     * Remove a task from the view
     * @param {Integer} task - ID of task to remove
     */
    removeTask(id) {
        /**
         * Fill inn the code
         */
    }

    /**
     * @public
     * @return {Number} - Number of tasks on display in view
     */
    getNumtasks() {
        /**
         * Fill inn the code
         */
    }
}
customElements.define('task-list', TaskList);
