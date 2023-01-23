const { Patentes, OrdenDeReparto } = require('../../db');

// obtener todas las patentes que no esten en una orden de reparto
const getPatentes = async (req, res) => {
    try {
        const patentes = await Patentes.findAll({
            where: {
                active : false
            },
            include: {
                model: OrdenDeReparto,
            },
        });
        res.json(patentes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

module.exports = {
    getPatentes
}