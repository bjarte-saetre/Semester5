class Controller {
    constructor() {
        console.clear();

        if (window.Worker) {
            const root = document.getElementById('root');
            const myWorker = new Worker("./js/workers/domfailworker.js");
            myWorker.addEventListener('message', this.#readmessage.bind(this));

            // Below will fail. WebWorker can not access the DOM
            myWorker.postMessage(root);

        } else {
            console.log('Your browser does not support web workers.');
        }
    }

    #readmessage(event) {
        console.log(event.data);
    }
}

document.getElementsByTagName('button')[0].addEventListener('click', () => { new Controller() });
