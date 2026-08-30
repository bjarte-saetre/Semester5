const template = document.createElement("template");
template.innerHTML = `
    <p>
        <button type="button" id="bt">Create long running worker</button>
    </p>
`;

class LongrunDemo extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(template.content.cloneNode(true));
        const bt = shadow.getElementById('bt');
        bt.addEventListener('click', this.#sleep.bind(this));
    }

    #sleep() {
        if (window.Worker) {
            const myWorker = new Worker("./js/workers/longrunworker.js");
            const sleeptime = 10;

            myWorker.addEventListener('message',
                (e) => {
                    console.log(e.data);
                })

            myWorker.postMessage(sleeptime);
        } else {
            console.log('Your browser does not support web workers.');
        }
    }
}
customElements.define('longrun-demo', LongrunDemo);
