<script>
import TipoDataService from '../../services/TipoDataService'
import Tipo from '../../models/Tipo'

export default {
    name: 'tipos-novo',
    data() {
        return {
            tipo: new Tipo(),
            salvo: false,
        }
    },
    methods: {
        salvar() {
            TipoDataService.criar(this.tipo)
                .then(resposta => {
                    this.tipo.id = resposta.id;
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        }
    }
}
</script>

<template>
    <div class="container  mt-4">
        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="salvo">
            <span>O Tipo foi salvo com sucesso!</span>
            <span> Tipo { id: {{tipo.id}}, nome: {{tipo.nome}} } </span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="card">
            <div class="card-body">
                <h1 class="card-title"> Cadastrar Tipo </h1>
                <form>
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome do tipo:</label>
                        <input type="text" class="form-control" id="nome" required v-model="tipo.nome">
                    </div>
                    <button @click.prevent="salvar" class="btn btn-dark">Salvar</button>
                </form>
            </div>
        </div>
    </div>
</template>