import sleep from '../../../common/modules/sleep.js';

const template = document.createElement("template");
template.innerHTML = `
    <p>
         <button type="button" id="bt">Sleep 5 seconds</button>
    </p>
`;

class PromiseLongrun extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(template.content.cloneNode(true));

        const bt = shadow.getElementById('bt');
        bt.addEventListener('click', this.#sleep.bind(this));
    }


    #sleep() {
        const myPromise = new Promise(
            (resolve) => {
                console.log("Before sleep");
                sleep(5);
                console.log("After sleep");
                resolve();
            }
        )

        myPromise.then(
            () => { console.log('Promise is finished') }
        )
    }
}

customElements.define('longrun-demo', PromiseLongrun);
