"use strict";

// Skriv JavaScript-løsningen til oppgave 2 her.

function beregn() {
    const fraInput = document.querySelector("#fraDato").valueAsNumber;
    const tilInput = document.querySelector("#tilDato").valueAsNumber;
    const spanElement = document.querySelector("span");
    if (fraInput > tilInput) {
    spanElement.textContent = "Fra dato må være før til dato!"
    } else {
        spanElement.textContent = "Det er " + ((tilInput - fraInput) / (1000*60*60*24)) + " dager mellom datoene.";
    }
}

const button = document.querySelector("button");
button.addEventListener("click", beregn);
