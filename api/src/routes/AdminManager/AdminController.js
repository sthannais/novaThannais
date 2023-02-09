const { Administrador, Personal, Rol } = require('../../db')

const getAdmins = (req, res) => {
    Administrador.findAll({
        include: [{
            model: Personal,
            include: [{
                model: Rol
            }]
        }]
    }).then(administradores => {
        res.json(administradores);
    }).catch(error => {
        res.status(500).json({
            msg: 'Error al obtener los administradores'
        });
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
