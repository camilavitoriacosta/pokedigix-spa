<script>
import AtaqueDataService from '../services/AtaqueDataService';
export default {
    name: "ataques-lista",
    data() {
        return { ataques: [] };
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
                    <tr>
                        <th class="col">#</th>
                        <th class="col">Nome</th>
                        <th class="col">Descricao</th>
                        <th class="col">Forca</th>
                        <th class="col">Acuracia</th>
                        <th class="col">PP</th>
                        <th class="col">Categoria</th>
                        <th class="col">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ataque in ataques" :key="ataque.id">
                        <td>{{ataque.id}}</td>
                        <td>{{ataque.nome}}</td>
                        <td>{{ataque.descricao}}</td>
                        <td>{{ataque.forca}}</td>
                        <td>{{ataque.acuracia}}</td>
                        <td>{{ataque.pontosDePoder}}</td>
                        <td>{{ataque.categoria}}</td>
                        <td>{{ataque.tipo.nome}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
        