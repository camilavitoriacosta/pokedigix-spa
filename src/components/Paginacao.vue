<script>
/**
 * quantidadeItens: quantidade de páginas que podem aparecer no layout
 * totalPaginas: total de páginas
 * atual: página atual
 * trocarPagina: função que gerencia o clique na página
**/
export default {
    name: 'paginacao',
    props: {
        quantidadeItens: {
            type: Number,
            default: 4
        },
        totalPaginas: {
            type: Number,
            default: 1
        },
        atual: {
            type: Number,
            default: 1
        },
        trocarPagina: {
            type: Function
        }
    },
    computed: {
        current() {
            let current = 1;
            current = this.atual < 1 ? 1 : this.atual
            return current > this.totalPaginas ? this.totalPaginas : current
        },
        inicio() {
            let inicio = this.current - this.current % this.quantidadeItens
            if (this.current % this.quantidadeItens == 0) {
                inicio = this.current - this.quantidadeItens
            }
            if (this.current > this.quantidadeItens) {
                inicio = inicio + 1
            }
            return Math.max(1, inicio)
        },
        fim() {
            let fim = this.inicio + this.quantidadeItens - 1
            if (this.current % this.quantidadeItens == 0) {
                fim = this.current
            }
            fim = fim > this.totalPaginas ? this.totalPaginas : fim
            return Math.min(fim, this.totalPaginas)
        },
        contadorDePaginas() {
            let paginas = []
            for (let i = this.inicio; i <= this.fim; i++) {
                paginas.push(i)
            }
            return paginas
        }
    }
}
</script>

<template>
    <nav>
        <ul class="pagination justify-content-center">
            <li v-if="inicio > quantidadeItens" class="page-item">
                <a href="#" @click="trocarPagina(atual-1)" aria-label="Anterior" class="page-link"><span
                        aria-hidden="true">&laquo;</span></a>
            </li>
            <li :key="p" v-for="p in contadorDePaginas" :class="p == atual ? 'active' : ''" class="page-item">
                <a href="#" @click="p == atual ? null : trocarPagina(p)" v-text="p" class="page-link"></a>
            </li>
            <li v-if="fim != totalPaginas" class="page-item">
                <a href="#" @click="trocarPagina(atual+1)" aria-label="Próximo" class="page-link"><span
                        aria-hidden="true">&raquo;</span></a>
            </li>
        </ul>
    </nav>
</template>