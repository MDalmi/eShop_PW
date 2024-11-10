class Robo {
    constructor(codigo, nome, tipo, capacidade, descricao, valor_aluguel) {
        this.codigo = codigo;
        this.nome = nome;
        this.capacidade = capacidade;
        this.descricao = descricao;
        this.valor_aluguel = valor_aluguel
        this.tipo = tipo;
    }
}

module.exports = Robo;