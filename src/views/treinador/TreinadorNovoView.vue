<script>
import TreinadorRequest from '../../models/TreinadorRequest';
import Endereco from '../../models/Endereco';
import PokemonDataService from '../../services/PokemonDataService';
import EnderecoDataService from '../../services/EnderecoDataService';

export default {
    name: 'treinadores-novo',
    data() {
        return {
            treinadorRequest: new TreinadorRequest(),
            salvo: false,
            pokemons: [],
            enderecos: [],
            endereco: new Endereco()
        }
    },

    methods: {
        carregarPokemon() {
            PokemonDataService.buscarTodos()
                .then(resposta => {
                    this.pokemons = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        carregarEndereco() {
            EnderecoDataService.buscarTodos()
                .then(resposta => {
                    this.enderecos = resposta;
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        salvarEndereco() {
            EnderecoDataService.criar(this.endereco)
                .then(resposta => {
                    this.endereco.id = resposta.id;
                    this.enderecos.push(this.endereco);
                    this.endereco = new Endereco();
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

        cancelar() {
            this.endereco = new Endereco();
        },

        salvar() {

        }
    },

    mounted() {
        this.carregarPokemon();
        this.carregarEndereco();
    }
}
</script>
    
<template>
    <div class="container  mt-4">
        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="salvo">
            <span>O Treinador foi salvo com sucesso!</span>
            <span> Treinador { id: {{treinador.id}}, nome: {{treinador.nome}} } </span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div class="card">
            <div class="card-body">
                <h1 class="card-title"> Cadastrar Treinador </h1>
                <form>
                    <div class="row">
                        <label for="nome" class="form-label">Nome do treinador</label>
                        <input type="text" required class="form-control" v-model="treinadorRequest.nome" id="nome" />
                    </div>
                    <div class="row">
                        <label for="pokemon" class="form-label">Pokemon inicial</label>
                        <select id="pokemon" class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example" v-model="treinadorRequest.idPrimeiroPokemon">
                            <option v-for="pokemon in pokemons" :key="pokemon.id" :value="pokemon.id">
                                {{pokemon.nome}} | {{pokemon.nivel}}
                            </option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-4" v-for="endereco in enderecos" :key="endereco.id">
                            <input type="radio" class="btn-check" name="options" :id="endereco.id" autocomplete="off">

                            <label class="btn" :for="endereco.id">
                                <div class="card h-100" style="width:200px">
                                    <div class="card-body">
                                        <p class="card-text">Cidade: {{endereco.cidade}}</p>
                                        <p class="card-text">Regiao: {{endereco.regiao}}</p>
                                    </div>
                                </div>
                            </label>

                        </div>
                        <div class="col-4">
                            <div class="card align-items-center h-100" style="width:200px">
                                <button type="button" class="btn btn-outline-dark h-100 w-100" data-bs-toggle="modal"
                                    data-bs-target="#enderecoNovoModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button @click.prevent="salvar" class="btn btn-success mt-2">Salvar</button>
                </form>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="enderecoNovoModal" tabindex="-1" aria-labelledby="enderecoNovoModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="enderecoNovoModalLabel">Cadastrar Endereço</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <label for="regiao" class="form-label">Regiao:</label>
                                <input type="text" class="form-control" id="regiao" required v-model="endereco.regiao">
                            </div>
                            <div class="row">
                                <label for="cidade" class="form-label">Cidade:</label>
                                <input type="text" class="form-control" id="cidade" required v-model="endereco.cidade">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelar">
                            Cancelar </button>
                        <button type="button" class="btn btn-primary" @click.prevent="salvarEndereco"
                            data-bs-dismiss="modal">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>