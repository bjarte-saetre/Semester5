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

// TaskList viser oppgavene i en tabell og håndterer knappene i tabellen.
// Komponenten skal ikke kontakte API-et selv. Det er TaskView som bruker fetch.
class TaskList extends HTMLElement {

    // Oppretter komponentens Shadow DOM og gjør klar lister for statuser og callbacks.
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.append(template.content.cloneNode(true));

        this.allstatuses = [];
        this.changestatusCallbacks = [];
        this.deletetaskCallbacks = [];
    }

    // Lagrer statusene som senere skal vises i nedtrekkslisten for hver oppgave.
    setStatuseslist(allstatuses) {
        this.allstatuses = allstatuses;
    }

    // Lagrer en funksjon som skal kjøres når brukeren velger en ny status.
    addChangestatusCallback(callback) {
        this.changestatusCallbacks.push(callback);
    }

    // Lagrer en funksjon som skal kjøres når brukeren vil slette en oppgave.
    addDeletetaskCallback(callback) {
        this.deletetaskCallbacks.push(callback);
    }

    // Lager en ny tabellrad og viser oppgaven i tabellen.
    showTask(task) {
        const container = this.shadowRoot.querySelector("#tasklist");
        let table = container.querySelector("table");

        // Tabellen lages bare første gang en oppgave skal vises.
        if (table === null) {
            container.append(tasktable.content.cloneNode(true));
            table = container.querySelector("table");
        }

        // Lager en ny rad fra taskrow-templaten og lagrer oppgavens ID på raden.
        const rowClone = taskrow.content.cloneNode(true);
        const row = rowClone.querySelector("tr");
        row.dataset.taskId = task.id;

        // Skriver oppgavens tittel og nåværende status i de to første cellene.
        const cells = row.querySelectorAll("td");
        cells[0].textContent = task.title;
        cells[1].textContent = task.status;

        // Fyller nedtrekkslisten med alle statusene som kom fra setStatuseslist().
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

        // Spør om bekreftelse og varsler TaskView når statusen blir endret.
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

        // Spør om bekreftelse og varsler TaskView når Remove-knappen blir trykket.
        const removeButton = row.querySelector("button");
        removeButton.addEventListener("click", () => {
            const approved = window.confirm(`Delete task '${task.title}'?`);

            if (approved) {
                for (const callback of this.deletetaskCallbacks) {
                    callback(task.id);
                }
            }
        });

        // Legger den nye oppgaven øverst i tabellen.
        table.querySelector("tbody").prepend(row);
    }

    // Finner en oppgave ved hjelp av ID-en og oppdaterer statusen som vises.
    updateTask(task) {
        const row = this.shadowRoot.querySelector(`tr[data-task-id="${task.id}"]`);

        if (row !== null) {
            row.querySelectorAll("td")[1].textContent = task.status;
        }
    }

    // Fjerner oppgaven med riktig ID og fjerner tabellen dersom listen blir tom.
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

    // Teller og returnerer hvor mange oppgaver som vises i tabellen.
    getNumtasks() {
        return this.shadowRoot.querySelectorAll("#tasklist tbody tr").length;
    }
}

customElements.define("group21-tasklist", TaskList);
