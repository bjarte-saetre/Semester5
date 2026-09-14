const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/studentform.css"></link>
    <form>
        <fieldset>
            <legend>Fill inn student data</legend>
            <div id="inputframe">
                <label for="givenname">Given name</label>
                <input type="text" id="givenname" name="givenname" required pattern="\\s*\\p{Lu}\\p{Ll}+(\\s+\\p{Lu}\\p{Ll}+)*\\s*" placeholder="Your first names"
                    title="Each part should only contain letters, starting with an uppercase letter, then lowercase letters, e.g. Ole Johan" value=""></input>
                <label for="familyname">Family name</label><input type="text" id="familyname" name="familyname" required pattern="\\s*\\p{Lu}\\p{Ll}+\\s*" placeholder="Your last name"
                    title="Last name should only contain letters, starting with an uppercase letter, then lowercase letters, e.g. Olsen" value=""></input>
                <label for="level">Study level</label>
                <select id="level" name="level" required>
                    <option value="">-- Choose level --</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="master">Master</option>
                    <option value="phd">PHD</option>
                </select>
            </div>
            <button type="submit">Save</button><button type="button">Reset</button>
        </fieldset>
    </form>
    <div id="message" class="hidden"><p></p></div>
`;

class StudentForm extends HTMLElement {
    #shadow;
    #callbacks = new Map();

    constructor() {
        // Always call super first in constructor
        super();

        // Entry point to the shadow DOM
        this.#shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);
        this.#shadow.appendChild(content);


        const form = this.#shadow.querySelector("form");
        form.addEventListener('submit', this.#send.bind(this));
        form.querySelector("button[type=button]").addEventListener('click', this.#reset.bind(this));
    }

    /**
     * @public
     * @param{Function} method
     */
    setSubmitcallback(method) {
        const callbackId = Symbol("removeCallback");
        this.#callbacks.set(callbackId, method);
        return callbackId;
    }

    deleteSendcallback(callbackId) {
        this.#callbacks.delete(callbackId);
    }

    /**
     * @public
     * @param{String} message
     */
    setMessage(message) {
        const messageElement = this.#shadow.getElementById("message");
        if (message.trim() == "") {
            messageElement.classList.add("hidden");
            messageElement.querySelector("p").textContent = "";
        } else {
            messageElement.classList.remove("hidden");
            messageElement.querySelector("p").textContent = message;
        }
    }

    #send(event) {
        /**
         * Do not submit form data.
         *
         * On submit, FORM elements are automatically validated by the browser against e.g. the 'pattern' attribute.
         * The easiest approach is therefore to use the submit event, and then prevent the default behaviour of the event.
         *
         * An alternative approach is to use a 'click' event, and then for each input element run the method
         * 'checkValidity()' that exists on input elements. This method validate the elemement.
         **/
        event.preventDefault();
        this.setMessage("");

        const student = {};
        const formData = new FormData(event.target);
        for (let pair of formData) {
            student[pair[0]] = pair[1].trim();
        }

        /**
          * I here I trust the HTML5 pattern validation
          * Input elements have a 'validity' property and a method 'setCutomValidity()' that can be
          * used for more precise validation messages.
          **/
        this.#callbacks.forEach(method => { method(student) });
    }

    #reset() {
        this.setMessage("");
        this.#shadow.getElementById("givenname").value = "";
        this.#shadow.getElementById("familyname").value = "";
        this.#shadow.getElementById("level").value = "";
    }
}

customElements.define('student-form', StudentForm);

