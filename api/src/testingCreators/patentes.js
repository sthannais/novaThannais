const { Patentes } = require('../db.js');

const createPatentes = () => {
    Patentes.create({ name: 'PFBP75'});
    Patentes.create({ name: 'KPXS37'});
    Patentes.create({ name: 'PJPR80'});
    Patentes.create({ name: 'PJFP78'});
    Patentes.create({ name: 'KZCW40'});
    Patentes.create({ name: 'LYJW70'});
    Patentes.create({ name: 'PJPP54'});
    Patentes.create({ name: 'PJHL84'});
    Patentes.create({ name: 'LZGB82'});
    Patentes.create({ name: 'LYHR97'});
    Patentes.create({ name: 'PBKB89'});
    Patentes.create({ name: 'PBKB90'});
};

module.exports = createPatentes