"use strict";

{
    const myPromise = new Promise(
        (resolve, reject) => {
            const result = 123;
            const OK = true;
            if (OK) {
                resolve(result);
            } else {
                reject(new Error("Something failed"));
            }
        }
    )


    myPromise.then(
        (result) => { console.log(result) }
    ).catch(
        (error) => { console.log(error) }
    );
}