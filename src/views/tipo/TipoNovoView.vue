<script>
import TipoDataService from '../../services/TipoDataService'
import Tipo from '../../models/Tipo'
import MensagemSucesso from '../../components/MensagemSucesso.vue'

export default {
    name: 'tipos-novo',
    data() {
        return {
            tipo: new Tipo(),
            salvo: false,
        }
    },
    components: {
        MensagemSucesso,
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
        <MensagemSucesso :salvo="salvo">
            <span>O Tipo foi salvo com sucesso!</span>
            <span> Tipo { id: {{tipo.id}}, nome: {{tipo.nome}} } </span>
        </MensagemSucesso>
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