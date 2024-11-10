const { getRoboDB, addRoboDB, updateRoboDB, deleteRoboDB, getRoboPorCodigoDB } = require('../useCases/RoboUseCases')

const getRobo = async (request, response) => {
    await getRoboDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os robos: ' + err
        }));
}

const addRobo = async (request, response) => {
    await addRoboDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Robô criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateRobo = async (request, response) => {
    await updateRoboDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Robô alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteRobo = async (request, response) => {
    await deleteRoboDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getRoboPorCodigo= async (request, response) => {
    await getRoboPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getRobo, addRobo, updateRobo, deleteRobo, getRoboPorCodigo
}