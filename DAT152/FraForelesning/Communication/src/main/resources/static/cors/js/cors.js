class Controller {
    constructor() {
        document.getElementById("requestData").addEventListener("click", this.#sendGetRequest.bind(this));
    }

    async #sendGetRequest() {
        try {
            const response = await fetch("https://eple.hvl.no/fag/dat152/h2024/sop/demo2.txt");
            const text = await response.text();
            console.log(`Response from server is '${text.trim()}'`);;
        } catch (e) {
            console.log(`Got error: ${e.message}`);
        }
    }
}

new Controller;
