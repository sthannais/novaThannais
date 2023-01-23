const { Precio } = require('../db');

function createPrecios() {
    Precio.create({ name: "GAS NORMAL 5 KILOS", precio: 11850 }); // 5kg
    Precio.create({ name: "GAS NORMAL 11 KILOS", precio: 18450 }); // 11kg
    Precio.create({ name: "GAS NORMAL 15 KILOS", precio: 25250 }); // 15kg
    Precio.create({ name: "GAS NORMAL 45 KILOS", precio: 74250 }); // 45kg
}

module.exports = createPrecios
