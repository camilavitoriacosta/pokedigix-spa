import http from '../http-commons';

class AuthDataService {

    async criar(cadastro) {
        let resposta = await http.post('/auth/signup', cadastro)
        return resposta;
    }

    async acessar(login) {
        let resposta = await http.post('/auth/signin', login)
        return resposta;
    }

}

export default new AuthDataService();