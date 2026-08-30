"use strict";

const primeNumber = {
    'isPrime': function(number) {
        if (typeof number != 'number') return null;
        else if (!Number.isInteger(number)) return null;
        else if (number < 2) {
            return false;
        } else if (number == 2) {
            return true;
        } else if (number == 3) {
            return true;
        } else {
            let last = Math.floor(number / 2);
            for (let i = 2; i <= last; ++i) {
                const remainder = number % i;
                if (remainder == 0) return false;
            }
            return true;
        }
    },

    'nextPrime': function(number) {
        while (true) {
            if (this.isPrime(number)) return number;
            ++number;
        }
    },

    'perviousPrime': function(number) {
        while (true) {
            if (this.isPrime(number)) return number;
            --number;
        }
    }
}