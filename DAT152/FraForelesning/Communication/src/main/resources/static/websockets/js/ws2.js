class Controller {
    #ws = null;
    #onGotmessage;

    constructor() {
        this.#onGotmessage = this.#gotmessageCallback.bind(this);

        document.getElementById("start").addEventListener("click", this.#open.bind(this));
        document.getElementById("stop").addEventListener("click", this.#close.bind(this));
    }

    #open() {
        // Ensure that only one connection is open at any time
        if ((this.#ws === null) || (this.#ws.readyState === WebSocket.CLOSED)) {
            this.#ws = new WebSocket(`ws://${document.location.host}/Communication/random`);

            // Callback to run when socket is opened
            this.#ws.addEventListener("open", () => { console.log("Connection opened") });

            // Callback to run when data is received from the server
            this.#ws.addEventListener("message", this.#onGotmessage);

            // Callback to run when socket is closed
            this.#ws.addEventListener("close", () => { console.log("Connection closed") });
        }
    }

    #close() {
        if (this.#ws !== null) {
            if ((this.#ws.readyState !== WebSocket.CLOSED) && (this.#ws.readyState !== WebSocket.CLOSING)) {
                console.log("Closing the connection");
                this.#ws.close();
            }
        }
    }

    #gotmessageCallback(event) {
        document.getElementById("randomnumber").textContent = event.data;
    }
}

new Controller;
