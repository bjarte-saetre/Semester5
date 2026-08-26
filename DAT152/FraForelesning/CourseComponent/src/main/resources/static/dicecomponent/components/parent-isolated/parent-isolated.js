import "../dice-isolated/dice-isolated.js";

const template = document.createElement("template")
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${new URL('parent-isolated.css',import.meta.url)}">

    <h1>Isolated dice component</h1>

    <p>In this demonstration, the dice is completely isolated from its surroundings.
     There is no communication neither to or from the component.</p>
    
    <bki2026-dicecomponent></bki2026-dicecomponent>`;

class ParentIsolated extends HTMLElement {
   constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        const content = template.content.cloneNode(true);
        shadow.append(content);        
    }
}

customElements.define('bki2026-parentcomponent', ParentIsolated);
