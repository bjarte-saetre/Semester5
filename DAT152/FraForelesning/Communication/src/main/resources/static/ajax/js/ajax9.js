class Controller {
    constructor() {
        document.getElementById("requestDocument").addEventListener("click", this.#sendRequest.bind(this));
    }

    async #sendRequest() {
        try {
            document.querySelector("progress").classList.remove("hidden");
            const response = await fetch("https://eple.hvl.no/fag/dat152/largefile.bin");
            const total = Number(response.headers.get('content-length'));
            const reader = response.body.getReader();
            let bytesReceived = 0;
            while (true) {
                const result = await reader.read();
                if (result.done) {
                    document.querySelector("progress").classList.add("hidden");
                    document.querySelector("p[data-status]").classList.remove("hidden");
                    break;
                }
                bytesReceived += result.value.length;
                let percentageLoaded = 5 * Math.round(20 * bytesReceived / total);
                document.querySelector("progress").value = percentageLoaded;
            }
        } catch (e) {
            console.log(`Got error: ${e.message}.`);
        }
    }
}

new Controller();
