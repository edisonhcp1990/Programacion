class CustomHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Crear y configurar el contenido del header
        this.header = document.createElement("header");
        const heading = document.createElement("h1");
        heading.textContent = "HolaHola!";

        // Agregar el título al header
        this.header.appendChild(heading);

        // Crear y configurar el estilo
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            header {
                background-color: #558967;
                text-align: center;
                padding: 1em 0;
                border: none;
                border-radius: 5px;
            }

            h1 {
        
                color: white;
                font-family: Arial, sans-serif;
                font-size: 2rem;
                text-transform: uppercase;
                margin: 0;
            }
        `;

        // Añadir estilo y contenido al shadow DOM
        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.header);
    }
}

// Registrar el custom element
window.customElements.define('custom-header', CustomHeader);
