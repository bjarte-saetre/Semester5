import sleep from '../../common/modules/sleep.js';

class Controller {

    constructor() {
        console.clear();
        const readmessage = this.#readmessage.bind(this);

        if (crossOriginIsolated) {
            if (window.Worker) {
                // Must use Int32, i.e. 4 bytes per int, or 12 bytes for 3 int
                const sharedmemory = new SharedArrayBuffer(12); // Initialized to 0

                const workerA = new Worker("./js/workers/blocking/a.js");
                workerA.addEventListener('message', readmessage);
                const workerB = new Worker("./js/workers/blocking/b.js");
                workerB.addEventListener('message', readmessage);
                const workerC = new Worker("./js/workers/blocking/c.js");
                workerC.addEventListener('message', readmessage);

                workerA.postMessage(sharedmemory);
                workerC.postMessage(sharedmemory);
                sleep(5);
                workerB.postMessage(sharedmemory);
            } else {
                console.log('Your browser does not support web workers.');
            }

        } else {
            console.log("Browser is not cross origin isolated");
        }
    }

    #readmessage(event) {
        console.log(`Main thread: Worker ${event.data.worker} is finished.`);
    }
}

document.getElementsByTagName('button')[0].addEventListener('click', () => { new Controller() });