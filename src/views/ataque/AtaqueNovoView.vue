<script>
import AtaqueDataService from "../../services/AtaqueDataService"
import TipoDataService from "../../services/TipoDataService"
import AtaqueRequest from "../../models/AtaqueRequest"
import MessagemErroDTO from "../../models/MessagemErroDTO"
import AtaqueResponse from "../../models/AtaqueResponse"
import MensagemSucesso from "../../components/MensagemSucesso.vue"
import MensagemErro from "../../components/MensagemErro.vue"

export default {
    name: "ataques-novo",
    data() {
        return {
            ataqueRequest: new AtaqueRequest(),
            ataqueResponse: new AtaqueResponse(),
            desabilitarForca: false,
            salvo: false,
            tipos: [],
            categorias: [
                {
                    indice: 1,
                    nome: "Fisico",
                    nomeBanco: "FISICO"
                },
                {
                    indice: 2,
                    nome: "Especial",
                    nomeBanco: "ESPECIAL"
                },
                {
                    indice: 3,
                    nome: "Efeito",
                    nomeBanco: "EFEITO"
                }
            ],
            mensagemDeErro: new MessagemErroDTO(),
        };
    },
    components: {
        MensagemSucesso,
        MensagemErro
    },
    methods: {
        getChildInterface(childInterface) {
            // Setting the interface when emitted from child
            this.$options.childInterface = childInterface;
        },

        ativar() {
            this.$options.childInterface.ativar();
        },

        carregarTipos() {
            TipoDataService.buscarTodos()
                .then(resposta => {
                    this.tipos = resposta;
                    this.ataqueRequest.tipoId = this.tipos[0].id;
                })
                .catch(erro => {
                    console.log(erro);
                });
        },
        escolherCategoria() {
            if (this.ataqueRequest.categoria == "EFEITO") {
                this.desabilitarForca = true;
            }
            else {
                this.desabilitarForca = false;
            }
        },
        salvar() {
            AtaqueDataService.criar(this.ataqueRequest)
                .then(resposta => {
                    this.ataqueResponse = resposta;
                    this.salvo = true;
                    this.ataqueRequest = new AtaqueRequest();
                })
                .catch(erro => {
                    console.log(erro);

                    this.construirMensagemErro(erro.response.data);

                    this.salvo = false;
                    this.ativar();
                });
        },
        
        construirMensagemErro(data) {
            this.mensagemDeErro.status = data.status;
            this.mensagemDeErro.tipo = data.type;

            this.mensagemDeErro.mensagem = data.errors[0];
        }
    },
    mounted() {
        this.ataqueRequest.categoria = this.categorias[0].nomeBanco;
        this.carregarTipos();
    },
}
</script>

<template>
    <div class="container  mt-4">
        <MensagemSucesso :salvo="salvo">
            <span>O Ataque foi salvo com sucesso!</span>
            <span> Ataque { id: {{ ataqueResponse.id }}, nome: {{ ataqueResponse.nome }} } </span>
        </MensagemSucesso>
        <div class="card">
            <div class="card-body">
                <h1 class="card-title"> Cadastrar Ataque </h1>
                <form class="row g-3 needs-validation" @submit.prevent="salvar">
                    <div class="col-12">
                        <label for="nome" class="form-label">Nome:</label>
                        <input type="text" class="form-control" id="nome" required v-model="ataqueRequest.nome">
                    </div>
                    <div class="col-6">
                        <label for="forca" class="form-label">Força:</label>
                        <div class="has-validation">
                            <input type="number" class="form-control" id="forca" required v-model="ataqueRequest.forca"
                                :disabled="desabilitarForca">
                            <div class="invalid-feedback">
                                {{mensagemDeErroDTO.mensagemDeErro}}
                            </div>
                        </div>

                    </div>
                    <div class="col-6">
                        <label for="acuracia" class="form-label">Acuracia:</label>
                        <input type="number" class="form-control" id="acuracia" required
                            v-model="ataqueRequest.acuracia">
                    </div>
                    <div class="col-3">
                        <label for="pontosDePoder" class="form-label">Pontos de Poder:</label>
                        <input type="number" class="form-control" id="pontosDePoder" required
                            v-model="ataqueRequest.pontosDePoder">
                    </div>
                    <div class="col-9">
                        <label for="categoria" class="form-label"> Categoria </label>
                        <select id="categoria" class="form-select" v-model="ataqueRequest.categoria"
                            v-on:change="escolherCategoria">
                            <option v-for="categoria in categorias" :key="categoria.indice"
                                :value="categoria.nomeBanco"> {{ categoria.nome }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label for="tipo" class="form-label"> Tipo </label>
                        <select id="tipo" class="form-select" v-model="ataqueRequest.tipoId">
                            <option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id"> {{ tipo.nome }}
                            </option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label for="descricao" class="form-label">Descrição</label>
                        <textarea class="form-control" id="descricao" rows="2" v-model="ataqueRequest.descricao"
                            required></textarea>
                    </div>
                    <button type="submit" class="btn btn-dark" id="liveToastBtn">Salvar</button>
                </form>
            </div>
        </div>
        <MensagemErro :mensagemDeErro="mensagemDeErro" :ativo="ativo" @interface="getChildInterface"></MensagemErro>
    </div>
</template>