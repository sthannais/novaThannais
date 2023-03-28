
const { Model } = require('sequelize');
const { InventarioVales, RegistroVales, OrdenDeReparto, MetodoPagos, Vales, RegistroCambiosVales } = require('../../db.js');

//////////// GET ///////////////

const getInventarioVales = async (req, res) => {
    try { 
        const inventarioVales = await InventarioVales.findAll();
        res.json(inventarioVales);
    }
    catch (error) {
        console.log(error);
    }
};

const getRegistroVales = async (req, res) => {
    try {
        const registroVales = await RegistroVales.findAll();
        res.json(registroVales);
    }
    catch (error) {
        console.log(error);
    }
};

//////////// POST ///////////////

const descargarVales = async (req, res) => {
    const { 
            fecha,
            hora,
            numeroGuia,
            numeroFactura,
            nombreEntrega,
            nombreRecibe,
            vale5kgFisico,
            vale11kgFisico,
            vale15kgFisico,
            vale45kgFisico,
            vale5kgDigital,
            vale11kgDigital,
            vale15kgDigital,
            vale45kgDigital
    } = req.body;

    try {
        const inventario = await InventarioVales.findByPk(1);
        const registroVales = await RegistroVales.create({
            fecha,
            hora,
            numeroGuia,
            numeroFactura,
            nombreEntrega,
            nombreRecibe,
            vale5kgFisico,
            vale11kgFisico,
            vale15kgFisico,
            vale45kgFisico,
            vale5kgDigital,
            vale11kgDigital,
            vale15kgDigital,
            vale45kgDigital
        });

        const fisico5kgTotal = Number(inventario.fisico5kg) - Number(vale5kgFisico);
        const fisico11kgTotal = Number(inventario.fisico11kg) - Number(vale11kgFisico);
        const fisico15kgTotal = Number(inventario.fisico15kg) - Number(vale15kgFisico);
        const fisico45kgTotal = Number(inventario.fisico45kg) - Number(vale45kgFisico);
        const digital5kgTotal = Number(inventario.digital5kg) - Number(vale5kgDigital);
        const digital11kgTotal = Number(inventario.digital11kg) - Number(vale11kgDigital);
        const digital15kgTotal = Number(inventario.digital15kg) - Number(vale15kgDigital);
        const digital45kgTotal = Number(inventario.digital45kg) - Number(vale45kgDigital);

        const valeFisicos = fisico5kgTotal + fisico11kgTotal + fisico15kgTotal + fisico45kgTotal;
        const valeDigitales = digital5kgTotal + digital11kgTotal + digital15kgTotal + digital45kgTotal;
        const totalVales = valeFisicos + valeDigitales;

        const inventarioUpdated = await inventario.update({
            fisico5kg: fisico5kgTotal,
            fisico11kg: fisico11kgTotal,
            fisico15kg: fisico15kgTotal,
            fisico45kg: fisico45kgTotal,
            digital5kg: digital5kgTotal,
            digital11kg: digital11kgTotal,
            digital15kg: digital15kgTotal,
            digital45kg: digital45kgTotal,
            totalValesFisicos: valeFisicos,
            totalValesDigitales: valeDigitales,
            totalValesAmbos: totalVales
        });

        res.json({
            message: 'Vales descargados correctamente',
            registroVales,
            inventario: inventarioUpdated
        });
    } catch (error) {
        console.log(error);
    }
};

//////////// PUT ///////////////

const modificarInventarioVales = async (req, res) => {
    const { id } = req.params;
    const { 
            date,
            hora,
            fisico5kg,
            diferencia5kgFisico,
            comentario5kgFisico,
            fisico11kg,
            diferencia11kgFisico,
            comentario11kgFisico,
            fisico15kg,
            diferencia15kgFisico,
            comentario15kgFisico,
            fisico45kg,
            diferencia45kgFisico,
            comentario45kgFisico,
            digital5kg,
            diferencia5kgDigital,
            comentario5kgDigital,
            digital11kg,
            diferencia11kgDigital,
            comentario11kgDigital,
            digital15kg,
            diferencia15kgDigital,
            comentario15kgDigital,
            digital45kg,
            diferencia45kgDigital,
            comentario45kgDigital,
        } = req.body;

    try {
        const inventario = await InventarioVales.findByPk(id);
        await RegistroCambiosVales.create({
            fecha: date,
            hora,
            vale5kgFisicoAnterior: Number(inventario.fisico5kg),
            vale5kgFisicoActual: fisico5kg,
            diferencia5kgFisico: diferencia5kgFisico,
            comentario5kgFisico: comentario5kgFisico,
            vale11kgFisicoAnterior: Number(inventario.fisico11kg),
            vale11kgFisicoActual: fisico11kg,
            diferencia11kgFisico: diferencia11kgFisico,
            comentario11kgFisico: comentario11kgFisico,
            vale15kgFisicoAnterior: Number(inventario.fisico15kg),
            vale15kgFisicoActual: fisico15kg,
            diferencia15kgFisico: diferencia15kgFisico,
            comentario15kgFisico: comentario15kgFisico,
            vale45kgFisicoAnterior: Number(inventario.fisico45kg),
            vale45kgFisicoActual: fisico45kg,
            diferencia45kgFisico: diferencia45kgFisico,
            comentario45kgFisico: comentario45kgFisico,
            vale5kgDigitalAnterior: Number(inventario.digital5kg),
            vale5kgDigitalActual: digital5kg,
            diferencia5kgDigital: diferencia5kgDigital,
            comentario5kgDigital: comentario5kgDigital,
            vale11kgDigitalAnterior: Number(inventario.digital11kg),
            vale11kgDigitalActual: digital11kg,
            diferencia11kgDigital: diferencia11kgDigital,
            comentario11kgDigital: comentario11kgDigital,
            vale15kgDigitalAnterior: Number(inventario.digital15kg),
            vale15kgDigitalActual: digital15kg,
            diferencia15kgDigital: diferencia15kgDigital,
            comentario15kgDigital: comentario15kgDigital,
            vale45kgDigitalAnterior: Number(inventario.digital45kg),
            vale45kgDigitalActual: digital45kg,
            diferencia45kgDigital: diferencia45kgDigital,
            comentario45kgDigital: comentario45kgDigital,
        });

        const totalValesFisicos = Number(fisico5kg) + Number(fisico11kg) + Number(fisico15kg) + Number(fisico45kg);
        const totalValesDigitales = Number(digital5kg) + Number(digital11kg) + Number(digital15kg) + Number(digital45kg);
        const totalValesAmbos = totalValesFisicos + totalValesDigitales;

        const inventarioUpdated = await inventario.update({
            fisico5kg: Number(fisico5kg),
            fisico11kg: Number(fisico11kg),
            fisico15kg: Number(fisico15kg),
            fisico45kg: Number(fisico45kg),
            digital5kg: Number(digital5kg),
            digital11kg: Number(digital11kg),
            digital15kg: Number(digital15kg),
            digital45kg: Number(digital45kg),
            totalValesFisicos: totalValesFisicos,
            totalValesDigitales: totalValesDigitales,
            totalValesAmbos: totalValesAmbos
        }, {
            where: { id }
        });
        res.json({
            message: 'Inventario de vales modificado correctamente',
            inventario: inventarioUpdated
        });
    } catch (error) {
        console.log(error);
    }
};


const sumarInventarioVales = async (req, res) => {
    const { id } = req.params;
    const { fisico5kg, 
            fisico11kg,  
            fisico15kg, 
            fisico45kg, 
            digital5kg,  
            digital11kg, 
            digital15kg, 
            digital45kg, 
        } = req.body;

    try {
        const inventario = await InventarioVales.findByPk(id);
        
        const fisico5kgTotal = Number(fisico5kg) + Number(inventario.fisico5kg);
        const fisico11kgTotal = Number(fisico11kg) + Number(inventario.fisico11kg);
        const fisico15kgTotal = Number(fisico15kg) + Number(inventario.fisico15kg);
        const fisico45kgTotal = Number(fisico45kg) + Number(inventario.fisico45kg);
        const digital5kgTotal = Number(digital5kg) + Number(inventario.digital5kg);
        const digital11kgTotal = Number(digital11kg) + Number(inventario.digital11kg);
        const digital15kgTotal = Number(digital15kg) + Number(inventario.digital15kg);
        const digital45kgTotal = Number(digital45kg) + Number(inventario.digital45kg);
        
        const valeFisicos = fisico5kgTotal + fisico11kgTotal + fisico15kgTotal + fisico45kgTotal;
        const valeDigitales = digital5kgTotal + digital11kgTotal + digital15kgTotal + digital45kgTotal;
        const totalVales = valeFisicos + valeDigitales;

        const inventarioUpdated = await InventarioVales.update({
            fisico5kg: fisico5kgTotal,
            fisico11kg: fisico11kgTotal,
            fisico15kg: fisico15kgTotal,
            fisico45kg: fisico45kgTotal,
            digital5kg: digital5kgTotal,
            digital11kg: digital11kgTotal,
            digital15kg: digital15kgTotal,
            digital45kg: digital45kgTotal,
            totalValesFisicos: valeFisicos,
            totalValesDigitales: valeDigitales,
            totalValesAmbos: totalVales
        }, {
            where: { id }
        });
        res.json({
            message: 'Inventario de vales modificado correctamente',
            inventario: inventarioUpdated
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllValesByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const ordenes = await OrdenDeReparto.findAll({
            where: {
                fecha: date
            },
            include: [
                {
                    model: MetodoPagos,
                    include: [
                        {
                            model: Vales
                        }
                    ]
                }
            ]
        });

    } catch (error) {
        console.log(error);
    }
};
            
const getAllRegistroCambiosVales = async (req, res) => {
    try {
        const registroCambiosVales = await RegistroCambiosVales.findAll()
        res.json({
            registroCambiosVales
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getInventarioVales,
    sumarInventarioVales,
    modificarInventarioVales,
    descargarVales,
    getRegistroVales,
    getAllValesByDate,
    getAllRegistroCambiosVales
}