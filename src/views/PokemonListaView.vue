<script>
import PokemonDataService from '../services/PokemonDataService';
export default {
  name: "lista-pokemons",
  data() {
    return { pokemons: [] };
  },
  methods: {
    buscarPokemons() {
      PokemonDataService.buscarTodos()
        .then(resposta => {
          this.pokemons = resposta;
        })
        .catch(erro => {
          console.log(erro);
        })
    }
  },
  mounted() {
    this.buscarPokemons();
  }
}
</script>

<template>
  <div>
    <h2>Lista de Pokemons</h2>
    <div class="container-lg text-center row">
        <div class="col-md-auto" v-for="pokemon in pokemons" :key="pokemon.id">
          <div class="card mb-4" style="max-width: 240px;">
            <h5 class="card-header">
              <img
                :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.numeroPokedex +'.png'"
                alt="imagem pokemon" />
              Nº.{{pokemon.numeroPokedex}}
            </h5>
            <div class="card-body">

              <div class="col">
                <h5 class="card-title">{{pokemon.nome}}</h5>
                <img class="img-fluid rounded-start" style="max-width: 140px;"
                  :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/'+ pokemon.numeroPokedex +'.png'"
                  alt="imagem pokemon" />
                <p class="card-text"> Nível: {{pokemon.nivel}} </p>
                <p class="card-text"> Peso: {{pokemon.peso}} </p>
                <p class="card-text"> Altura: {{pokemon.altura}} </p>
                <p class="card-text"> Felicidade: {{pokemon.felicidade}} </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
