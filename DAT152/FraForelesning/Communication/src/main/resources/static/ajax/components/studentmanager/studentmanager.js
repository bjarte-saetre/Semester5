import '../studentform/studentform.js';
import '../studentlist/studentlist.js';

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/studentmanager.css"></link>
    <div>
        <student-form></student-form>
        <student-list></student-list>
    </div>`;

// Will export something to require file to be loaded as a module
export default null;

class StudentManager extends HTMLElement {
    #shadow;
    #serviceurl;

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });

        const content = template.content.cloneNode(true);
        this.#shadow.appendChild(content);

        this.#serviceurl = this.getAttribute("data-serviceurl");

        this.#shadow.querySelector("student-list").setRemovecallback(this.#deleteStudent.bind(this));
        this.#shadow.querySelector("student-form").setSubmitcallback(this.#addStudent.bind(this));

        this.#loadStudents();
    }

    async #loadStudents() {
        try {
            const response = await fetch(`${this.#serviceurl}/studentlist`);
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const studentlist = this.#shadow.querySelector("student-list");
                        object.students.forEach(
                            student => { studentlist.add(student) }
                        );
                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server");
        }
    }

    async #deleteStudent(studentId) {
        try {
            const response = await fetch(`${this.#serviceurl}/student/${studentId}`, { "method": "DELETE" });
            if (response.ok) {
                const object = await response.json();
                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const studentlist = this.#shadow.querySelector("student-list");
                        studentlist.remove(object.id);
                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server");
        }
    }

    async #addStudent(student) {
        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(student),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch(`${this.#serviceurl}/student`, requestSettings);
            if (response.ok) {
                const object = await response.json();

                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const studentlist = this.#shadow.querySelector("student-list");
                        studentlist.add(object.student);
                    } else {
                        console.log("Could not connect to server");
                    }
                } else {
                    console.log("Could not connect to server");
                }
            }
        } catch (e) {
            console.log("Could not connect to server");
        }
    }
}

customElements.define('student-manager', StudentManager);

