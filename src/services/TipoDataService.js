import http from '../http-commons'


class TipoDataService {
    async buscarTodos() {
        let resposta = await http.get('/tipos');
        return resposta.data;
    }

    async buscarPorTermo(termo) {
        let resposta = await http.get('/tipos?termo=' + termo);
        return resposta.data;
    }

    async buscarPorId(id) {
        let resposta = await http.get('/tipos/' + id);
        return resposta.data;
    }

    async criar(tipo) {
        let resposta = await http.post('/tipos', tipo);
        return resposta.data;
    }

    async atualizar(tipo, id) {
        let resposta = await http.put('/tipos/' + id, tipo);
        return resposta.data;
    }

    async removerPorId(id) {
        await http.delete('/tipos/' + id);
    }

    async removerPorNome(termo) {
        await http.delete('/tipos?termo=' + termo);
    }
}

export default new TipoDataService();