"use strict";

{
    function myPromise(number) {
        // A rather useless promise, as it resolves or rejects immideately
        return new Promise(
            (resolve, reject) => {
                if (number > 0) {
                    resolve(number * number);
                } else {
                    reject(new Error("Something is wrong"));
                }
            }
        )
    }

    async function usePromise(number) {
        try {
            const result = await myPromise(number);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    usePromise(22);
    usePromise(-12);
}