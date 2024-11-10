const { Router } = require('express');

const { rotasRobos } = require('./rotasRobos');
const { rotasAluguel } = require('./rotasAluguel')

const rotas = new Router();

rotas.use(rotasRobos, rotasAluguel);


module.exports = rotas;