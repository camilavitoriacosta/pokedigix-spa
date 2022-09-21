<script>
import TipoDataService from '../services/TipoDataService';
export default {
    name: "tipos-lista",
    data() {
        return { tipos: [] };
    },
    methods: {
        buscarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        }
    },
    mounted() {
        this.buscarTipos();
    }
}
</script>
    
<template>
    <div class="container-lg mt-4">
        <h2>Lista de Tipos</h2>
        <div class="row" v-for="tipo in tipos" :key="tipo.id">
            <p class="col border-p p-2 mb-2 fs-5 bg-light font-monospace"> #{{tipo.id}} {{tipo.nome}} </p>
        </div>
    </div>
</template>

<style>
.border-p {
    border-left: 5px solid rgb(148, 105, 189);
}
</style>
    