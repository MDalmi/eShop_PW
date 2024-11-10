const { pool } = require('../config');
const Robo = require('../entities/Robo')

const getRoboDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT R.codigo AS codigo, R.nome AS nome,          
                    R.capacidade_max AS capacidade, R.descricao as descricao, R.valor_aluguel AS valor_aluguel, R.tipo AS tipo
                    FROM robos R 
                    ORDER BY nome`);
        return rows.map((robo) => new Robo(robo.codigo, robo.nome, robo.tipo, robo.capacidade, robo.descricao, robo.valor_aluguel));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addRoboDB = async (body) => {
    try {
        const { nome, capacidade, descricao, valor_aluguel, tipo } = body;
        const results = await pool.query(`INSERT INTO robos (nome, capacidade_max, descricao, valor_aluguel, tipo) 
            VALUES ($1, $2, $3, $4, $5)`,
            [nome, capacidade, descricao, valor_aluguel, tipo]);
        const robo = results.rows[0];
        return new Robo(robo.codigo, robo.nome, robo.capacidade, robo.descricao, robo.valor_aluguel, robo.tipo,);
    } catch (err) {
        throw "Erro ao inserir o Robô: " + err;
    }
}


const updateRoboDB = async (body) => {
    try {
        const { codigo, nome, capacidade, descricao , valor_aluguel, tipo} = body;
        const results = await pool.query(`UPDATE robos set nome = $2, , capacidade_max = $3, 
            descricao = $4, valor_aluguel = $5, tipo = $6 WHERE codigo = $1`,
            [codigo, nome, capacidade, descricao, valor_aluguel, tipo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const robo = results.rows[0];
        return new Robo(robo.codigo, robo.nome, robo.capacidade, robo.descricao, robo.valor_aluguel, robo.tipo,);
    } catch (err) {
        throw "Erro ao alterar o Robô: " + err;
    }
}

const deleteRoboDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM robos where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Robô removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o Robô: " + err;
    }
}

const getRoboPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT codigo, nome,          
                    capacidade, descricao, valor_aluguel, tipo
                    FROM robos WHERE codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const robo = results.rows[0];
            return new Robo(robo.codigo, robo.nome, robo.capacidade, robo.descricao, robo.valor_aluguel, robo.tipo);
        }
    } catch (err) {
        throw "Erro ao recuperar o robô: " + err;
    }
}

module.exports = {
    getRoboDB, addRoboDB, updateRoboDB, deleteRoboDB, getRoboPorCodigoDB
}