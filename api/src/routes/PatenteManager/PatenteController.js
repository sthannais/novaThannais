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
            order : [
                ['id', 'ASC']
            ]
        });
        res.json(patentes);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const getAllPatentes = (req, res) => {
    Patentes.findAll()
        .then(patentes => res.json(patentes))
        .catch(err => console.log(err));
}

const createPatente = async (req, res) => {

    const { name } = req.body;
    try {
        const newPatente = await Patentes.create({ name });
        res.json(newPatente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};



module.exports = {
    getPatentes,
    getAllPatentes,
    createPatente
}