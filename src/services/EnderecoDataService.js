import http from '../http-commons'


class EnderecoDataService {
    async buscarTodos() {
        let resposta = await http.get('/enderecos');
        return resposta.data;
    }

    async buscarPorTermo(termo) {
        let resposta = await http.get('/enderecos?termo=' + termo);
        return resposta.data;
    }

    async buscarPorId(id) {
        let resposta = await http.get('/enderecos/' + id);
        return resposta.data;
    }

    async criar(endereco) {
        let resposta = await http.post('/enderecos', endereco);
        return resposta.data;
    }

    async atualizar(endereco, id) {
        let resposta = await http.put('/enderecos/' + id, endereco);
        return resposta.data;
    }

    async removerPorId(id) {
        await http.delete('/enderecos/' + id);
    }

    async removerPorNome(termo) {
        await http.delete('/enderecos?termo=' + termo);
    }
}

export default new EnderecoDataService();