<script>
import TreinadorResponse from '../../models/TreinadorResponse';
import TreinadorDataService from '../../services/TreinadorDataService';
import CardPokemon from '../../components/CardPokemon.vue';

export default {
    name: "treinador-perfil",
    data() {
        return {
            treinador: new TreinadorResponse(),
            id: 0,
            pokemonsTreinador: [],
        };
    },

    components: {
        CardPokemon
    },

    methods: {
        buscarTreinador() {
            TreinadorDataService.buscarPorId(this.id)
                .then(resposta => {
                    this.treinador = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        buscarPokemonsTreinador() {
            TreinadorDataService.buscarPokemonsTreinador(this.id)
                .then(resposta => {
                    this.pokemonsTreinador = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

    },

    mounted() {
        this.id = this.$route.params.id;
        this.buscarTreinador();
        this.buscarPokemonsTreinador();
    }
}
</script>
    
<template>
    <div class="container-lg mt-2">
        <div class="row">
            <div class="col-sm-3 mb-4">
                <div class="card h-100">
                    <h5 class="card-header d-flex justify-content-center align-items-center">
                        {{treinador.nome}}
                    </h5>
                    <div class="card-body">
                        <h5 class="card-title"> {{treinador.endereco.regiao}} - {{treinador.endereco.cidade}} </h5>
                        <div class="col">
                            <p class="card-text"> Nível: {{treinador.nivel}} </p>
                            <p class="card-text"> Dinheiro: {{treinador.dinheiro}} </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-9">
                <div class="row">
                    <div class="col-md-auto" v-for="pokemon in pokemonsTreinador" style="min-width: 250px;">
                        <CardPokemon :pokemon="pokemon"> </CardPokemon>
                    </div>
                </div>
            </div>
        </div>


    </div>




</template>
    