export default class PokemonResponse {
    constructor() {
        this.id = null;
        this.nome = null;
        this.altura = null;
        this.peso = null;
        this.genero = null;
        this.nivel = null;
        this.numeroPokedex = null;
        this.felicidade = null;
        this.tipos = [];
        this.ataques = [];
    }

    populate(obj) {
        this.id = obj.id;
        this.nome = obj.nome;
        this.altura = obj.altura;
        this.peso = obj.peso;
        this.genero = obj.genero;
        this.nivel = obj.nivel;
        this.numeroPokedex = obj.numeroPokedex;
        this.felicidade = obj.felicidade;
        this.tipos = obj.tipos;
        this.ataques = obj.ataques;
    }

    toJson() {
        return {
            id: this.id,
            nome: this.nome,
            altura: this.altura,
            peso: this.peso,
            genero: this.genero,
            nivel: this.nivel,
            numeroPokedex: this.numeroPokedex,
            felicidade: this.felicidade,
            tipos: this.tipos,
            ataques: this.ataques,
        };
    }
}