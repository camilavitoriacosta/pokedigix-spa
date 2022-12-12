<script>
import AuthDataService from '../services/AuthDataService';
import AuthRequest from '../models/AuthRequest';
import MensagemSucesso from '../components/MensagemSucesso.vue'

export default {
    name: "sign-up",
    data() {
        return {
            authRequest: new AuthRequest(),
            salvo: false,
            mensagem: ""
        };
    },
    components: {
        MensagemSucesso
    },
    methods: {
        salvar() {
            AuthDataService.criar(this.authRequest)
                .then(resposta => {
                    this.mensagem = resposta.data.message
                    this.salvo = true;
                })
                .catch(erro => {
                    console.log(erro);
                    this.salvo = false
                })
        },
    },
    mounted() {
    }
}
</script>
<template>
    <MensagemSucesso :salvo="salvo">
        <span> {{ this.mensagem }}</span>
    </MensagemSucesso>
    <div class="container d-flex justify-content-center mt-4">
        <div class="card" style="max-width: 24rem; ">
            <div class="card-body">
                <h2 class="card-title text-center">Cadastrar Usuário</h2>
                <form class="row g-3" @submit.prevent="salvar">
                    <div class="col-12">
                        <label for="username" class="form-label">Username: </label>
                        <input type="Text" class="form-control" id="username" required v-model="authRequest.username">
                    </div>
                    <div class="col-12">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" v-model="authRequest.email" required>

                    </div>
                    <div class="col-12">
                        <label for="senha" class="form-label">Senha: </label>
                        <input type="password" class="form-control" id="senha" required v-model="authRequest.password">
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-dark w-100">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>