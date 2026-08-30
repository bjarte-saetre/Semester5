"use strict";

self.importScripts('../../utils/primenumber.js')

self.addEventListener('message', (e) => {
    if (typeof e.data.number == 'number') {
        const number = e.data.number;
        if (Number.isInteger(number)) {
            const prevPrime = primeNumber.perviousPrime(number);
            self.postMessage({ 'prime':  prevPrime});
        }
    }
});