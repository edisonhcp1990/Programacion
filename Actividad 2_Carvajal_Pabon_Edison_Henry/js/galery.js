class Galery extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('gallery-container');

        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .gallery-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                padding: 10px;
                font-family: Arial, sans-serif;
            }

            .gallery-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 10px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
            }

            .gallery-item:hover {
                transform: scale(1.05);
            }

            .gallery-item img {
                width: 100px;
                height: 100px;
                object-fit: cover;
                margin-bottom: 10px;
                border-radius: 10px;
            }

            .gallery-item .name {
                font-size: 1em;
                color: #333;
                text-align: center;
                text-transform: capitalize;
            }
        `;

        this.shadow.appendChild(this.estilo);
        this.shadow.appendChild(this.galleryContainer);
    }

    connectedCallback() {
        this.style.display = 'none'; // Ocultar la galería inicialmente
        this.addEventListener('show', () => this.fetchData()); // Llamar a fetchData cuando se emita el evento show
    }

    async fetchData() {
        try {
            // URL de la API para obtener los datos
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            const data = await response.json(); // Convertir la respuesta a JSON
            const pokemons = data.results;

            // Obtener detalles de cada Pokémon
            const details = await Promise.all(
                pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()))
            );

            this.render(details); // Renderizar la galería con los datos obtenidos
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            this.galleryContainer.innerHTML = `<p>Error al cargar los datos.</p>`;
        }
    }

    render(items) {
        this.galleryContainer.innerHTML = ""; // Limpiar la galería

        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            galleryItem.innerHTML = `
                <img src="${item.sprites.front_default}" alt="${item.name}">
                <div class="name">${item.name}</div>
            `;

            this.galleryContainer.appendChild(galleryItem);
        });
    }
}

window.customElements.define("pokemon-galery", Galery);
