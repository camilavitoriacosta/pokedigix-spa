<script>
import TreinadorDataService from '../../services/TreinadorDataService';
import Loading from "vue-loading-overlay";

export default {
    name: "treinadores-lista",
    data() {
        return {
            treinadores: [],
            isLoading: false,
        };
    },

    components: {
        Loading
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
            <div class="col-md-auto" v-for="treinador in treinadores" :key="treinador.id">
                <div class="card mb-4" style="max-width: 230px;">
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
                            <button class="m-1 btn btn-outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </button>

                            <button type="button" class="m-1 btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#modalConfimacaoExclusao">
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
</template>
    