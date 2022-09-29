<script>
import AtaqueDataService from '../services/AtaqueDataService';
export default {
    name: "ataques-lista",
    data() {
        return {
            ataques: [],
            idSelecionado: null,
        }
    },
    methods: {
        buscarTipos() {
            AtaqueDataService.buscarTodos()
                .then(resposta => {
                    this.ataques = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        editar(id) {
            this.$router.push({ name: 'ataques-editar', params: { id: id } });
        },

        remover() {

            const id = this.idSelecionado;
            AtaqueDataService.removerPorId(id)
                .catch(erro => {
                    console.log(erro);
                });

            let i = this.ataques.map(item => item.id).indexOf(id) // find index of your object
            this.ataques.splice(i, 1) // remove it from array

            this.idSelecionado = null;
        },

        selecionarIdAtaque(id) {
            this.idSelecionado = id;
        }
    },

    mounted() {
        this.buscarTipos();
    }
}
</script>
        
<template>
    <div class="container-lg mt-4">
        <h2>Lista de Ataques</h2>
        <div class="row">
            <table class="table table-light table-striped table-bordered">
                <thead class="table-dark">
                    <tr class="text-center">
                        <th class="col">#</th>
                        <th class="col">Nome</th>
                        <th class="col">Descricao</th>
                        <th class="col">Forca</th>
                        <th class="col">Acuracia</th>
                        <th class="col">PP</th>
                        <th class="col">Categoria</th>
                        <th class="col">Tipo</th>
                        <th class="col"></th>
                        <th class="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ataque in ataques" :key="ataque.id" class="text-center">
                        <td>{{ataque.id}}</td>
                        <td>{{ataque.nome}}</td>
                        <td>{{ataque.descricao}}</td>
                        <td>{{ataque.forca}}</td>
                        <td>{{ataque.acuracia}}</td>
                        <td>{{ataque.pontosDePoder}}</td>
                        <td>{{ataque.categoria}}</td>
                        <td>{{ataque.tipo.nome}}</td>
                        <td>
                            <button @click="editar(ataque.id)" class="btn btn-outline-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#modalExcluir" @click="selecionarIdAtaque(ataque.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalExcluir" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Deseja excluir o ataque com o id: {{idSelecionado}}?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button @click="remover()" class="btn btn-dark" data-bs-dismiss="modal">
                        Remover
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
        