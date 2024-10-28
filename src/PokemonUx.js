import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-ux.css.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';
import '@bbva-web-components/bbva-form-text/bbva-form-text.js';
import "@pokedex/pokemon-dm/pokemon-dm.js";

export class PokemonUx extends LitElement {
  static get properties() {
    return {
      pokemons: { type: Array },
      searchTerm: { type: String },
      currentPage: { type: Number },
      totalPages: { type: Number },
      selectedPokemon: { type: Object },
      showModal: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
    this.searchTerm = '';
    this.currentPage = 1;
    this.pokemonsPerPage = 20;
    this.totalPages = 0;
    this.selectedPokemon = null;
    this.showModal = false;
  }

  get filteredPokemons() {
    return this.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

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

  async firstUpdated() {
    const pokemonDm = this.shadowRoot.querySelector('pokemon-dm');

    pokemonDm.addEventListener('pokemon-data', (e) => {
      this.pokemons = e.detail.pokemons;
      this.totalPages = Math.ceil(this.pokemons.length / this.pokemonsPerPage);
    });

    await pokemonDm.fetchPokemons();
  }

  updateSearchTerm(e) {
    this.searchTerm = e.target.value;
    this.currentPage = 1;
  }

  async handlePokemonClick(pokemon) {
    this.selectedPokemon = pokemon;
    this.selectedPokemon.evolutionChain = await this.fetchEvolutionChain(pokemon.id);
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  async fetchEvolutionChain(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    return this.processEvolutionChain(evolutionData);
  }

  async processEvolutionChain(evolutionData) {
    const evolutions = [];
    let current = evolutionData.chain;

    while (current) {
      const name = current.species.name;
      const pokemonDataResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = await pokemonDataResponse.json();

      evolutions.push({
        name: name,
        image: pokemonData.sprites.other.dream_world.front_default,
        type: pokemonData.types.map((type) => type.type.name).join(', ')
      });

      current = current.evolves_to[0];
    }

    return evolutions;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPokemon = null;
    document.body.classList.remove('modal-open');
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
        @input="${this.updateSearchTerm}"
      ></bbva-form-text>

      <div class="pokemon-container">
        ${this.paginatedPokemons.map(
          (pokemon) => html`
            <div 
              class="pokemon-card" 
              tabindex="0"
              @click="${() => this.handlePokemonClick(pokemon)}"
            >
              <h1 class="titulo">${pokemon.name}</h1>
              <div class="cuerpo">
                <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" />
              </div>
              <p class="tipo">${pokemon.type || 'Desconocido'}</p>
              <bbva-button-default>Ver más</bbva-button-default>
            </div>
          `
        )}
      </div>

      <div class="pagination">
        <bbva-button-default @click="${() => this.changePage(-1)}" ?disabled="${this.currentPage === 1}">
          Previous
        </bbva-button-default>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <bbva-button-default @click="${() => this.changePage(1)}" ?disabled="${this.currentPage === this.totalPages}">
          Next
        </bbva-button-default>
      </div>

      ${this.showModal
        ? html`
            <div class="modal">
              <h1 class="modal-title">${this.selectedPokemon.name}</h1>
              <img class="modal-image" src="${this.selectedPokemon.image}" alt="${this.selectedPokemon.name}" />
              <h2 class="modal-subtitle">Evoluciones:</h2>
              <div class="evolution-container">
                ${this.selectedPokemon.evolutionChain.map(evo => html`
                  <div class="evolution-card">
                    <h3 class="evolution-name">${evo.name}</h3>
                    <img class="evolution-image" src="${evo.image}" alt="${evo.name}" />
                    <p class="evolution-type">Tipo: ${evo.type}</p>
                  </div>
                `)}
              </div>
              <button class="modal-close-button" @click="${this.closeModal}">Cerrar</button>
            </div>
          `
        : ''}
      
      <pokemon-dm></pokemon-dm>
    `;
  }
}

customElements.define('pokemon-ux', PokemonUx);
