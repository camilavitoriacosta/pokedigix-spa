export default class TreinadorResponse {
    constructor() {
        this.id = null;
        this.nome = null;
        this.endereco = null;
        this.dinheiro = 0;
        this.nivel = 0;
        this.insignias = [];
    }

    populate(obj) {
        this.id = obj.id;
        this.nome = obj.nome;
        this.endereco = obj.endereco;
        this.dinheiro = obj.dinheiro;
        this.nivel = obj.nivel;
        this.insignias = obj.insignias;
    }

    toJson() {
        return {
            id: this.id,
            nome: this.nome,
            endereco: this.endereco,
            dinheiro: this.dinheiro,
            nivel: this.nivel,
            insignias: this.insignias
        };
    }
}