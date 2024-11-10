const { getAluguelDB, addAluguelDB, updateAluguelDB, 
    deleteAluguelDB, getAluguelPorCodigoDB } = require('../useCases/AluguelUseCase');

const getAluguel = async (request, response) => {
    await getAluguelDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultas os Aluguels: ' + err
        }))
}

const addAluguel = async (request, response) => {
    await addAluguelDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Aluguel criado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao adicionar o Aluguel: ' + err
        }))
}

const updateAluguel = async (request, response) => {
    await updateAluguelDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Aluguel atualizado com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao atualizar o Aluguel: ' + err
        }))
}

const deleteAluguel = async (request, response) => {
    await deleteAluguelDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao remover o Aluguel: ' + err
        }))
}

const getAluguelPorCodigo = async (request, response) => {
    await getAluguelPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao recuperar o Aluguel: ' + err
        }))
}

module.exports = {
    getAluguel, addAluguel, updateAluguel, 
    deleteAluguel, getAluguelPorCodigo
}