class WorkerA {
    constructor() {
        self.addEventListener('message', this.#start.bind(this));
    }

    #start(event) {
        console.log(`${this.constructor.name} is running`);

        const sharedmemory = event.data;
        const view = new Int32Array(sharedmemory);

        // Wait for WorkerB
        Atomics.wait(view, 0, 0); // Index 0: If value is 0, wait to be notified

        // Wait for WorkerC
        Atomics.wait(view, 1, 0); // Index 1: If value is 0, wait to be notified

        self.postMessage({ 'worker': this.constructor.name });
    }
}

new WorkerA();
