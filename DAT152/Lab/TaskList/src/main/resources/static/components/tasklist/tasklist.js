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
        this.changestatusCallbacks = [];
        this.deletetaskCallbacks = [];
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
        this.changestatusCallbacks.push(callback);
    }

    /**
     * Add callback to run on click on delete button of a task
     * @public
     * @param {function} callback
     */
    addDeletetaskCallback(callback) {
        this.deletetaskCallbacks.push(callback);
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
            option.removeAttribute("selected");

            select.append(option);
        }

        select.addEventListener("change", () => {
            const newStatus = select.value;
            const currentStatus = cells[1].textContent;

            if (newStatus !== "0" && newStatus !== currentStatus) {
                const approved = window.confirm(`Set '${task.title}' to ${newStatus}?`);

                if (approved) {
                    for (const callback of this.changestatusCallbacks) {
                        callback(task.id, newStatus);
                    }
                }
            }

            select.value = "0";
        });

        const removeButton = row.querySelector("button");
        removeButton.addEventListener("click", () => {
            const approved = window.confirm(`Delete task '${task.title}'?`);

            if (approved) {
                for (const callback of this.deletetaskCallbacks) {
                    callback(task.id);
                }
            }
        });

        // Nyeste oppgave skal ligge øverst
        table.querySelector("tbody").prepend(row);
    }

    /**
     * Update the status of a task in the view
     * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
     */
    updateTask(task) {
        const row = this.shadowRoot.querySelector(`tr[data-task-id="${task.id}"]`);

        if (row !== null) {
            const cells = row.querySelectorAll("td");
            cells[1].textContent = task.status;
        }
    }

    /**
     * Remove a task from the view
     * @param {Integer} task - ID of task to remove
     */
    removeTask(id) {
        const container = this.shadowRoot.querySelector("#tasklist");
        const row = container.querySelector(`tr[data-task-id="${id}"]`);

        if (row !== null) {
            row.remove();
        }

        if (this.getNumtasks() === 0) {
            container.textContent = "";
        }
    }

    /**
     * @public
     * @return {Number} - Number of tasks on display in view
     */
    getNumtasks() {
        return this.shadowRoot.querySelectorAll("#tasklist tbody tr").length;
    }
}
customElements.define('task-list', TaskList);
