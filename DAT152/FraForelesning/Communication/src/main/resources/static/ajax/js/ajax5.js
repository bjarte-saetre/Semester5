class Controller {
    constructor() {
        document.getElementById("requestData").addEventListener("click", this.#sendRequest.bind(this));
    }

    async #sendRequest() {
        try {
            const response = await fetch("dok/demo1.txt", { method: "GET" });

            if (response.ok) {
                console.log(`Got document '${response.url}'`)
            } else {
                console.log(`Could not retrieve '${response.url}'`)
            }

            console.log(`Status code: ${response.status}`)

            console.log("The headers of the response:")

            // console.log(response.headers.get("connection"));

            for (let pair of response.headers) {
                // console.log(pair instanceof Array)
                console.log(`* '${pair[0]}': '${pair[1]}'`)
            }
        } catch (e) {
            console.log(`Got error: ${e.message}.`);
        }
    }
}

new Controller;
