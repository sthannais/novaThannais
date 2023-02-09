const { Personal, Chofer, Rol } = require('../../db')

const getChofer = async (req, res) => {

    const choferes = await Chofer.findAll({
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    });
    res.json(choferes);
}

const getChoferById = async (req, res) => {
    const { id } = req.params;
    const chofer = await Chofer.findOne({
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
    res.json(chofer);
}

const getAllChoferNames = async (req, res) => {
    try {
        const choferes = await Personal.findAll({
            attributes: ['name', 'lastname'],
            include: [{
                model: Rol,
                where: {
                    rolId: 3
                }
            }],
            include: [{
                model: Chofer,
                where: {
                    activeForOrden: true
                }
            }]
        });

        res.json(choferes);
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}


module.exports = {
    getChofer,
    getChoferById,
    getAllChoferNames,
}
