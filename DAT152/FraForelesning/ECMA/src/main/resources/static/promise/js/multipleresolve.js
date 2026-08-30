"use strict";

{
    function demo() {
        return new Promise(
            (resolve) => {
                resolve(1);
                console.log('Pkt A');

                resolve(2);
                console.log('Pkt B');

                resolve(3);
                console.log('Pkt C');

                resolve(4);
                console.log('Pkt D');
            }
        )
    }

    async function init() {
        try {
            const result = await demo();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    document.getElementsByTagName('button')[0].addEventListener('click', () => { init() });
}
