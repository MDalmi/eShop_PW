const { pool } = require('../config');
const Robo = require('../entities/Robo')

const getRoboDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM robos ORDER BY nome');
        return rows.map((robo) => new Robo(robo.codigo, robo.nome, robo.tipo, robo.capacidade, robo.descricao));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addRoboDB = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO robos (nome) 
            VALUES ($1)
            returning codigo, nome`,
            [nome]);
        const robo = results.rows[0];
        return new Robo(robo.codigo, robo.nome);
    } catch (err) {
        throw "Erro ao inserir o Robô: " + err;
    }
}


const updateRoboDB = async (body) => {
    try {
        const { codigo, nome, tipo, capacidade, descricao } = body;
        const results = await pool.query(`UPDATE robos set nome = $2, tipo_robo = $3, capacidade_max = $4, descricao = $5 where codigo = $1 
        returning codigo, nome`,
            [codigo, nome, tipo, capacidade, descricao]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const categoria = results.rows[0];
        return new Categoria(categoria.codigo, categoria.nome);
    } catch (err) {
        throw "Erro ao alterar a categoria: " + err;
    }
}

const deleteRoboDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM robos where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Robô removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o Robô: " + err;
    }
}

const getRoboPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM robos where codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const robo = results.rows[0];
            return new Robo(robo.codigo, robo.nome, robo.tipo, robo.capacidade, robo.descricao);
        }
    } catch (err) {
        throw "Erro ao recuperar a categoria: " + err;
    }
}

module.exports = {
    getRoboDB, addRoboDB, updateRoboDB, deleteRoboDB, getRoboPorCodigoDB
}