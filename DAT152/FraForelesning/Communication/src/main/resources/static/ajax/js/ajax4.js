class Controller {
    constructor() {
        document.getElementById("requestData").addEventListener("click", this.#sendRequest.bind(this));
    }

    async #sendRequest() {
        const data = {
            "givenname": "Per",
            "familyname": "Persen",
            "level": "master"
        };

        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(data),
            "cache": "no-cache",
            "redirect": "error"
        };

        console.log(`Request data: '${JSON.stringify(data)}'`);

        try {
            //console.log(window.location);
            const response = await fetch("../apidb/student", requestSettings);
            const object = await response.json();

            console.log(`Server response: '${JSON.stringify(object)}'`)
        } catch (e) {
            console.log(`Got error: ${e.message}.`);
        }
    }
}

new Controller;
