class PerfilUsuario extends HTMLElement {
    constructor() {
        super();

        // Crear el Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });

        // Contenedor principal
        this.profileContainer = document.createElement('div');
        this.profileContainer.classList.add('profile-container');

        // Estructura del componente con imagen y atributos dinámicos
        this.profileContainer.innerHTML = `
            <img src="${this.getAttribute('profile-pic') || 'img/foto1.jpg'}" alt="Foto del usuario" class="profile-pic">
            <div class="username">${this.getAttribute('username') || 'Edison Carvajal'}</div>
            <div class="bio">${this.getAttribute('bio') || 'Militar y estudiante de ITIN'}</div>
            <div class="seguidores">${this.getAttribute('seguidores') || '3 mil seguidores'}</div>
            <button class="action-button">${this.getAttribute('button-label') || 'Agregar'}</button>
        `;

        // Estilos
        const estilo = document.createElement("style");
        estilo.textContent = `
            .profile-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                font-family: Arial, sans-serif;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 300px;
                margin: 10px auto;
                background: #e23386;
            }

            .profile-pic {
                border-radius: 50%;
                margin-bottom: 10px;
                width: 150px;
                height: 150px;
                object-fit: cover;
            }

            .username {
                font-size: 1.2em;
                margin: 10px 0 5px;
                color: white;
            }

            .bio {
                font-size: 0.9em;
                color: black;
                margin: 0 0 10px;
            }

            .seguidores {
                font-size: 0.9em;
                color: white;
                margin: 0 0 10px;
            }

            button {
                padding: 10px 20px;
                font-size: 1em;
                font-family: Arial, sans-serif;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                color: #fff;
                background-color: #007bff;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: green; /* Cambia a verde cuando el mouse está sobre el botón */
            }
        `;

        // Agregar al Shadow DOM
        this.shadow.appendChild(estilo);
        this.shadow.appendChild(this.profileContainer);
    }

    connectedCallback() {
        this.style.display = 'none'; // Ocultar inicialmente
        this.addEventListener('show', () => this.mostrarPerfil()); // Escuchar el evento 'show'

        // Obtener el botón
        const button = this.shadow.querySelector('.action-button');

        // Evento para cambiar el texto a "Amigo" cuando se hace clic
        button.addEventListener('click', () => {
            button.textContent = 'Amigo'; // Cambiar el texto del botón
            button.style.backgroundColor = 'green'; // Cambiar el color de fondo a verde
        });
    }

    mostrarPerfil() {
        // Mostrar el perfil
        this.style.display = 'block';
    }
}

window.customElements.define("perfil-usuario", PerfilUsuario);
