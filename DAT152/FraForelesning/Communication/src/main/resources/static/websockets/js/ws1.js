class Controller {
    #ws = null;
    #onOpen;
    #onGotmessage;
    #onClose;

    constructor() {
        this.#onOpen = this.#openCallback.bind(this);
        this.#onGotmessage = this.#gotmessageCallback.bind(this);
        this.#onClose = this.#closeCallback.bind(this);

        document.getElementById("open").addEventListener("click", this.#open.bind(this));
        document.getElementById("close").addEventListener("click", this.#close.bind(this));
    }

    #open() {
        // Ensure that only one connection is open at any time
        if ((this.#ws === null) || (this.#ws.readyState === WebSocket.CLOSED)) {
            console.log("Opening the connection");
            this.#ws = new WebSocket(`ws://${document.location.host}/Communication/socket`);

            // Callback to run when socket is opened
            this.#ws.addEventListener("open", this.#onOpen);

            // Callback to run when data is received from the server
            this.#ws.addEventListener("message", this.#onGotmessage);

            // Callback to run when socket is closed
            this.#ws.addEventListener("close", this.#onClose);
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

    #openCallback() {
        console.log("Connection was opened");
        // Sending data to server
        this.#ws.send("Data sent from client to server");
    }

    #gotmessageCallback(event) {
        console.log(`Got message from server: ${event.data}`);
        console.log(`Origin of data: ${event.origin}`);
    }

    #closeCallback(event) {
        console.log("Connection was closed");
        console.log(`Code: ${event.code}`);
        console.log(`Reason: ${event.reason}`);
        if (event.wasClean) {
            console.log("Clean closing of connection");
        } else {
            console.log("Unclean closing of connection");
        }
    }
}

new Controller;
