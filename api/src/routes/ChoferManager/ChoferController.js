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
        const personalActivo = await Personal.findAll({
            attributes: ['name', 'lastname'],
            where: {
                activeForOrden: true
            },
            include: [
                {
                    model: Rol,
                },
                {
                    model: Chofer
                }
            ]
        });

        const choferes = personalActivo.filter(persona => {
            const rol = persona.rols.map(rol => rol.Personal_Rol.rolId === 3);
            return rol[0];
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
