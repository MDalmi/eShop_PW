const { pool } = require('../config');
const Aluguel = require('../entities/Aluguel');

const getAluguelDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT A.codigo AS codigo, A.nome AS nome,          
                    A.robo AS robo, r.nome as robo_nome, A.planeta AS planeta, A.descricao AS descricao
                    FROM aluguel_robos A 
                    JOIN robos r ON r.codigo = A.robo
                    ORDER BY A.codigo`);
        return rows.map((aluguel) =>
            new Aluguel(aluguel.codigo, aluguel.nome, aluguel.robo,
                aluguel.robo_nome, aluguel.planeta,
                aluguel.descricao));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addAluguelDB = async (body) => {
    try {
        const { nome, robo, planeta, descricao } = body;
        const results = await pool.query(`INSERT INTO aluguel_robos (nome, robo , planeta, descricao_mis)
            VALUES ($1, $2, $3, $4) 
            RETURNING  nome, robo, planeta, descricao_mis`,
            [nome, robo, planeta, descricao]);
        const aluguel = results.rows[0];
        return new Aluguel(aluguel.codigo, aluguel.nome,
            aluguel.robo, "", aluguel.planeta,
            aluguel.descricao);
    } catch (err) {
        throw "Erro ao inserir o aluguel: " + err;
    }
}

const updateAluguelDB = async (body) => {
    try {
        const { codigo, nome, robo, planeta, descricao } = body;
        const results = await pool.query(`UPDATE aluguel_robos SET nome = $2, 
             robo = $3, planeta = $4, descricao_mis = $5
             WHERE codigo = $1
             RETURNING codigo, nome, robo, planeta, descricao_mis`,
            [codigo, nome, robo, planeta, descricao]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser alterado`;
        }
        const aluguel = results.rows[0];
        return new Aluguel(aluguel.codigo, aluguel.nome,
            aluguel.robo, "", aluguel.planeta, aluguel.descricao
        );
    } catch (err) {
        throw "Erro ao alterar o aluguel: " + err;
    }
}

const deleteAluguelDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM aluguel_robos
            WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}
            para ser removido`;
        } else {
            return "Aluguel removido com sucesso!"
        }
    } catch (err) {
        throw "Erro ao remover o aluguel: " + err;
    }
}

const getAluguelPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`
        SELECT A.codigo AS codigo, 
                    A.nome AS nome,          
                    A.robo AS robo, 
                    r.nome AS robo_nome,
                    A.planeta AS planeta, 
                    A.descricao_mis AS descricao
                    FROM aluguel_robos A 
                    JOIN robos r ON r.codigo = A.robo
        WHERE A.codigo = $1
        `, [codigo]);

        if (results.rowCount === 0) {
            throw new Error(`Nenhum registro encontrado com o código: ${codigo}`);
        } else {
            const aluguel = results.rows[0];
            return new Aluguel(
                aluguel.codigo,
                aluguel.nome,
                aluguel.robo,
                "",
                aluguel.planeta,
                aluguel.descricao

            );
        }
    } catch (err) {
        throw new Error(`Erro ao recuperar o aluguel: ${err}`);
    }
}

module.exports = {
    getAluguelDB, addAluguelDB, updateAluguelDB,
    deleteAluguelDB, getAluguelPorCodigoDB
}