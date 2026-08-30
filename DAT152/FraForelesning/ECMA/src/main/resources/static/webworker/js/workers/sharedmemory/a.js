class WorkerA {
    constructor() {
        self.addEventListener('message', this.#start.bind(this));
    }

    #start(event) {
        const sharedmemory = event.data;
        const view = new Uint8Array(sharedmemory);

        Atomics.add(view, 0, 3);
        console.log(`${this.constructor.name}: value is now ${Atomics.load(view, 0)}`);
        self.postMessage({ 'worker': this.constructor.name });
    }
}

new WorkerA();
