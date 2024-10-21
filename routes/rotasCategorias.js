const { Router } = require('express');

const { getCategorias, addCategoria, updateCategoria, deleteCategoria, getCategoriaPorCodigo } = require('../controllers/categoriaControllers');

const rotasCategorias = new Router();

rotasCategorias.route('/categoria')
   .get(getCategorias)
   .post(addCategoria)
   .put(updateCategoria)

rotasCategorias.route('/categoria/:codigo')
   .get(getCategoriaPorCodigo)
   .delete(deleteCategoria)

module.exports = { rotasCategorias };