const { Administrador, Personal, Rol } = require('../../db')

const getAdmins = (req, res) => {

    Personal.findAll({
        where : {
            rolId : 1
        },
        include : [
            {
                model : Administrador
            }
        ]
    })
    .then(admins => {
        res.json(admins)
    });
}

const getAdminById = async (req, res) => {
    const { id } = req.params;

    const admin = await Administrador.findOne({
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
    res.json(admin);
}

module.exports = {
    getAdmins,
    getAdminById,
}
