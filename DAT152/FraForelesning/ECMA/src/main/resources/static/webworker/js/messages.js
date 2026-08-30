class Controller {
    constructor() {
        console.clear();

        if (window.Worker) {
            const primenumberWorker = new Worker(new URL("workers/primenumber/primenumber.js",import.meta.url));
            primenumberWorker.addEventListener('message', this.#messagePrimenumber.bind(this));
            primenumberWorker.postMessage({ "number": 346548 });
        } else {
            console.log('Your browser does not support web workers.');
        }

    }

    #messagePrimenumber(event) {
        const data = event.data;
        if (data.success) {
            console.log(`First prime number bigger or equal to ${data.input} is ${data.value}`);
        } else {
            console.log(data.message);
        }
    }
}

document.querySelector("button").addEventListener('click', () => { new Controller() });
