<script>
import TipoDataService from '../../services/TipoDataService'
import Tipo from '../../models/Tipo'

export default {
    name: 'tipos-editar',
    data() {
        return {
            tipo: new Tipo(),
            salvo: false
        }
    },
    methods: {
        salvar() {
            TipoDataService.atualizar(this.tipo, this.$route.params.id)
                .then(resposta => {
                    this.tipo = resposta;
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },
        carregarTipo(id) {
            TipoDataService.buscarPorId(id)
                .then(resposta => {
                    this.tipo = resposta;
                }).catch(erro => {
                    console.log(erro);
                });
        }
    },
    mounted() {
        this.carregarTipo(this.$route.params.id);
    }
}
</script>
    
<template>
    <div class="container  mt-4">
        <div class="alert alert-success" role="alert" v-if="salvo">
            <span>O Tipo foi salvo com sucesso!</span>
            <span> Tipo { id: {{tipo.id}}, nome: {{tipo.nome}} } </span>
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