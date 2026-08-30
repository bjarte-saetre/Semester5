class Controller {
    #sharedmemory;

    constructor() {
        console.clear();
        const readmessage = this.#readmessage.bind(this);

        if (crossOriginIsolated) {
            if (window.Worker) {
                this.#sharedmemory = new SharedArrayBuffer(1);
                const view = new Uint8Array(this.#sharedmemory);
                Atomics.store(view, 0, 12);
                console.log(`Main thread: Initial value is ${Atomics.load(view, 0)}`);

                const workerA = new Worker("./js/workers/sharedmemory/a.js");
                workerA.addEventListener('message', readmessage);
                const workerB = new Worker("./js/workers/sharedmemory/b.js");
                workerB.addEventListener('message', readmessage);

                workerA.postMessage(this.#sharedmemory);
                workerB.postMessage(this.#sharedmemory);
            } else {
                console.log('Your browser does not support web workers.');
            }

        } else {
            console.log("Browser is not cross origin isolated");
        }
    }

    #readmessage(event) {
        console.log(`Main thread: Worker ${event.data.worker} is finished.`);
        const view = new Uint8Array(this.#sharedmemory);
        console.log(`Main thread: Value is now ${Atomics.load(view, 0)}`);
    }
}

document.getElementsByTagName('button')[0].addEventListener('click', () => { new Controller() });
