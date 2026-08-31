import '../components/studentform/studentform.js';

class Controller {
    #studentElement = null;

    constructor() {
        this.#studentElement = document.querySelector("student-form");
        this.#studentElement.setSubmitcallback(this.#sendRequest.bind(this));
    }

    async #sendRequest(data) {
        const requestSettings = {
            "method": "POST",
            "headers": { "Content-Type": "application/json; charset=utf-8" },
            "body": JSON.stringify(data),
            "cache": "no-cache",
            "redirect": "error"
        };

        try {
            const response = await fetch("../apidb/student", requestSettings);
            if (response.ok) {
                const object = await response.json();
                
                if (typeof object.responseStatus !== "undefined") {
                    if (object.responseStatus) {
                        this.#studentElement.setMessage(this.#success(data));
                    } else {
                        this.#studentElement.setMessage(this.#failure(data));
                    }
                } else {
                    this.#studentElement.setMessage(this.#failure(data));
                }
            }
        } catch (e) {
            this.#studentElement.setMessage(this.#failure(data));
        }
    }

    #success(data) {
        return `Data for ${data.givenname} ${data.familyname} was sucessfully saved on server.`;
    }

    #failure(data) {
        return `Failed to save data for ${data.givenname} ${data.familyname} on server.`;
    }
}

new Controller();
