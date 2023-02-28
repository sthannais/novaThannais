
const { InventarioVales } = require('../../db.js');

const getInventarioVales = async (req, res) => {
    try { 
        const inventarioVales = await InventarioVales.findAll();
        res.json(inventarioVales);
    }
    catch (error) {
        console.log(error);
    }
};

const modificarInventarioVales = async (req, res) => {
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



module.exports = {
    getInventarioVales,
    sumarInventarioVales,
    modificarInventarioVales
}