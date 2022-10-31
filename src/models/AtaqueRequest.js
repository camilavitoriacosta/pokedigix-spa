export default class AtaqueRequest {
    constructor() {
        this.nome = null;
        this.forca = null;
        this.acuracia = null;
        this.pontosDePoder = null;
        this.categoria = null;
        this.descricao = null;
        this.tipoId = null;
    }

    populate(obj) {
        this.nome = obj.nome;
        this.forca = obj.forca;
        this.acuracia = obj.acuracia;
        this.pontosDePoder = obj.pontosDePoder;
        this.categoria = obj.categoria;
        this.descricao = obj.descricao;
        this.tipoId = obj.tipoId;
    }

    toJson() {
        return {
            nome: this.nome,
            forca: this.forca,
            acuracia: this.acuracia,
            pontosDePoder: this.pontosDePoder,
            categoria: this.categoria,
            descricao: this.descricao,
            tipoId: this.tipoId
        };
    }
}