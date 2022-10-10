<script>
import TipoDataService from '../../services/TipoDataService';
import ModalExclusao from '../../components/ModalExclusao.vue'

export default {
    name: "tipos-lista",
    data() {
        return {
            tipos: [],
            tipoSelecionado: this.inicializarTipo(),
        };
    },
    
    components: {
        ModalExclusao
    },

    methods: {
        inicializarTipo() {
            return {
                id: null,
                nome: null
            }
        },

        buscarTipos() {
            this.isLoading = true;
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                })
        },

        editar(id) {
            this.$router.push({ name: 'tipos-editar', params: { id: id } });
        },

        selecionar(tipo) {
            this.tipoSelecionado.id = tipo.id;
            this.tipoSelecionado.nome = tipo.nome;
        },

        removerTipoSelecionado() {
            this.isLoading = true;
            const id = this.tipoSelecionado.id;
            TipoDataService.removerPorId(id)
                .then(resposta => {
                    // Remover da lista já carregada
                    this.tipos = this.tipos.filter(tipo => tipo.id != id);
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                });

            this.tipoSelecionado = this.inicializarTipo();
        },
    },
    mounted() {
        this.buscarTipos();
    }
}
</script>
    
<template>
    <div class="container-lg mt-4">
        <h2>Lista de Tipos</h2>
        <div class="row">
            <div class="col-2 mb-2" v-for="tipo in tipos" :key="tipo.id">
                <div class="card border-p bg-indigo">
                    <div class="card-body">
                        <h5 class="card-title">#{{tipo.id}} {{tipo.nome}}</h5>
                        <div class="mt-2">
                            <button @click="editar(tipo.id)" class="btn btn-outline-dark m-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </button>

                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#modalConfimacaoExclusao" @click="selecionar(tipo)">
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
    <ModalExclusao @remover="removerTipoSelecionado">
        <p> Deseja remover o Tipo <strong> #{{this.tipoSelecionado.id}} - {{this.tipoSelecionado.nome}}
            </strong>?
        </p>
    </ModalExclusao>
</template>

<style>
div.border-p {
    border-left: 5px solid rgb(148, 105, 189);
    border-radius: 5px;
}

div.bg-indigo {
    background-color: #e0cffc;
}
</style>
    