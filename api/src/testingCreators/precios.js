const { Precio } = require('../db');

function createPrecios() {
    Precio.create({ name: "GAS NORMAL 5 KILOS", precio: 11400 }); // 5kg
    Precio.create({ name: "GAS NORMAL 11 KILOS", precio: 17300 }); // 11kg
    Precio.create({ name: "GAS NORMAL 15 KILOS", precio: 24100 }); // 15kg
    Precio.create({ name: "GAS NORMAL 45 KILOS", precio: 71800 }); // 45kg
}

module.exports = createPrecios
