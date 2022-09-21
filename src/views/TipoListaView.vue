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
    <div>
        <h2>Lista de Tipos</h2>
        <div class="container-lg text-center row">
            <div class="col-md-auto" v-for="tipo in tipos" :key="tipo.id">
                <div class="card mb-4" style="max-width: 240px;">
                    <h5 class="card-header">
                        {{tipo.nome}}
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>
    