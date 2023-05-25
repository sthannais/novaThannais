const { Router } = require('express');
const router = Router();

const {
    getPreInventarioValesFisicos,
    getPreInventarioValesDigitales,
    getPreInventarioValesRegalados,
    modificarPreInventarioValesDigitales,
    modificarPreInventarioValesFisicos,
    modificarPreInventarioValesRegalados,
    aceptarPreInventarioValesFisicos,
    aceptarPreInventarioValesDigitales,
    aceptarPreInventarioValesRegalados
} = require('./PreInventarioValesController');

router.get('/pre-inventario-vales-fisicos', getPreInventarioValesFisicos);
router.get('/pre-inventario-vales-digitales', getPreInventarioValesDigitales);
router.get('/pre-inventario-vales-regalados', getPreInventarioValesRegalados);
router.put('/modificar-pre-inventario-vales-fisicos/:id', modificarPreInventarioValesFisicos);
router.put('/modificar-pre-inventario-vales-digitales/:id', modificarPreInventarioValesDigitales);
router.put('/modificar-pre-inventario-vales-regalados/:id', modificarPreInventarioValesRegalados);
router.put('/aceptar-pre-inventario-vales-fisicos/:id', aceptarPreInventarioValesFisicos);
router.put('/aceptar-pre-inventario-vales-digitales/:id', aceptarPreInventarioValesDigitales);
router.put('/aceptar-pre-inventario-vales-regalados/:id', aceptarPreInventarioValesRegalados);

module.exports = router;