const { ListaDePrecios } = require('../db');

function createPrecios() {
    ListaDePrecios.create({ 
        name: "Lista de precios 1", 
        precio5kg: 11650,
        precio11kg: 17850,
        precio15kg: 24850,
        precio45kg: 74000,
        active: true
    });
}

module.exports = createPrecios
