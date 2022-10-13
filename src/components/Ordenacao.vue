<script>
export default {
    name: "ordenacao",
    props: {
        ordenacao: Object,
        opcoes: {
            required: false,
            default: [
                { titulo: "Nome A-Z", direcao: "ASC", campo: "nome" },
                { titulo: "Nome Z-A", direcao: "DESC", campo: "nome" },
            ],
            type: Array
        }
    },
    methods: {
        ordenar() {
            this.$emit('ordenar');
        }
    }
}
</script>

<template>
    <select class="form-select" aria-label="Filtro ordenação" v-model="ordenacao" @change="ordenar()">
        <option v-for="opcao in opcoes" :key="opcao.titulo" :value="opcao"> {{opcao.titulo}} </option>
    </select>
</template>