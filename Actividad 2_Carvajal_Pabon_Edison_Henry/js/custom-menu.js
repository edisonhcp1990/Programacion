class CustomMenu extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const menuContainer = document.createElement("div");
        menuContainer.classList.add('menu-container');

        const opcionesMenu = [
            { texto: 'Inicio', enlace: 'index.html' },
            { texto: 'Mi perfil', enlace: 'producto.html', id: 'mi-perfil' },
            { texto: 'Cuadro de información', enlace: '#', id: 'cuadro-info' },
            { texto: 'Galería', enlace: '#', id: 'galeria' },
            { texto: 'Registro', enlace: 'registro.html' }
        ];

        opcionesMenu.forEach(opcion => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");

            link.textContent = opcion.texto;
            link.href = opcion.enlace;

            // PARA OCULTAR Y MOSTRAR LA TABLA EMPLEADOS
            if (opcion.id === 'cuadro-info') {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevenir la navegación

                    // Ocultar todas las secciones dinámicas
                    this.ocultarSecciones();

                    // Ocultar el mensaje inicial
                    const inicioDiv = document.getElementById('inicio');
                    if (inicioDiv) inicioDiv.style.display = 'none';

                    // Mostrar la tabla
                    const tabla = document.querySelector('tabla-empleados');
                    if (tabla) {
                        tabla.style.display = 'block'; // Mostrar la tabla
                        const showEvent = new Event('show');
                        tabla.dispatchEvent(showEvent); // Emitir el evento 'show' para cargar los datos
                    }
                });
            }

            // PARA OCULTAR Y MOSTRAR MI PERFIL
            if (opcion.id === 'mi-perfil') {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevenir la navegación

                    // Ocultar todas las secciones dinámicas
                    this.ocultarSecciones();

                    // Ocultar el mensaje inicial
                    const inicioDiv = document.getElementById('inicio');
                    if (inicioDiv) inicioDiv.style.display = 'none';

                    // Mostrar el perfil
                    const perfil = document.querySelector('perfil-usuario');
                    if (perfil) {
                        perfil.style.display = 'block'; // Mostrar el perfil
                        const showEvent = new Event('show');
                        perfil.dispatchEvent(showEvent); // Emitir el evento 'show' para cargar los datos
                    }
                });
            }

            // PARA OCULTAR Y MOSTRAR LA GALERÍA
            if (opcion.id === 'galeria') {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevenir la navegación

                    // Ocultar todas las secciones dinámicas
                    this.ocultarSecciones();

                    // Ocultar el mensaje inicial
                    const inicioDiv = document.getElementById('inicio');
                    if (inicioDiv) inicioDiv.style.display = 'none';

                    // Mostrar la galería
                    const galeria = document.querySelector('pokemon-galery');
                    if (galeria) {
                        galeria.style.display = 'block'; // Mostrar la galería
                        const showEvent = new Event('show');
                        galeria.dispatchEvent(showEvent); // Emitir el evento 'show' para cargar los datos
                    }
                });
            }

            listItem.appendChild(link);
            menuContainer.appendChild(listItem);
        });

        const estilo = document.createElement("style");
        estilo.textContent = `
            .menu-container {
                justify-content: center;
                display: flex;
                background-color: #a4e3ba;
                border-radius: 5px;
            }
            li {
                list-style: none;
                margin: 5px 0;
                padding: 10px;
            }
            a {
                text-decoration: none;
                color: #333;
            }
            a:hover {
                color: #007BFF;
            }
        `;

        shadow.appendChild(estilo);
        shadow.appendChild(menuContainer);
    }

    ocultarSecciones() {
        // Ocultar todas las secciones dinámicas
        const secciones = document.querySelectorAll('tabla-empleados, perfil-usuario, pokemon-galery');
        secciones.forEach(seccion => seccion.style.display = 'none');
    }
}

window.customElements.define("custom-menu", CustomMenu);
