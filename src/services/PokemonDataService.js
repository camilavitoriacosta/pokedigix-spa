import http from '../http-commons'


class PokemonDataService {
    async buscarTodos() {
        let resposta = await http.get('/pokemons');
        return resposta.data;
    }

    async buscarTodosPaginadoOrdenado(pagina, tamanho, campoOrdenacao, direcao, nome) {
        let resposta = await http.get(`/pokemons?pagina=${pagina}&tamanho=${tamanho}&campoOrdenacao=${campoOrdenacao}&direcao=${direcao}&termo=${nome}`);
        return resposta.data;
    }

    async buscarPorId(id) {
        let resposta = await http.get('/pokemons/' + id);
        return resposta.data;
    }

    async buscarPeloIdDoTipo(id) {
        let resposta = await http.get('/pokemons/tipo/' + id);
        return resposta.data;
    }

    async criar(pokemon) {
        let resposta = await http.post('/pokemons', pokemon);
        return resposta.data;
    }

    async atualizar(pokemon, id) {
        let resposta = await http.put('/pokemons/' + id, pokemon);
        return resposta.data;
    }

    async removerPorId(id) {
        await http.delete('/pokemons/' + id);
    }

    async removerPorNome(termo) {
        await http.delete('/pokemons?termo=' + termo);
    }
}

export default new PokemonDataService();