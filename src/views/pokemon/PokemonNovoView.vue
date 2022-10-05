<script>
import PokemonDataService from '../../services/PokemonDataService'
import PokemonRequest from '../../models/PokemonRequest';
import PokemonResponse from '../../models/PokemonResponse';
import TipoDataService from "../../services/TipoDataService"
import AtaqueDataService from "../../services/AtaqueDataService"

export default {
    name: 'pokemons-novo',
    data() {
        return {
            pokemonRequest: new PokemonRequest(),
            pokemonResponse: new PokemonResponse(),
            tipos: [],
            ataques: [],
            salvo: false,
            ataqueSelecionado: 0,
            quantidade: 0,
            ataquesSelecionados: []
        }
    },
    methods: {
        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                    this.pokemonRequest.tiposIds[0] = this.tipos[0].id;
                    this.pokemonRequest.tiposIds[1] = 0;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },
        carregarAtaques() {
            AtaqueDataService.buscarTodos()
                .then(resposta => {
                    this.ataques = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        adicionar() {
            if (this.ataquesSelecionados.length < 4 && this.ataqueSelecionado != 0) {
                this.ataquesSelecionados.push(this.ataqueSelecionado);
                this.ataqueSelecionado = 0;
            }
        },

        salvar() {
            this.pokemonRequest.tiposIds = [...new Set(this.pokemonRequest.tiposIds.filter(tipoId => tipoId != 0))];
            this.pokemonRequest.ataquesIds = [...new Set(this.ataquesSelecionados.filter(ataque => ataque.id != 0))];

            console.log(this.pokemonRequest.tiposIds);

            PokemonDataService.criar(this.pokemonRequest)
                .then(resposta => {
                    this.pokemonResponse = resposta;
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },
        remover(index) {
            this.ataquesSelecionados.splice(index, 1);
        }
    },
    mounted() {
        this.carregarTipos();
        this.carregarAtaques();
    }
}
</script>
<template>
    <div class="container  mt-4">
        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="salvo">
            <span>O Pokemon foi salvo com sucesso!</span>
            <span> Pokemon { id: {{pokemonResponse.id}}, nome: {{ pokemonResponse.nome}} } </span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="card">
            <div class="card-body">
                <h1 class="card-title"> Cadastrar Pokemon </h1>
                <form class="g-3">
                    <div class="row">
                        <div class="col-4">
                            <div class="card" style="width: 140px; height: 150px;">
                                <img :alt="'Imagem do Pokemon' + pokemonRequest.nome" :title="pokemonRequest.nome"
                                    class="card-img" :src="
                                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
                                      pokemonRequest.numeroPokedex +
                                      '.png' 
                                    " v-if="pokemonRequest.numeroPokedex > 0" />
                            </div>
                        </div>
                        <div class="col-8">
                            <label for="numeroPokedex" class="form-label">Nº:</label>
                            <input type="number" class="form-control" id="numeroPokedex" required
                                v-model="pokemonRequest.numeroPokedex">

                            <label for="nome" class="form-label">Nome:</label>
                            <input type="text" class="form-control" id="nome" required v-model="pokemonRequest.nome">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="nível" class="form-label">Nível:</label>
                            <input type="number" class="form-control" id="nível" required
                                v-model="pokemonRequest.nivel">
                        </div>
                        <div class="col-6">
                            <label for="felicidade" class="form-label">Felicidade:</label>
                            <input type="number" class="form-control" id="felicidade" required
                                v-model="pokemonRequest.felicidade">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="altura" class="form-label">Altura:</label>
                            <input type="number" class="form-control" id="altura" required
                                v-model="pokemonRequest.altura">
                        </div>
                        <div class="col-6">
                            <label for="peso" class="form-label">Peso:</label>
                            <input type="number" class="form-control" id="peso" required v-model="pokemonRequest.peso">
                        </div>
                    </div>
                    <div class="row">
                        <label for="genero" class="form-label col-12">Genero:</label>
                        <div class="col-12">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="generoPokemon" id="generoMasculino"
                                    value="MASCULINO" v-model="pokemonRequest.genero" checked>
                                <label class="form-check-label" for="generoMasculino">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-gender-male" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                                    </svg>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="generoPokemon" id="generoFeminino"
                                    value="FEMININO" v-model="pokemonRequest.genero">
                                <label class="form-check-label" for="generoFeminino">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-gender-female" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z" />
                                    </svg>
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="generoPokemon" id="generoIndefinido"
                                    value="INDEFINIDO" v-model="pokemonRequest.genero">
                                <label class="form-check-label" for="generoIndefinido">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-question-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <label for="tipo1" class="form-label"> Tipo 1:</label>
                            <select id="tipo1" class="form-select" v-model="pokemonRequest.tiposIds[0]">
                                <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id"> {{tipo.nome}}
                                </option>
                            </select>
                        </div>
                        <div class="col-6">
                            <label for="tipo2" class="form-label"> Tipo 2:</label>
                            <select id="tipo2" class="form-select" v-model="pokemonRequest.tiposIds[1]">
                                <option value="0"> Nenhum </option>
                                <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id"> {{tipo.nome}} </option>
                            </select>
                        </div>
                    </div>
                    <fieldset class="row m-0 mt-4 mb-4 pt-3 pb-3 border border-secondary rounded">
                        <label for="ataque1" class="form-label"> Ataques:</label>
                        <div class="row">
                            <div class="col-10">
                                <select id="ataque1" class="form-select" v-model="ataqueSelecionado">
                                    <option value="0"> Nenhum </option>
                                    <option v-for="ataque in ataques" :key="ataque.id" :value="ataque">
                                        {{ataque.nome}}
                                    </option>
                                </select>
                            </div>
                            <div class="col-2">
                                <button @click.prevent="adicionar" class="btn btn-success col-12">Adicionar</button>
                            </div>
                        </div>
                        <div class="mt-2 row">
                            <div class="card p-2 m-2" v-for="(ataque, index) in ataquesSelecionados"
                                style="max-width: 240px;">
                                <div class="card-body">
                                    <h5 class="card-title"> {{ataque.nome}} </h5>
                                    <p class="card-text"> Força: {{ataque.forca}} </p>
                                    <p class="card-text"> Tipo: {{ataque.tipo.nome}} </p>
                                    <p class="card-text"> Categoria: {{ataque.categoria}} </p>
                                    <button @click.prevent="remover(index)" class="btn btn-outline-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                            <path
                                                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path
                                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                        Remover
                                    </button>
                                </div>

                            </div>
                        </div>
                    </fieldset>
                    <div class="row text-center">
                        <div class="col-12 mt-2">
                            <button @click.prevent="salvar" class="btn btn-dark col-12">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>