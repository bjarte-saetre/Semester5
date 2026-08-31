class Controller {
    #repeat;
    #send;
    #l10nDate;
    #timer;

    constructor() {
        this.#repeat = this.#repeatRequest.bind(this);
        this.#send = this.#sendRequest.bind(this);

        const options = { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3 };
        this.#l10nDate = new Intl.DateTimeFormat("en-GB", options);

        document.getElementById("start").addEventListener("click", this.#start.bind(this));
        document.getElementById("stop").addEventListener("click", this.#stop.bind(this));
    }

    #stop() {
        console.log("Stopping repeated request");
        window.clearTimeout(this.#timer);
        this.#timer == null;
        document.getElementById("start").disabled = false;
        document.getElementById("stop").disabled = true;
    }

    #start() {
        console.log("Starting repeated request");
        document.getElementById("start").disabled = true;
        document.getElementById("stop").disabled = false;
        this.#send();
    }

    #repeatRequest() {
        this.#timer = window.setTimeout(this.#send, 5000);
    }

    async #sendRequest() {
        try {
            const clienttime = new Date();
            const response = await fetch("../api/servertime", { method: "GET" });
            if (response.ok) {
                const object = await response.json();

                if (typeof object.responseStatus != "undefined") {
                    if (object.responseStatus) {
                        const servertime = new Date(object.servertime);

                        document.getElementById("client").textContent = this.#l10nDate.format(clienttime);
                        document.getElementById("server").textContent = this.#l10nDate.format(servertime);
                        this.#repeat();
                    }
                }
            }
        } catch (e) {
            console.log(`Got error: ${e.message}.`);
        }
    }
}

new Controller;
