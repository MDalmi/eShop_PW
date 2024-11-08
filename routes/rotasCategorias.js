const { Router } = require('express');

const { getRobo, addRobo, updateRobo, deleteRobo, getRoboPorCodigo} = require('../controllers/roboControllers');

const rotasRobos = new Router();

rotasRobos.route('/robo')
   .get(getRobo)
   .post(addRobo)
   .put(updateRobo)

rotasRobos.route('/robo/:codigo')
   .get(getRoboPorCodigo)
   .delete(deleteRobo)

module.exports = { rotasRobos };