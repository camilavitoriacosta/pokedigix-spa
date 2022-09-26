import http from '../http-commons'

class AtaqueDataService {
    async buscarTodos() {
        let resposta = await http.get('/ataques');
        return resposta.data;
    }

    async buscarPorTermo(termo) {
        let resposta = await http.get('/ataques?termo=${termo}');
        return resposta.data;
    }

    async buscarPorId(id) {
        let resposta = await http.get('/ataques/${id}');
        return resposta.data;
    }

    async criar(ataque) {
        let resposta = await http.post('/ataques', ataque);
        return resposta.data;
    }

    async atualizar(ataque, id) {
        let resposta = await http.put('/ataques/${id}', ataque);
        return resposta.data;
    }

    async removerPorId(id) {
        await http.delete('/ataques/${id}');
    }
}

export default new AtaqueDataService();