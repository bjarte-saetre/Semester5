class WorkerC {
    constructor() {
        self.addEventListener('message', this.#start.bind(this));
    }

    #start(event) {
        console.log(`${this.constructor.name} is running`);

        const sharedmemory = event.data;
        const view = new Int32Array(sharedmemory);

        // If line below is commented out, WorkerA never finishes
        Atomics.store(view, 1, 1); // No more will wait for this index
        Atomics.notify(view, 1); // Index 1: Notify all workers that were waiting

        self.postMessage({ 'worker': this.constructor.name });
    }
}

new WorkerC();

