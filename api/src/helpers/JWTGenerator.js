const JWT = require('jsonwebtoken');

const JWTGenerator = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
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

const JWTVerify = (token = '') => {
    try {
        const { id } = JWT.verify(token, process.env.JWT_SECRET);
        return [true, id];
    } catch (error) {
        return [false, null];
    }
};


module.exports = {
    JWTGenerator,
    JWTVerify
}