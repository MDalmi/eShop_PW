const { Router } = require('express');

const { getRobo, addRobo, updateRobo, deleteRobo, getRoboPorCodigo} = require('../controllers/roboControllers');

const { verificaJWT } = require('../controllers/segurancaController')

const rotasRobos = new Router();

rotasRobos.route('/robo')
   .get(verificaJWT, getRobo)
   .post(verificaJWT, addRobo)
   .put(verificaJWT , updateRobo)

rotasRobos.route('/robo/:codigo')
   .get(verificaJWT, getRoboPorCodigo)
   .delete(verificaJWT, deleteRobo)

module.exports = { rotasRobos };