self.importScripts('../../../common/sleep.js')

class MyWorker {
    constructor() {
        self.addEventListener('message', this.#readmessage.bind(this));
    }

    #readmessage(event) {
        console.log('Before sleep');
        sleep(event.data);
        console.log('After sleep');
        self.postMessage('WebWorker has finished');
    }
}

new MyWorker();
