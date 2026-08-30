const template = document.createElement("template");
template.innerHTML = `
    <p>
        Number is: <span id="number"></span>
    </p>
    <p>
        <button type="button" id="bt">Increment</button>
    </p>
`;

class IncrementDemo extends HTMLElement {
    #shadow;

    constructor() {
        super();

        this.#shadow = this.attachShadow({ mode: 'closed' });
        this.#shadow.appendChild(template.content.cloneNode(true));

        const bt = this.#shadow.getElementById('bt');
        bt.addEventListener('click', this.#increment.bind(this));

        this.#value = 0;
    }

    /**
     * @private
     * @param{Number} v
     */
    set #value(v) {
        this.#shadow.getElementById('number').textContent = v.toString();
    }

    get #value() {
        return Number(this.#shadow.getElementById('number').textContent);
    }

    #increment() {
        ++this.#value;
    }
}

customElements.define('increment-demo', IncrementDemo);
