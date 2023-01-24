const { Precio } = require('../db');

function createPrecios() {
    Precio.create({ name: "GAS NORMAL 5 KILOS", precio: 11250 }); // 5kg
    Precio.create({ name: "GAS NORMAL 11 KILOS", precio: 17200 }); // 11kg
    Precio.create({ name: "GAS NORMAL 15 KILOS", precio: 23950 }); // 15kg
    Precio.create({ name: "GAS NORMAL 45 KILOS", precio: 71400 }); // 45kg
}

module.exports = createPrecios
