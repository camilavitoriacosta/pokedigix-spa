<script>
import TreinadorDataService from '../../services/TreinadorDataService';
import ModalExclusao from '../../components/ModalExclusao.vue'
import Loading from "vue-loading-overlay";

export default {
    name: "treinadores-lista",
    data() {
        return {
            treinadores: [],
            isLoading: false,
            treinadorSelecionado: this.inicializarTreinador(),
            pokemonsTreinador: []
        };
    },

    components: {
        Loading,
        ModalExclusao
    },

    methods: {
        buscarTreinadores() {
            TreinadorDataService.buscarTodos()
                .then(resposta => {
                    this.treinadores = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        buscarPokemonsTreinador(id) {
            TreinadorDataService.buscarPokemonsTreinador(id)
                .then(resposta => {
                    this.pokemonsTreinador = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        selecionarTreinador(treinador) {
            this.treinadorSelecionado.id = treinador.id;
            this.treinadorSelecionado.nome = treinador.nome;
        },

        inicializarTreinador() {
            return {
                "id": null,
                "nome": null
            };
        },

        removerTreinadorSelecionado() {
            this.isLoading = true;
            const id = this.treinadorSelecionado.id;
            TreinadorDataService.removerPorId(id)
                .then(resposta => {
                    this.treinadores = this.treinadores.filter(treinador => treinador.id != id);
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                });

            this.treinadorSelecionado = this.inicializarPokemon();
        },
    },

    mounted() {
        this.buscarTreinadores();
    }
}
</script>
    
<template>
    <div>
        <h2>Lista de Treinadores</h2>
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />

        <div class="container-lg text-center row">
            <div class="col-md-auto mb-4" v-for="treinador in treinadores" :key="treinador.id">
                <div class="card h-100" style="width: 300px;">
                    <h5 class="card-header">
                        {{treinador.nome}}
                    </h5>
                    <div class="card-body">
                        <h5 class="card-title"> {{treinador.endereco.regiao}} - {{treinador.endereco.cidade}} </h5>
                        <div class="col">
                            <p class="card-text"> Nível: {{treinador.nivel}} </p>
                            <p class="card-text"> Dinheiro: {{treinador.dinheiro}} </p>
                        </div>
                        <div class="mt-2">
                            <button class="m-1 btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#modalPokemonsTreinador" @click="buscarPokemonsTreinador(treinador.id)">
                                Pokemons
                            </button>

                            <button class="m-1 btn btn-outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </button>

                            <button type="button" class="m-1 btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#modalConfimacaoExclusao" @click="selecionarTreinador(treinador)">
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
        </div>
    </div>

    <!-- Modal -->
    <ModalExclusao @remover="removerTreinadorSelecionado">
        <p> Deseja remover o Treinador<strong> #{{this.treinadorSelecionado.id}} - {{this.treinadorSelecionado.nome}}
            </strong>?
        </p>
    </ModalExclusao>

    <!-- Modal -->
    <div class="modal fade" id="modalPokemonsTreinador" tabindex="-1" aria-labelledby="modalPokemonsTreinador"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Pokemons </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-auto" v-for="pokemon in pokemonsTreinador" style="width: 250px;">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    