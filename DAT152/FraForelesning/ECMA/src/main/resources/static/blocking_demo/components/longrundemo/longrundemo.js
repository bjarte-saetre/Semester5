import sleep from '../../../common/modules/sleep.js';

const template = document.createElement("template");
template.innerHTML = `
    <p>
        <button type="button" id="bt">Sleep 5 seconds</button>
    </p>`;

class LongrunDemo extends HTMLElement {
    #shadow;

    constructor() {
        super();

        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#shadow.appendChild(template.content.cloneNode(true));

        const bt = this.#shadow.getElementById('bt');
        bt.addEventListener('click', this.#sleep.bind(this));
    }

    #sleep() {
        console.log("Before sleep");
        sleep(5);
        console.log("After sleep");
    }
}

customElements.define('longrun-demo', LongrunDemo);
