export default class MensagemErroDTO {
    constructor() {
        this.mensagem = null;
        this.tipo = null;
        this.status = null;
    }

    populate(obj) {
        this.mensagem = obj.mensagem;
        this.tipo = obj.tipo;
        this.status = obj.status;
    }

    toJson() {
        return {
            mensagem: this.mensagem,
            status: this.status,
            tipo: this.tipo
        };
    }
}