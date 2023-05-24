const {PreInventarioDctoRut, InventarioDctoRut, HistorialAceptacionDctoRut} = require('../../db');

const getInventarioDctoRut = async (req, res) => {
    try {
        const inventarioDctoRut = await InventarioDctoRut.findAll();
        if (inventarioDctoRut.length > 0) {
            res.json(inventarioDctoRut);
        }
        else {
            res.status(404).json({ message: 'No hay inventario de dcto rut' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPreInventarioDctoRut = async (req, res) => {
    try {
        const preInventarioDctoRut = await PreInventarioDctoRut.findAll();
        if (preInventarioDctoRut.length > 0) {
            res.json(preInventarioDctoRut);
        }
        else {
            res.status(404).json({ message: 'No hay preinventario de dcto rut' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHistorialAceptacionDctoRut = async (req, res) => {
    try {
        const historialAceptacionDctoRut = await HistorialAceptacionDctoRut.findAll();
        if (historialAceptacionDctoRut.length > 0) {
            res.json(historialAceptacionDctoRut);
        }
        else {
            res.status(404).json({ message: 'No hay historial de dcto rut' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postInventarioDctoRut = async (req, res) => {
    const {dctoRut5kg, dctoRut11kg, dctoRut15kg, dctoRut45kg, totalDctoRut} = req.body;

    try {
        const inventarioDctoRut = await InventarioDctoRut.create({
            dctoRut5kg,
            dctoRut11kg,
            dctoRut15kg,
            dctoRut45kg,
            totalDctoRut
        });
        res.json(inventarioDctoRut);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postPreInventarioDctoRut = async (req, res) => {
    const {fecha, dctoRut5kg, dctoRut11kg, dctoRut15kg, dctoRut45kg, totalDctoRut, comentario} = req.body;

    try {
        const preInventarioDctoRut = await PreInventarioDctoRut.create({
            fecha,
            dctoRut5kg,
            dctoRut11kg,
            dctoRut15kg,
            dctoRut45kg,
            totalDctoRut,
            comentario
        });
        res.json(preInventarioDctoRut);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postHistorialAceptacionDctoRut = async (req, res) => {
    const {fecha, hora, responsable } = req.body;

    try {
        const historialAceptacionDctoRut = await HistorialAceptacionDctoRut.create({
            fecha,
            hora,
            responsable,
        });
        res.json(historialAceptacionDctoRut);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putInventarioDctoRut = async (req, res) => {
    const { dctoRut5kg, dctoRut11kg, dctoRut15kg, dctoRut45kg, totalDctoRut } = req.body;

    try {
        const inventario = await InventarioDctoRut.findByPk(1)
        const inventarioDctoRut = await inventario.update({
            dctoRut5kg,
            dctoRut11kg,
            dctoRut15kg,
            dctoRut45kg,
            totalDctoRut
        });
        res.json(inventarioDctoRut);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putPreInventarioDctoRut = async (req, res) => {
    const { fecha, dctoRut5kg, dctoRut11kg, dctoRut15kg, dctoRut45kg, totalDctoRut, comentario } = req.body;

    try {
        const preInventario = await PreInventarioDctoRut.findByPk(1)
        const preInventarioDctoRut = await preInventario.update({
            fecha,
            dctoRut5kg,
            dctoRut11kg,
            dctoRut15kg,
            dctoRut45kg,
            totalDctoRut,
            comentario
        });
        res.json(preInventarioDctoRut);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putHistorialAceptacionDctoRut = async (req, res) => {
    const {fecha, hora, responsable } = req.body;

    try {
        const historialAceptacion = await HistorialAceptacionDctoRut.findByPk(1)
        const historialAceptacionDctoRut = await historialAceptacion.update({
            fecha,
            hora,
            responsable,
        });
        res.json(historialAceptacionDctoRut);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    getInventarioDctoRut,
    getPreInventarioDctoRut,
    getHistorialAceptacionDctoRut,
    postInventarioDctoRut,
    postPreInventarioDctoRut,
    postHistorialAceptacionDctoRut,
    putInventarioDctoRut,
    putPreInventarioDctoRut,
    putHistorialAceptacionDctoRut
}