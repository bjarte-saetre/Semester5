class Controller {
    constructor() {
        document.getElementById("requestData").addEventListener("click",this.#sendGetRequest.bind(this));
    }

    async #sendGetRequest() {
        try {
            const response = await fetch("https://eple.hvl.no/fag/dat152/h2024/sop/demo1.txt");
            console.log(`Got response from server: ${response}`);
        } catch (e) {
            console.log(`Got error: ${e.message}`);
        }
    }
}

new Controller;
