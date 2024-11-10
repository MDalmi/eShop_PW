const { Router } = require('express');

const { rotasRobos } = require('./rotasCategorias');
const { rotasAluguel } = require('./rotasAluguel')

const rotas = new Router();

rotas.use(rotasRobos, rotasAluguel);


module.exports = rotas;