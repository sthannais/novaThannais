const { Cuadrante } = require('../../db');

// obtener todos los cuadrantes

const getCuadrantes = async (req, res) => {
    try {
        const cuadrantes = await Cuadrante.findAll();
        res.json(cuadrantes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

module.exports = {
    getCuadrantes
}
