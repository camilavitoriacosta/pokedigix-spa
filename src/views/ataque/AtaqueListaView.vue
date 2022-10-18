<script>
import Busca from '../../components/Busca.vue';
import ModalExclusao from '../../components/ModalExclusao.vue';
import Ordenacao from '../../components/Ordenacao.vue';
import Paginacao from '../../components/Paginacao.vue';
import AtaqueDataService from '../../services/AtaqueDataService';


import Loading from "vue-loading-overlay";

export default {
    name: "ataques-lista",
    data() {
        return {
            ataques: [],
            ataqueSelecionado: this.inicializarAtaque(),
            isLoading: false,
            fullPage: false,
            pagina: 1,
            quantidadeItensPorPagina: 3,
            totalPaginas: 4,
            quantidadeItens: 2,
            ordenacao: { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
            termo: "",
            opcoes: [
                { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
                { titulo: "Nome Z-A", direcao: "DESC", campo: "nome" },
                { titulo: "Tipo A-Z", direcao: "ASC", campo: "tipo_nome" },
                { titulo: "Tipo Z-A", direcao: "DESC", campo: "tipo_nome" },
            ]
        }
    },

    components: {
        Loading,
        ModalExclusao,
        Busca,
        Paginacao,
        Ordenacao
    },

    methods: {
        buscarAtaques() {
            this.isLoading = true;
            AtaqueDataService.buscarTodosPaginadoOrdenado(this.pagina-1, this.quantidadeItensPorPagina, this.ordenacao.campo, this.ordenacao.direcao, this.termo)
                .then(resposta => {
                    this.ataques = resposta.ataques;
                    this.totalPaginas = resposta.totalPaginas;
                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;
                })
        },

        trocarPagina(p) {
            this.pagina = p;
            this.buscarAtaques();
        },
        editar(id) {
            this.$router.push({ name: 'ataques-editar', params: { id: id } });
        },

        inicializarAtaque() {
            return {
                id: null,
                nome: null
            }
        },

        removerAtaqueSelecionado() {
            this.isLoading = true;
            const id = this.ataqueSelecionado.id;
            AtaqueDataService.removerPorId(id)
                .then(resposta => {
                    // Remover da lista já carregada
                    // let i = this.ataques.map(item => item.id).indexOf(id) // find index of your object
                    // this.ataques.splice(i, 1) // remove it from array
                    this.ataques = this.ataques.filter(ataque => ataque.id != id);

                    // Carregar novamente a lista
                    //this.buscarAtaques();

                    this.isLoading = false;
                })
                .catch(erro => {
                    console.log(erro);
                    this.isLoading = false;

                });

            this.ataqueSelecionado = this.inicializarAtaque();
        },

        selecionar(ataque) {
            this.ataqueSelecionado.id = ataque.id;
            this.ataqueSelecionado.nome = ataque.nome;
        }
    },

    mounted() {
        this.buscarAtaques();
    }
}
</script>
        
<template>
    <div class="container-lg mt-4">
        <div class="row justify-content-end">
            <div class="col-2">
                <Ordenacao v-model="ordenacao" :opcoes="opcoes" :ordenacao="ordenacao" @ordenar="buscarAtaques">
                </Ordenacao>
            </div>
            <div class="col-4">
                <Busca></Busca>
            </div>
        </div>
        <h2>Lista de Ataques</h2>
        <div class="row table-responsive">
            <loading v-model:active="isLoading" :is-full-page="fullPage" :loader="'dots'" />

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
                        <th class="col" colspan="2"> Ações </th>
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
                                data-bs-target="#modalConfimacaoExclusao" @click="selecionar(ataque)">
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
        <Paginacao :totalPaginas="totalPaginas" :quantidadeItens="quantidadeItens" :atual="pagina"
            :trocarPagina="trocarPagina"></Paginacao>
    </div>

    <!-- Modal -->
    <ModalExclusao @remover="removerPokemonSelecionado">
        <p> Deseja remover o Ataque <strong> #{{this.ataqueSelecionado.id}} - {{this.ataqueSelecionado.nome}} </strong>?
        </p>
    </ModalExclusao>
</template>
        