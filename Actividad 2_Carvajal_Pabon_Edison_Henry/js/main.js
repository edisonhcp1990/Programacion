class MainContainer extends HTMLElement {
    constructor() {
        super();

        // Crear el Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Contenedor principal
        const container = document.createElement('div');
        container.classList.add('main-container');

        // Estructura de slots
        container.innerHTML = `
            <header>
                <slot name="header"></slot>
            </header>
            <nav>
                <slot name="menu"></slot>
            </nav>
            <section>
                <slot name="tabla-empleados"></slot>
                <slot name="perfil-usuario"></slot>
            </section>
            <footer>
                <slot name="footer"></slot>
            </footer>
        `;

        // Estilos
        const style = document.createElement('style');
        style.textContent = `
            .main-container {
                
                grid-template-rows: auto 3fr auto;
                grid-template-columns: 1fr;
               
                min-height: 100vh;
                background-color: #cbe1d3;
                font-family: Arial, sans-serif;
            }

           
        `;

        // Agregar al Shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(container);
    }
}

// Definir el custom element
window.customElements.define('main-container', MainContainer);
