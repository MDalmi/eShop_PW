const { Router } = require('express');

const { rotasRobos } = require('./rotasCategorias');

const rotas = new Router();

rotas.use(rotasRobos);

module.exports = rotas;