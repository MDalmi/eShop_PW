const { Router } = require('express');

const { getAluguel, addAluguel, updateAluguel, deleteAluguel, getAluguelPorCodigo} = require('../controllers/aluguelControllers');

const rotasAluguel = new Router();

rotasAluguel.route('/aluguel')
   .get(getAluguel)
   .post(addAluguel)
   .put(updateAluguel)

rotasAluguel.route('/aluguel/:codigo')
   .get(getAluguelPorCodigo)
   .delete(deleteAluguel)

module.exports = { rotasAluguel };