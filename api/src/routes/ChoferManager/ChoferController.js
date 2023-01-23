const { Personal, Chofer, Rol } = require('../../db')

const getChofer = async (req, res) => {

        Personal.findAll({
            where : {
                rolId : 3
            },
            include : [{
                model : Rol
            },{
                model : Chofer,
            }],
            order : [
                ['id', 'ASC']
            ]
        })
        .then(choferes => {
            res.json(choferes)
        });
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
            where: {
                rolId: 3
            },
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
            msg: 'Error al obtener los choferes'
        });
    }
}


module.exports = {
    getChofer,
    getChoferById,
    getAllChoferNames,
}
