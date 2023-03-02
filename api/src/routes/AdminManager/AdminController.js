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

const changeOnlineStatus = async (req, res) => {
    try{
        const { id } = req.params;

        const admin = await Administrador.findByPk(id);
        const personal = await admin.getPersonal();

        await personal.update({
            online: !personal.online
        });

        res.json({
            msg: 'Estado de conexión actualizado'
        });
    }catch(error){
        res.status(500).json({
            msg: 'Error al actualizar el estado de conexión',
            error: error.message
        });
    }
}


module.exports = {
    getAdmins,
    getAdminById,
}
