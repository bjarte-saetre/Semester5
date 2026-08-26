"use strict";

// Skriv JavaScript-løsningen til oppgave 1 her.

const stack = [];

function pushTilStack() {
    const inputElement = document.querySelector("input");
    stack.push(inputElement.value);
    console.log(stack);
    inputElement.value = "";
}
function popForste() {
    const siste = stack.pop();
    const spanElement = document.querySelector("span");
    spanElement.textContent = siste + " ble fjernet";

    if (stack.length === 0) {
        spanElement.textContent = "ingenting å poppe"
    }
}

const buttonPush = document.querySelector("#pushButton");
buttonPush.addEventListener("click", pushTilStack);

const buttonPop = document.querySelector("#popButton");
buttonPop.addEventListener("click", popForste);
