class CustomFooter extends HTMLElement {
    constructor () {
        super();
            this.attachShadow({mode:"open"});         
            this.footer = document.createElement("footer");
             const footing = document.createElement("p");
             
             footing.textContent = "© 2024 Mi Sitio Web. Todos los derechos reservados."; // Texto del footer
            
             this.footer.appendChild(footing);

            this.estilo = document.createElement("style");
            this.estilo.textContent=`


          
            footer {
                background-color: #333;
                color: white;
                text-align: center;
                padding: 1em 0;
                position: fixed;
                bottom: 0;
                width: 100%;
            }

            p {
                margin: 0;
                font-family: Arial, sans-serif;
                font-size: 1rem;
            }
            
            `;
               this.shadowRoot.appendChild(this.estilo);
               this.shadowRoot.appendChild(this.footer);
              
    }
}
window.customElements.define('custom-footer',CustomFooter);