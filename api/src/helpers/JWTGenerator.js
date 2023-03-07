const JWT = require('jsonwebtoken');
const { Personal, Rol } = require('../db');

const JWTGenerator = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1m'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

const JWTVerify = async (req = request, res = response, next) => {
    const token = req.header("token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { id } = JWT.verify(token, process.env.JWT_SECRET);

        // leer el usuario que corresponde al id
        const user = await Personal.findByPk(id, {
            include: {
            model: Rol,
            attributes: ["name"],
            },
        });

        if (!user) {
            return res.status(401).json({
            msg: "Token no válido - usuario no existe DB",
            });
        }

        // Verificar si el uid tiene estado true
        if (!user.state) {
            return res.status(401).json({
            msg: "Token no válido - usuario con estado: false",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
};


module.exports = {
    JWTGenerator,
    JWTVerify
}