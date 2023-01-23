const { Precio } = require('../../db.js');

const getPrecios = async (req, res) => {
    const precios = await Precio.findAll();
    res.json(precios);
}

const putPrecios = async (req, res) => {
    const { 
        precio5kg,
        precio11kg,
        precio15kg,
        precio45kg,
    } = req.body;

    const precio5kgActual = await Precio.findOne({
        where: {
            name: 'GAS NORMAL 5 KILOS'
        },
    });

    const precio11kgActual = await Precio.findOne({
        where: {
            name: 'GAS NORMAL 11 KILOS'
        },
    });

    const precio15kgActual = await Precio.findOne({
        where: {
            name: 'GAS NORMAL 15 KILOS'
        },
    });

    const precio45kgActual = await Precio.findOne({
        where: {
            name: 'GAS NORMAL 45 KILOS'
        },
    });

    if (precio5kg > 1) await precio5kgActual.update({ precio: precio5kg });
    if (precio11kg > 1) await precio11kgActual.update({ precio: precio11kg });
    if (precio15kg > 1) await precio15kgActual.update({ precio: precio15kg });
    if (precio45kg > 1) await precio45kgActual.update({ precio: precio45kg });

    res.json({
        message: 'Precios actualizados correctamente'
    });

}

module.exports = {
    getPrecios,
    putPrecios
}

