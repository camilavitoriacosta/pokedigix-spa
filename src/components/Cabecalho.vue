<script >
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
    data() {
        return {
            treinadorNome: ""
        }
    },
    mounted() {
        this.treinadorNome = cookies.get('treinador_nome');
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-cabecalho navbar-dark sticky-toper">
            <div class="container-lg">
                <span class="navbar-brand" href="#">Pokédigix</span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/pokemons-selvagens" class="nav-link"> Pokemons Selvagens</RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Ataques
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/novo">Criar</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/ataques/lista">Listar</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Tipos
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/novo">Criar</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/tipos/lista">Listar</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Pokemons
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/novo">Criar</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/pokemons/lista">Listar</RouterLink>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Treinador
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinadores/novo">Criar</RouterLink>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <RouterLink class="dropdown-item" to="/treinadores/lista">Listar</RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="treinador-logado d-flex" v-if="treinadorNome">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    {{treinadorNome}}
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <RouterLink class="dropdown-item" to="/treinadores/lista">Trocar Treinador
                                        </RouterLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style>
.bg-cabecalho {
    background-color: rgb(148, 105, 189);
}
</style>