const { ListaDePrecios } = require('../db');

function createPrecios() {
    ListaDePrecios.create({ 
        name: "Lista 1ra semana febrero 2023", 
        precio5kg: 11650,
        precio11kg: 17600,
        precio15kg: 24500,
        precio45kg: 72950,
        active: true
    });
}

module.exports = createPrecios
