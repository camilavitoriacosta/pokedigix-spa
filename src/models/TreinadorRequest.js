export default class TreinadorRequest {
    constructor() {
        this.idEndereco = null;
        this.nome = null;
        this.idPrimeiroPokemon = null;
    }

    populate(obj) {
        this.idEndereco = obj.idEndereco;
        this.nome = obj.nome;
        this.idPrimeiroPokemon = obj.idPrimeiroPokemon;
    }

    toJson() {
        return {
            idEndereco: this.idEndereco,
            nome: this.nome,
            idPrimeiroPokemon: this.idPrimeiroPokemon
        }
    }

}