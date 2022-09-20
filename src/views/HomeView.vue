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
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <img
          :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.numeroPokedex +'.png'"
          alt="imagem pokemon" />
        {{pokemon.numeroPokedex}} - {{pokemon.nome}}
      </li>
    </ul>
  </div>
</template>
