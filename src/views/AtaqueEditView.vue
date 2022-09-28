<script>
import AtaqueDataService from "../services/AtaqueDataService"
import TipoDataService from "../services/TipoDataService"
import AtaqueRequest from "../models/AtaqueRequest"
import AtaqueResponse from "../models/AtaqueResponse"

export default {
    name: 'ataques-editar',
    data() {
        return {
            ataqueRequest: new AtaqueRequest(),
            ataqueResponse: new AtaqueResponse(),
            desabilitarForca: false,
            salvo: false,
            tipos: [],
            categorias: [
                {
                    indice: 1,
                    nome: "Fisico",
                    nomeBanco: "FISICO"
                },
                {
                    indice: 2,
                    nome: "Especial",
                    nomeBanco: "ESPECIAL"
                },
                {
                    indice: 3,
                    nome: "Efeito",
                    nomeBanco: "EFEITO"
                }
            ]
        }
    },
    methods: {
        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        escolherCategoria() {
            if (this.ataqueRequest.categoria == "EFEITO") {
                this.desabilitarForca = true;
            }
            else {
                this.desabilitarForca = false;
            }
        },

        salvar() {
            AtaqueDataService.atualizar(this.ataqueRequest, this.$route.params.id)
                .then(resposta => {
                    this.ataqueResponse = resposta;
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                });
        },

        carregarAtaque(id) {
            AtaqueDataService.buscarPorId(id)
                .then(resposta => {
                    this.ataqueRequest = resposta;
                    this.ataqueRequest.tipoId = resposta.tipo.id;
                }).catch(erro => {
                    console.log(erro);
                });
        }
    },

    mounted() {
        this.carregarTipos();
        this.carregarAtaque(this.$route.params.id);
    }
}
</script>
    
<template>
    <div class="container  mt-4">
        <div class="alert alert-success" role="alert" v-if="salvo">
            <span>O Ataque foi salvo com sucesso!</span>
            <span> Ataque { id: {{ataqueResponse.id}}, nome: {{ataqueResponse.nome}} } </span>
        </div>
        <div class="card">
            <div class="card-body">
                <h1 class="card-title"> Cadastrar Ataque </h1>
                <form class="row g-3">
                    <div class="col-12">
                        <label for="nome" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="nome" required v-model="ataqueRequest.nome">
                    </div>
                    <div class="col-6">
                        <label for="forca" class="form-label">Força:</label>
                        <input type="text" class="form-control" id="forca" required v-model="ataqueRequest.forca"
                            :disabled="desabilitarForca">
                    </div>
                    <div class="col-6">
                        <label for="acuracia" class="form-label">Acuracia:</label>
                        <input type="text" class="form-control" id="acuracia" required v-model="ataqueRequest.acuracia">
                    </div>
                    <div class="col-3">
                        <label for="pontosDePoder" class="form-label">Pontos de Poder:</label>
                        <input type="number" class="form-control" id="pontosDePoder" required
                            v-model="ataqueRequest.pontosDePoder">
                    </div>
                    <div class="col-9">
                        <label for="categoria" class="form-label"> Categoria </label>
                        <select id="categoria" class="form-select" v-model="ataqueRequest.categoria"
                            v-on:change="escolherCategoria">
                            <option v-for="categoria in categorias" :key="categoria.indice"
                                :value="categoria.nomeBanco"> {{categoria.nome}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label for="tipo" class="form-label"> Tipo </label>
                        <select id="tipo" class="form-select" v-model="ataqueRequest.tipoId">
                            <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id"> {{tipo.nome}}
                            </option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label for="descricao" class="form-label">Descrição</label>
                        <textarea class="form-control" id="descricao" rows="2" v-model="ataqueRequest.descricao"
                            required></textarea>
                    </div>
                    <button @click.prevent="salvar" class="btn btn-dark">Salvar</button>
                </form>
            </div>
        </div>
    </div>
</template>