import '../components/incrementdemo/incrementdemo.js';
import sleep from '../modules/sleep.js';

class Controller {
    constructor() {
        document.getElementById("requestDocument").addEventListener("click", this.#sendRequest.bind(this));
    }

    async #sendRequest() {
        try {
            console.log("Before 'await fetch(...)' ");
            const response = await fetch("https://eple.hvl.no/fag/dat152/largefile.bin");

            console.log("Between 'await fetch' and 'await response.blob()'");
            const filebody = await response.blob();

            console.log(`Downloaded ${filebody.size} bytes\n\nBefore sleep in the 'then' callback for 'await response.blob()'`);

            sleep(10);

            console.log("After sleep in 'then' callback for 'await response.blob()'");

        } catch (e) {
            console.log(`Got error: ${e.message}.`);
        }
    }
}

new Controller();
