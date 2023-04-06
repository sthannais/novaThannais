const { InventarioValesDigitalesRegalados } = require('../../db');

const getInventarioValesRegalados = async (req, res) => {
    try {
        const inventarioValesDigitalesRegalados = await InventarioValesDigitalesRegalados.findAll();
        if (inventarioValesDigitalesRegalados.length > 0) {
            res.json(inventarioValesDigitalesRegalados);
        }
        else {
            res.status(404).json({ message: 'No hay inventario de vales regalados' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postInvetarioValesRegalados = async (req, res) => {
    const { digital5kg, digital11kg, digital15kg, digital45kg, totalValesDigitales } = req.body;

    try {
        const inventarioValesRegalados = await InventarioValesDigitalesRegalados.create({
            digital5kg,
            digital11kg,
            digital15kg,
            digital45kg,
            totalValesDigitales
        });
        res.json(inventarioValesRegalados);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const putInventarioValesRegalados = async (req, res) => {
    const { digital5kg, digital11kg, digital15kg, digital45kg, totalValesDigitales } = req.body;

    try {
        const inventario = await InventarioValesDigitalesRegalados.findByPk(1)
        const inventarioValesRegalados = await inventario.update({
            digital5kg,
            digital11kg,
            digital15kg,
            digital45kg,
            totalValesDigitales
        });
        res.json(inventarioValesRegalados);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getInventarioValesRegalados,
    postInvetarioValesRegalados,
    putInventarioValesRegalados
}
