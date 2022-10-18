<script>
import Loading from "vue-loading-overlay";
import Busca from '../../components/Busca.vue';
import ModalExclusao from '../../components/ModalExclusao.vue';
import Ordenacao from '../../components/Ordenacao.vue';
import Paginacao from '../../components/Paginacao.vue';
import PokemonResponse from '../../models/PokemonResponse';
import PokemonDataService from '../../services/PokemonDataService';


export default {
  name: "pokemons-lista",
  data() {
    return {
      pokemons: [],
      pokemonSelecionado: this.inicializarPokemon(),
      pokemonDetalhar: new PokemonResponse(),
      isLoading: false,
      pagina: 1,
      quantidadeItensPorPagina: 4,
      totalPaginas: 4,
      quantidadeItens: 2,
      ordenacao: { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
      termo: "",
      opcoes: [
        { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
        { titulo: "Nome Z-A", direcao: "DESC", campo: "nome" },
      ]
    };
  },

  components: {
    Loading,
    ModalExclusao,
    Busca,
    Paginacao,
    Ordenacao
  },

  methods: {
    buscarPokemons() {
      PokemonDataService.buscarTodosPaginadoOrdenado(this.pagina - 1, this.quantidadeItensPorPagina, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
        .then(resposta => {
          this.pokemons = resposta.pokemons;
          this.totalPaginas = resposta.totalPaginas;
        })
        .catch(erro => {
          console.log(erro);
        })
    },

    inicializarPokemon() {
      return {
        "id": null,
        "nome": null
      };
    },

    trocarPagina(p) {
      this.pagina = p;
      this.buscarPokemons();
    },

    selecionarPokemon(pokemon) {
      this.pokemonSelecionado.id = pokemon.id;
      this.pokemonSelecionado.nome = pokemon.nome;
    },

    selecionarPokemonDetalhar(pokemon) {
      this.pokemonDetalhar = pokemon;
    },

    removerPokemonSelecionado() {
      this.isLoading = true;
      const id = this.pokemonSelecionado.id;
      PokemonDataService.removerPorId(id)
        .then(() => {
          this.pokemons = this.pokemons.filter(pokemon => pokemon.id != id);
          this.isLoading = false;
        })
        .catch(erro => {
          console.log(erro);
          this.isLoading = false;
        });

      this.pokemonSelecionado = this.inicializarPokemon();
    },

    pesquisar(texto) {
      this.termo = texto;
      this.buscarPokemons();
    },

    shiny(pokemon) {
      const img = document.getElementById("imgPokemon" + pokemon.id);
      if (img.getAttribute('shiny') == "false") {
        img.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/' + pokemon.numeroPokedex + '.png')
        img.setAttribute('shiny', true);
      }
      else if (img.getAttribute('shiny') == "true") {
        img.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + pokemon.numeroPokedex + '.png')
        img.setAttribute('shiny', false);
      }
    }
  },
  mounted() {
    this.buscarPokemons();
  }
}
</script>

<template>
  <div class="mt-4 container-lg">
    <div class="row justify-content-end">
      <div class="col-2">
        <Ordenacao v-model="ordenacao" :opcoes="opcoes" :ordenacao="ordenacao" @ordenar="buscarPokemons"></Ordenacao>
      </div>
      <div class="col-4">
        <Busca :texto="termo" :pesquisar="pesquisar"></Busca>
      </div>
    </div>
    <h2>Lista de Pokemons</h2>
    <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />
    <div class="row text-center justify-content-center">
      <div class="col-md-auto" v-for="pokemon in pokemons" :key="pokemon.id">
        <div class="card mb-4" style="width: 260px;">
          <h5 class="card-header">
            <img
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.numeroPokedex +'.png'"
              alt="imagem pokemon" />
            Nº.{{pokemon.numeroPokedex}}
          </h5>
          <div class="card-body">
            <h5 class="card-title">{{pokemon.nome}}</h5>
            <p class="card-text"> Nível: {{pokemon.nivel}} </p>
            <div class="col-12 justify-content-center">
              <img class="img-fluid rounded-start" style="max-width: 140px;" :id="'imgPokemon'+ pokemon.id"
                :shiny="false"
                :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'+ pokemon.numeroPokedex +'.png'"
                alt="imagem pokemon" />
            </div>
            <button type="button" class="m-1 btn btn-outline-success col-5" @click="shiny(pokemon)">
              Shiny
            </button>
            <div class="mt-2">
              <button class="m-1 btn btn-outline-primary" data-bs-toggle="modal"
                data-bs-target="#modalInformacoesPokemon" @click="selecionarPokemonDetalhar(pokemon)">
                Detalhes
              </button>
              <button class="m-1 btn btn-outline-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
              </button>

              <button type="button" class="m-1 btn btn-outline-danger" data-bs-toggle="modal"
                data-bs-target="#modalConfimacaoExclusao" @click="selecionarPokemon(pokemon)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Modal -->
      <ModalExclusao @remover="removerPokemonSelecionado">
        <p> Deseja remover o Pokemon <strong> #{{this.pokemonSelecionado.id}} - {{this.pokemonSelecionado.nome}}
          </strong>?
        </p>
      </ModalExclusao>

      <!-- Modal -->
      <div class="modal fade" id="modalInformacoesPokemon" tabindex="-1" aria-labelledby="modalInformacoesPokemon"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"> Nº{{pokemonDetalhar.numeroPokedex}} -
                {{pokemonDetalhar.nome}}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="card  mb-2">
                <div class="card-header">
                  <h5>Infomações</h5>
                </div>
                <div class="card-body">
                  <img
                    :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemonDetalhar.numeroPokedex +'.png'"
                    alt="imagem pokemon" />
                  <p class="card-text"> Peso: {{pokemonDetalhar.peso}} </p>
                  <p class="card-text"> Altura: {{pokemonDetalhar.altura}} </p>
                  <p class="card-text"> Felicidade: {{pokemonDetalhar.felicidade}} </p>
                </div>
              </div>
              <div class="card mb-2">
                <div class="card-header">
                  <h5>Ataques</h5>
                </div>
                <div class="card-body">
                  <p class="card-text" v-for="ataque in pokemonDetalhar.ataques"> {{ataque.nome}} </p>
                </div>
              </div>
              <div class="card  mb-2">
                <div class="card-header">
                  <h5>Tipos</h5>
                </div>
                <div class="card-body">
                  <p class="card-text" v-for="tipo in pokemonDetalhar.tipos"> {{tipo.nome}} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Paginacao :totalPaginas="totalPaginas" :quantidadeItens="quantidadeItens" :atual="pagina"
      :trocarPagina="trocarPagina"></Paginacao>
  </div>
</template>
