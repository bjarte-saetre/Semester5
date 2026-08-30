class MyWorker {
    constructor() {
        self.addEventListener('message', this.#readmessage.bind(this));
    }

    #readmessage(event) {
        console.log(event.data);
        self.postMessage('WebWorker has finished');
    }
}

new MyWorker();
