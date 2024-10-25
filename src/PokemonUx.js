import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-ux.css.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-form-text/bbva-form-text.js';

export class PokemonUx extends LitElement {
  static get properties() {
    return {
      pokemons: { type: Array },
      searchTerm: { type: String },
      currentPage: { type: Number },
      totalPages: { type: Number },
      pokemonsPerPage: { type: Number },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
    this.searchTerm = ''; // Inicializa el término de búsqueda vacío
    this.currentPage = 1;
    this.pokemonsPerPage = 20;
    this.totalPages = 0;
  }

  async fetchPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=90');
      const data = await response.json();

      this.pokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          return {
            name: detailData.name,
            id: detailData.id,
            image: detailData.sprites.other.dream_world.front_default,
            type: detailData.types.map((type) => type.type.name).join(', '),
          };
        })
      );

      this.totalPages = Math.ceil(this.pokemons.length / this.pokemonsPerPage);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  // Filtrar Pokémon según el término de búsqueda
  get filteredPokemons() {
    return this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Obtener los Pokémon de la página actual
  get paginatedPokemons() {
    const startIndex = (this.currentPage - 1) * this.pokemonsPerPage;
    return this.filteredPokemons.slice(startIndex, startIndex + this.pokemonsPerPage);
  }

  changePage(direction) {
    const newPage = this.currentPage + direction;
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
    }
  }

  firstUpdated() {
    this.fetchPokemons();
  }

  // Actualizar el término de búsqueda
  updateSearchTerm(e) {
    this.searchTerm = e.target.value;
    this.currentPage = 1; // Reiniciar a la primera página
  }

  static get styles() {
    return [styles, getComponentSharedStyles('pokemon-ux-shared-styles')];
  }

  render() {
    return html`
  <h1 class="titulo-principal">Bienvenido a nuestra app de Pokémon</h1>
<h2 class="titulo-secundario">Selecciona el Pokémon de tu preferencia</h2>


      <bbva-form-text
        type="input"
        label="Ingresa el nombre"
        placeholder="Buscar..."
        optional-label=""
        @input="${this.updateSearchTerm}"  <!-- Evento para capturar el texto -->
      ></bbva-form-text>

      <div class="pokemon-container">
        ${this.paginatedPokemons.map(
          (pokemon) => html`
            <div 
              class="pokemon-card" 
              @click="${() => this.gotoData(pokemon)}"
              tabindex="0"
            >
              <h1 class="titulo">${pokemon.name}</h1>
              <div class="cuerpo">
                <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" />
              </div>
              <p class="tipo">${pokemon.type}</p>
              <bbva-button-default>Ver más</bbva-button-default>
            </div>
          `
        )}
      </div>

      <div class="pagination">
        <bbva-button-default @click="${() => this.changePage(-1)}" ?disabled="${this.currentPage === 1}">Previous</bbva-button-default>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <bbva-button-default @click="${() => this.changePage(1)}" ?disabled="${this.currentPage === this.totalPages}">Next</bbva-button-default>
      </div>
    `;
  }
}
