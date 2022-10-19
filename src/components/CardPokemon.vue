<script>
import PokemonResponse from '../models/PokemonResponse';

export default {
    name: 'card-pokemon',
    props: {
        pokemon: PokemonResponse
    },
}
</script>

<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.numeroPokedex +'.png'"
                    alt="imagem pokemon" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Nº. {{pokemon.numeroPokedex}}</h5>
                    <p class="card-text">{{pokemon.nome}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
