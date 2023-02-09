const { Ayudante, Personal, Rol } = require('../../db')


const getAyudantes = async (req, res) => {
    
    const ayudantes = await Ayudante.findAll({
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    });
    res.json(ayudantes);
}

const getAyudanteById = async (req, res) => {
    const { id } = req.params;

    const ayudante = await Ayudante.findOne({
        where: {
            id
        },
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    });
    res.json(ayudante);
}

const getAllAyudanteNames = async (req, res) => {
    try {
        const ayudantes = await Personal.findAll({
            attributes: ['name', 'lastname'],
            include: [{
                model: Rol,
                where: {
                    rolId: 4
                }
            }],
            include: [{
                model: Ayudante,
                where: {
                    activeForOrden: true
                }
            }]
        });
        res.json(ayudantes);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los ayudantes'
        });
    }
}

module.exports = {
    getAyudantes,
    getAyudanteById,
    getAllAyudanteNames
}