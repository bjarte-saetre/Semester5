class WorkerB {
    constructor() {
        self.addEventListener('message', this.#start.bind(this));
    }

    #start(event) {
        console.log(`${this.constructor.name} is running`);

        const sharedmemory = event.data;
        const view = new Int32Array(sharedmemory);

        // If line below is commented out, WorkerA may not finishe
        Atomics.store(view, 0, 1);
        Atomics.notify(view, 0); // Index 0: Notify all workers that wait

        self.postMessage({ 'worker': this.constructor.name });
    }
}

new WorkerB();

