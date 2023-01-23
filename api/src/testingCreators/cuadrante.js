const { Cuadrante } = require('../db');

const createCuadrantes = () => {
    Cuadrante.create({ name: 'Forestal'});
    Cuadrante.create({ name: 'Macul'});
    Cuadrante.create({ name: 'Maipu Alta'});
    Cuadrante.create({ name: 'Maipu Baja'});
    Cuadrante.create({ name: 'Maipu'});
    Cuadrante.create({ name: 'Nocedal'});
    Cuadrante.create({ name: 'Cisterna'});
    Cuadrante.create({ name: 'Nocedal 2'});
};

module.exports = createCuadrantes;

