const { Router } = require('express');

const { rotasRobos } = require('./rotasRobos');
const { rotasAluguel } = require('./rotasAluguel')
const { login } = require('./../controllers/segurancaController')

const rotas = new Router();

rotas.use(rotasRobos, rotasAluguel);

rotas.route("/login")
   .post(login)    

module.exports = rotas;