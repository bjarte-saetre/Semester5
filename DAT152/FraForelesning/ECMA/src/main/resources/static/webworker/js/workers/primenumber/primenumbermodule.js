import primeNumber from "../../utils/modules/primenumber.js";

class PrimeumberWorker {
    constructor() {
        self.addEventListener('message', this.#primenumber.bind(this));
    }

    #primenumber(event) {
        if (typeof event.data.number == 'number') {
            const number = event.data.number;
            if (Number.isInteger(number)) {
                const nextPrime = primeNumber.nextPrime(number);
                self.postMessage({ "success": true, "value": nextPrime, "input" : number });
            } else {
                self.postMessage({ "success": false, "message": "Number is not an integer", "input" : number });
            }
        } else {
            self.postMessage({ "success": false, "message": "Missing input" });
        }
    }
}

new PrimeumberWorker;
