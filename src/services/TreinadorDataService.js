import http from '../http-commons'

class TreinadorDataService {
    async buscarTodos() {
        let resposta = await http.get('/treinadores');
        return resposta.data;
    }

    async buscarPokemonsTreinador(id) {
        let resposta = await http.get('/treinadores/' + id + '/pokemons');
        return resposta.data;
    }

    // async buscarPorTermo(termo) {
    //     let resposta = await http.get('/treinadores?termo=' + termo);
    //     return resposta.data;
    // }

    async buscarPorId(id) {
        let resposta = await http.get('/treinadores/' + id);
        return resposta.data;
    }

    async criar(treinador) {
        let resposta = await http.post('/treinadores', treinador);
        return resposta.data;
    }

    async atualizar(treinador, id) {
        let resposta = await http.put('/treinadores/' + id, treinador);
        return resposta.data;
    }

    async removerPorId(id) {
        await http.delete('/treinadores/' + id);
    }

    async removerPorNome(termo) {
        await http.delete('/treinadores?termo=' + termo);
    }
}

export default new TreinadorDataService();