self.importScripts('../../utils/primenumber.js');

class PrimeumberWorker {
    constructor() {
        const number = 346548;
        const nextPrime = primeNumber.nextPrime(346548);
        self.postMessage({ "success": true, "value": nextPrime, "input": number });
    }
}

new PrimeumberWorker;
