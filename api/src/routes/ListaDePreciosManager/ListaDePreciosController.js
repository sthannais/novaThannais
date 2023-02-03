const { ListaDePrecios } = require('../../db.js');

const getListaDePrecios = async (req, res) => {
    const listaDePrecios = await ListaDePrecios.findAll();
    res.json(listaDePrecios);
}

const createListaDePrecios = async (req, res) => {
    const { name, precio5kg, precio11kg, precio15kg, precio45kg } = req.body;
    const listaDePrecios = await ListaDePrecios.create({
        name,
        precio5kg,
        precio11kg,
        precio15kg,
        precio45kg
    });
    res.json(listaDePrecios);
}

const activeListaDePrecios = async (req, res) => {
    const { id } = req.params;

    const listaAnterior = await ListaDePrecios.findOne({
        where: { active: true }
    });
    await listaAnterior.update({ active: false });

    const listaDePrecios = await ListaDePrecios.findOne({
        where: { id }
    });
    await listaDePrecios.update({ active: true });
    res.json(listaDePrecios);
}

const getListaDePreciosActive = async (req, res) => {
    const listaDePrecios = await ListaDePrecios.findOne({
        where: { active: true }
    });
    res.json(listaDePrecios);
}


module.exports = {
    getListaDePrecios,
    createListaDePrecios,
    activeListaDePrecios,
    getListaDePreciosActive
}

