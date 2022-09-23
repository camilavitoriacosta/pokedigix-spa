<script>
import AtaqueDataService from "../services/AtaqueDataService"
import TipoDataService from "../services/TipoDataService"
import AtaqueRequest from "../models/AtaqueRequest"

export default {
    name: 'ataques-novo',
    data() {
        return {
            ataqueRequest: new AtaqueRequest(),
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
                    this.ataqueRequest.tipoId = this.tipos[0].id;
                })
                .catch(erro => {
                    console.log(erro);
                })
        }
    },
    mounted() {
        this.ataqueRequest.categoria = this.categorias[0].nomeBanco;
        this.carregarTipos();
    }
}
</script>

<template>
    <div class="container  mt-4">
        <div class="alert alert-success" role="alert" v-if="salvo">
            <span>O Ataque foi salvo com sucesso!</span>
            <span> Ataque { id: {{ataqueRequest.id}}, nome: {{ataqueRequest.nome}} } </span>
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
                        <input type="text" class="form-control" id="forca" required v-model="ataqueRequest.forca">
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
                        <select id="categoria" class="form-select" v-model="ataqueRequest.categoria">
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
                    <button @click.prevent="salvar" class="btn btn-dark">Salvar</button>
                </form>
            </div>
        </div>
    </div>
</template>