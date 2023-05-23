const {
    PreInventarioDigitales,
    PreInventarioFisicos,
    PreInventarioRegalados,
    InventarioVales,
    InventarioValesDigitalesRegalados
} = require('../../db');

// Traigo los vales fisicos, digitales y regalados del pre inventario

const getPreInventarioValesFisicos = async (req, res) => {

    try {
        const preInventarioFisicos = await PreInventarioFisicos.findAll({
            where: {
                active: true
            },
            attributes: ['id', 'fecha', 'fisico5kg', 'fisico11kg', 'fisico15kg', 'fisico45kg', 'totalValesFisicos']
        });
        res.json(preInventarioFisicos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el pre inventario de vales fisicos" });
    }
}

const getPreInventarioValesDigitales = async (req, res) => {
    
    try {
        const preInventarioDigitales = await PreInventarioDigitales.findAll({
            where: {
                active: true
            },
            attributes: ['id', 'fecha', 'digital5kg', 'digital11kg', 'digital15kg', 'digital45kg', 'totalValesDigitales']
        });
        res.json(preInventarioDigitales);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el pre inventario de vales digitales" });
    }
}

const getPreInventarioValesRegalados = async (req, res) => {

    try {
        const preInventarioRegalados = await PreInventarioRegalados.findAll({
            where: {
                active: true
            },
            attributes: ['id', 'fecha', 'regalados5kg', 'regalados11kg', 'regalados15kg', 'regalados45kg', 'totalValesRegalados']
        });
        res.json(preInventarioRegalados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el pre inventario de vales regalados" });
    }
}

//funciones para modificar la cantidad de algun pre inventario de vales fisicos, digitales y regalados

const modificarPreInventarioValesFisicos = async (req, res, next) => {

    const { id } = req.params;

    const { fisico5kg, fisico11kg, fisico15kg, fisico45kg, comentario } = req.body;
    const totalValesFisicos = Number(fisico5kg) + Number(fisico11kg) + Number(fisico15kg) + Number(fisico45kg)

    try {
        const preInventarioFisicos = await PreInventarioFisicos.findByPk(id);

        await preInventarioFisicos.update({
            fisico5kg,
            fisico11kg,
            fisico15kg,
            fisico45kg,
            totalValesFisicos,
            comentario
        });

        res.json({ message: "Se modifico el pre inventario de vales fisicos" });
    } catch (error) {
        next(error);
    }
}

const modificarPreInventarioValesDigitales = async (req, res, next) => {

    const { id } = req.params;

    const { digital5kg, digital11kg, digital15kg, digital45kg, comentario } = req.body;
    const totalValesDigitales = Number(digital5kg) + Number(digital11kg) + Number(digital15kg) + Number(digital45kg)

    try {
        const preInventarioDigitales = await PreInventarioDigitales.findByPk(id);

        await preInventarioDigitales.update({
            digital5kg,
            digital11kg,
            digital15kg,
            digital45kg,
            totalValesDigitales,
            comentario
        });

        res.json({ message: "Se modifico el pre inventario de vales digitales" });

    } catch (error) {
        next(error);
    }
}

const modificarPreInventarioValesRegalados = async (req, res, next) => {

    const { id } = req.params;

    const { regalados5kg, regalados11kg, regalados15kg, regalados45kg, comentario } = req.body;
    const totalValesRegalados = Number(regalados5kg) + Number(regalados11kg) + Number(regalados15kg) + Number(regalados45kg)

    try {
        const preInventarioRegalados = await PreInventarioRegalados.findByPk(id);

        await preInventarioRegalados.update({
            regalados5kg,
            regalados11kg,
            regalados15kg,
            regalados45kg,
            totalValesRegalados,
            comentario
        });

        res.json({ message: "Se modifico el pre inventario de vales regalados" });

    } catch (error) {
        next(error);
    }
}
        


//funciones para aceptar y sumar los vales fisicos, digitales y regalados al inventario

const aceptarPreInventarioValesFisicos = async (req, res, next) => {

    const { id } = req.params;

    try {
        const preInventarioFisicos = await PreInventarioFisicos.findOne({
            where: {
                id
            }
        });

        const inventarioVales = await InventarioVales.findByPk(1);

        const fisico5kg = Number(preInventarioFisicos.fisico5kg);
        const fisico11kg = Number(preInventarioFisicos.fisico11kg);
        const fisico15kg = Number(preInventarioFisicos.fisico15kg);
        const fisico45kg = Number(preInventarioFisicos.fisico45kg);

        const totalValesFisicos = Number(preInventarioFisicos.totalValesFisicos);

        await inventarioVales.update({
            fisico5kg: Number(inventarioVales.fisico5kg) + fisico5kg,
            fisico11kg: Number(inventarioVales.fisico11kg) + fisico11kg,
            fisico15kg: Number(inventarioVales.fisico15kg) + fisico15kg,
            fisico45kg: Number(inventarioVales.fisico45kg) + fisico45kg,
            totalValesFisicos: Number(inventarioVales.totalValesFisicos) + totalValesFisicos,
            totalValesAmbos : Number(inventarioVales.totalValesAmbos) + totalValesFisicos
        });

        await preInventarioFisicos.update({
            active: false
        });

        res.json({ message: "Se acepto el pre inventario de vales fisicos" });
    } catch (error) {
        next(error);
    }
}

const aceptarPreInventarioValesDigitales = async (req, res, next) => {

    const { id } = req.params;

    try {
        const preInventarioDigitales = await PreInventarioDigitales.findOne({
            where: {
                id
            }
        });

        const inventarioVales = await InventarioVales.findByPk(1);

        const digital5kg = Number(preInventarioDigitales.digital5kg);
        const digital11kg = Number(preInventarioDigitales.digital11kg);
        const digital15kg = Number(preInventarioDigitales.digital15kg);
        const digital45kg = Number(preInventarioDigitales.digital45kg);

        const totalValesDigitales = Number(preInventarioDigitales.totalValesDigitales);

        await inventarioVales.update({
            digital5kg: Number(inventarioVales.digital5kg) + digital5kg,
            digital11kg: Number(inventarioVales.digital11kg) + digital11kg,
            digital15kg: Number(inventarioVales.digital15kg) + digital15kg,
            digital45kg: Number(inventarioVales.digital45kg) + digital45kg,
            totalValesDigitales: Number(inventarioVales.totalValesDigitales) + totalValesDigitales,
            totalValesAmbos : Number(inventarioVales.totalValesAmbos) + totalValesDigitales
        });

        await preInventarioDigitales.update({
            active: false
        });

        res.json({ message: "Se acepto el pre inventario de vales digitales" });
    } catch (error) {
        next(error)
    }
}

const aceptarPreInventarioValesRegalados = async (req, res, next) => {

    const { id } = req.params;

    try {
        const preInventarioRegalados = await PreInventarioRegalados.findOne({
            where: {
                id
            }
        });

        const inventarioValesDigitalesRegalados = await InventarioValesDigitalesRegalados.findByPk(1);
            
        const regalados5kg = Number(preInventarioRegalados.regalados5kg);
        const regalados11kg = Number(preInventarioRegalados.regalados11kg);
        const regalados15kg = Number(preInventarioRegalados.regalados15kg); 
        const regalados45kg = Number(preInventarioRegalados.regalados45kg);

        const totalValesRegalados = Number(preInventarioRegalados.totalValesRegalados);

        await inventarioValesDigitalesRegalados.update({
            digital5kg : Number(inventarioValesDigitalesRegalados.digital5kg) + regalados5kg,
            digital11kg : Number(inventarioValesDigitalesRegalados.digital11kg) + regalados11kg,
            digital15kg : Number(inventarioValesDigitalesRegalados.digital15kg) + regalados15kg,
            digital45kg : Number(inventarioValesDigitalesRegalados.digital45kg) + regalados45kg,
            totalValesDigitales : Number(inventarioValesDigitalesRegalados.totalValesDigitales) + totalValesRegalados
        });

        await preInventarioRegalados.update({
            active: false
        });

        res.json({ message: "Se acepto el pre inventario de vales regalados" });
    } catch (error) {
        next(error);
    }
}
        

module.exports = {
    getPreInventarioValesFisicos,
    getPreInventarioValesDigitales,
    getPreInventarioValesRegalados,
    modificarPreInventarioValesFisicos,
    modificarPreInventarioValesDigitales,
    modificarPreInventarioValesRegalados,
    aceptarPreInventarioValesFisicos,
    aceptarPreInventarioValesDigitales,
    aceptarPreInventarioValesRegalados,
    
}

