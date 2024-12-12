class TablaEmpleados extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.tableContainer = document.createElement('div');
        this.tableContainer.classList.add('table-container');

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .table-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                font-family: Arial, sans-serif;
                max-width: 80%;
                margin: 20px auto;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                background-color: #f0f0f0; /* Fondo gris claro */
            }

            th, td {
                border: 1px solid #333; /* Bordes oscuros para marcar las celdas */
                padding: 10px;
                text-align: center;
            }

            th {
                background-color: #cccccc; /* Encabezado gris más oscuro */
                font-weight: bold;
            }

            tr:nth-child(even) {
                background-color: #e6e6e6; /* Alternar color en filas pares */
            }

            tr:hover {
                background-color: #d9d9d9; /* Cambiar color al pasar el mouse */
            }
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.tableContainer);
    }

    connectedCallback() {
        this.style.display = 'none'; // Ocultar la tabla inicialmente
        this.addEventListener('show', () => this.fetchData()); // Llamar a fetchData cuando se emita el evento show
    }

    async fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            const empleados = await response.json();
            this.render(empleados);
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            this.tableContainer.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }

    render(empleados) {
        this.tableContainer.innerHTML = "";

        const headers = ["ID", "Nombre", "Username", "Email", "Address", "Street", "Suite", "City"];
        const tabla = document.createElement("table");

        // Crear fila de encabezado
        const headerRow = document.createElement("tr");
        headers.forEach(h => {
            const header = document.createElement("th");
            header.textContent = h;
            headerRow.appendChild(header);
        });
        tabla.appendChild(headerRow);

        // Crear filas con los datos de los empleados
        empleados.forEach(e => {
            const row = document.createElement("tr");
            Object.values(e).forEach(atr => {
                const celda = document.createElement("td");
                celda.textContent = atr;
                row.appendChild(celda);
            });
            tabla.appendChild(row);
        });

        this.tableContainer.appendChild(tabla);
    }
}

window.customElements.define("tabla-empleados", TablaEmpleados);
