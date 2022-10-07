<script>
import TreinadorRequest from '../../models/TreinadorRequest';
import Endereco from '../../models/Endereco';
import PokemonDataService from '../../services/PokemonDataService';
import EnderecoDataService from '../../services/EnderecoDataService';
import PokemonRequest from '../../models/PokemonRequest';
import TreinadorDataService from '../../services/TreinadorDataService';
import TipoDataService from '../../services/TipoDataService';

export default {
    name: 'treinadores-novo',
    data() {
        return {
            treinadorRequest: new TreinadorRequest(),
            salvo: false,
            pokemons: [],
            enderecos: [],
            endereco: new Endereco(),
            pokemonsIniciais: [
                {
                    "nome": "Totodile",
                    "tipo": "Agua",
                    "numeroPokedex": 158
                },
                {
                    "nome": "Cyndaquil",
                    "tipo": "Fogo",
                    "numeroPokedex": 155
                },
                {
                    "nome": "Chikorita",
                    "tipo": "Grama",
                    "numeroPokedex": 152
                },
            ],
            pokemonInicialSelecionado: {
                "nome": "Cyndaquil",
                "numeroPokedex": 155
            }
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
            const pokemon = new PokemonRequest();
            pokemon.numeroPokedex = this.pokemonInicialSelecionado.numeroPokedex;
            pokemon.nome = this.pokemonInicialSelecionado.nome;
            pokemon.altura = 1;
            pokemon.peso = 2.0;
            pokemon.felicidade = 80;
            pokemon.nivel = 10;
            
            PokemonDataService.criar(pokemon)
                .then(resposta => {
                    this.treinadorRequest.idPrimeiroPokemon = resposta.id;
                    console.log(this.treinadorRequest);
                    TreinadorDataService.criar(this.treinadorRequest)
                        .then(resposta => {
                            this.treinadorRequest.id = resposta.id;
                            this.salvo = true;
                        })
                        .catch(erro => {
                            console.log(erro);
                        })
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false;
                })
        },

    },

    mounted() {
        this.carregarPokemon();
        this.carregarEndereco();
        this.pokemonInicialSelecionado.numeroPokedex = this.pokemonsIniciais[1].numeroPokedex;
    }
}
</script>
    
<template>
    <div class="container  mt-4">
        <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="salvo">
            <span>O Treinador foi salvo com sucesso!</span>
            <span> Treinador { nome: {{treinadorRequest.nome}} } </span>
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
                    <div class="row  justify-content-center">
                        <label for="pokemon" class="form-label">Pokemon inicial</label>
                        <!-- <select id="pokemon" class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg example" v-model="treinadorRequest.idPrimeiroPokemon">
                            <option v-for="pokemon in pokemons" :key="pokemon.id" :value="pokemon.id">
                                {{pokemon.nome}} | {{pokemon.nivel}}
                            </option>
                        </select> -->
                        <div class="col-2" v-for="pokemon in pokemonsIniciais">
                            <input type="radio" class="btn-check" name="options-outlined" :id="pokemon.numeroPokedex"
                                autocomplete="off" :value="pokemon.numeroPokedex"
                                v-model="pokemonInicialSelecionado.numeroPokedex">
                            <label class="btn btn-outline-dark row" :for="pokemon.numeroPokedex">
                                <p>{{pokemon.nome}}</p>
                                <img class="img-fluid rounded-start" style="max-width: 140px;"
                                    :id="'imgPokemon'+ pokemon.id"
                                    :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+ pokemon.numeroPokedex +'.png'"
                                    alt="imagem pokemon" />
                            </label>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <label for="endereco" class="form-label">Endereço</label>
                            <div class="col-3 mb-2" v-for="endereco in enderecos" :key="endereco.id">
                                <input type="radio" class="btn-check" name="options" :id="endereco.id"
                                    :value="endereco.id" autocomplete="off" v-model="treinadorRequest.idEndereco">

                                <label class="btn" :for="endereco.id">
                                    <div class="card" style="width:200px; height:150px;">
                                        <div class="card-body">
                                            <p class="card-text">Cidade: {{endereco.cidade}}</p>
                                            <p class="card-text">Regiao: {{endereco.regiao}}</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div class="col-2">
                                <div class="card align-items-center" style="width:200px; height:150px;">
                                    <button type="button" class="btn btn-outline-dark h-100 w-100"
                                        data-bs-toggle="modal" data-bs-target="#enderecoNovoModal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                        </svg>
                                    </button>
                                </div>
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