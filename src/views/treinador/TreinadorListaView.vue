<script>
import TreinadorDataService from '../../services/TreinadorDataService';
import ModalExclusao from '../../components/ModalExclusao.vue';
import Busca from '../../components/Busca.vue';
import Paginacao from '../../components/Paginacao.vue'
import Ordenacao from '../../components/Ordenacao.vue'
import CardPokemon from '../../components/CardPokemon.vue';

import Loading from "vue-loading-overlay";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

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
        ModalExclusao,
        Busca,
        Paginacao,
        Ordenacao,
        CardPokemon
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

        trocar(treinador) {
            cookies.set('treinador_id', treinador.id, '10min');
            cookies.set('treinador_nome', treinador.nome, '10min');
            this.$router.push({ name: 'treinador-perfil', params: { id: treinador.id } });

        }
    },

    mounted() {
        this.buscarTreinadores();
    }
}
</script>
    
<template>
    <div class="container-lg mt-2">
        <div class="row justify-content-end">
            <div class="col-2">
                <Ordenacao></Ordenacao>
            </div>
            <div class="col-4">
                <Busca></Busca>
            </div>
        </div>
        <h2>Lista de Treinadores</h2>
        <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />

        <div class="text-center row">
            <div class="col-md-auto mb-4" v-for="treinador in treinadores" :key="treinador.id">
                <div class="card h-100" style="width: 300px;">
                    <h5 class="card-header d-flex justify-content-center align-items-center">
                        {{treinador.nome}}
                        <button class="btn" @click="trocar(treinador)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                        </button>
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
        <Paginacao></Paginacao>
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
                            <CardPokemon :pokemon="pokemon"> </CardPokemon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    