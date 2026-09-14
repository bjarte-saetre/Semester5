class Controller {
    constructor() {
        document.getElementById("requestData").addEventListener("click", this.#sendRequest.bind(this));
    }

    async #sendRequest() {
        try {
            const response = await fetch("dok/demo1.txt");
            const text = await response.text();
            console.log(`Response from server is '${text.trim()}'`);;
        } catch (e) {
            console.log(`Got error: ${e.message}.`);
        }
    }
}

new Controller;
