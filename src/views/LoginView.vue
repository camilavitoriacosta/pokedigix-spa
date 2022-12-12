<script>
import AuthDataService from '../services/AuthDataService';
import LoginDTO from '../models/LoginDTO';
import MensagemSucesso from '../components/MensagemSucesso.vue'

export default {
    name: "sign-up",
    data() {
        return {
            loginDTO: new LoginDTO(),
        };
    },
    components: {
        MensagemSucesso
    },
    methods: {
        acessar() {
            AuthDataService.acessar(this.loginDTO)
                .then(resposta => {
                    console.log(resposta);
                    // cookies.set('token', resposta, '10min');
                    //cookies.set('treinador_nome', treinador.nome, '10min');
                    // this.$router.push({ name: 'treinador-perfil', params: { id: treinador.id } });
                })
                .catch(erro => {
                    console.log(erro);
                })
        },

    },
    mounted() {
    }
}
</script>
<template>
    <div class="container d-flex justify-content-center mt-4">
        <MensagemSucesso :salvo="salvo">
            <span>O usuario foi salvo com sucesso!</span>
            <span> Usuario { id: {{ user.id }} nome: {{ user.nome }} } </span>
        </MensagemSucesso>
        <div class="card" style="max-width: 24rem; ">
            <div class="card-body">
                <h2 class="card-title text-center">Login</h2>
                <form class="row g-3" @submit.prevent="acessar">
                    <div class="col-12">
                        <label for="username" class="form-label">Username: </label>
                        <input type="Text" class="form-control" id="username" required v-model="loginDTO.username">
                    </div>
                    <div class="col-12">
                        <label for="senha" class="form-label">Senha: </label>
                        <input type="password" class="form-control" id="senha" required v-model="loginDTO.password">
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-dark w-100">Acessar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>