const { Router } = require('express');

const { getAluguel, addAluguel, updateAluguel, deleteAluguel, getAluguelPorCodigo} = require('../controllers/aluguelControllers');

const { verificaJWT } = require('../controllers/segurancaController')

const rotasAluguel = new Router();

rotasAluguel.route('/privado/aluguel')
   .get(verificaJWT, getAluguel)
   .post(verificaJWT, addAluguel)
   .put(verificaJWT, updateAluguel)

rotasAluguel.route('/privado/aluguel/:codigo')
   .get(verificaJWT, getAluguelPorCodigo)
   .delete(verificaJWT, deleteAluguel)

module.exports = { rotasAluguel };