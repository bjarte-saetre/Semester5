const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${new URL('tasklist.css', import.meta.url)}">

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
 * TaskList from the previous JavaScript lab.
 *
 * This component owns the task table and all event listeners in it.
 * It must not contain fetch/Ajax code or refer to TaskView or TaskBox.
 */
class TaskList extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.append(template.content.cloneNode(true));

        this.allstatuses = [];
        this.changestatusCallbacks = [];
        this.deletetaskCallbacks = [];
    }

    /** @param {Array<string>} allstatuses */
    setStatuseslist(allstatuses) {
        this.allstatuses = allstatuses;
    }

    /** @param {function(number, string): void} callback */
    addChangestatusCallback(callback) {
        this.changestatusCallbacks.push(callback);
    }

    /** @param {function(number): void} callback */
    addDeletetaskCallback(callback) {
        this.deletetaskCallbacks.push(callback);
    }

    /** @param {{id: number, title: string, status: string}} task */
    showTask(task) {
        const container = this.shadowRoot.querySelector("#tasklist");
        let table = container.querySelector("table");

        if (table === null) {
            container.append(tasktable.content.cloneNode(true));
            table = container.querySelector("table");
        }

        const rowClone = taskrow.content.cloneNode(true);
        const row = rowClone.querySelector("tr");
        row.dataset.taskId = task.id;

        const cells = row.querySelectorAll("td");
        cells[0].textContent = task.title;
        cells[1].textContent = task.status;

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

        table.querySelector("tbody").prepend(row);
    }

    /** @param {{id: number, status: string}} task */
    updateTask(task) {
        const row = this.shadowRoot.querySelector(`tr[data-task-id="${task.id}"]`);

        if (row !== null) {
            row.querySelectorAll("td")[1].textContent = task.status;
        }
    }

    /** @param {number} id */
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

    /** @returns {number} */
    getNumtasks() {
        return this.shadowRoot.querySelectorAll("#tasklist tbody tr").length;
    }
}

customElements.define("group21-tasklist", TaskList);
