"use strict";

{
    async function attatch(element,eventType) {
        try {
            let promiseForEvent = new Promise(
                (resolve) => {
                    element.addEventListener(
                        eventType,
                        (event) => resolve(event)
                    );
                }
            )
            const event = await promiseForEvent;
            alert(`${event.type} occurred on ${event.target}.`);
        } catch(error) {
            console.log(error.message);
        }
    }    

    attatch(document.getElementsByTagName('button')[0],'click');
}
