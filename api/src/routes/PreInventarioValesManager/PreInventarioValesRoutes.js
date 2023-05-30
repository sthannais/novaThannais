const { Router } = require('express');
const router = Router();

const {
    getPreInventarioValesFisicos,
    getPreInventarioValesDigitales,
    getPreInventarioValesRegalados,
    finalizarPreInventarioValesDigitales,
    finalizarPreInventarioValesFisicos,
    finalizarPreInventarioValesRegalados,
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
router.put('/finalizar-pre-inventario-vales-fisicos/:id', finalizarPreInventarioValesFisicos);
router.put('/finalizar-pre-inventario-vales-digitales/:id', finalizarPreInventarioValesDigitales);
router.put('/finalizar-pre-inventario-vales-regalados/:id', finalizarPreInventarioValesRegalados);
router.put('/modificar-pre-inventario-vales-fisicos/:id', modificarPreInventarioValesFisicos);
router.put('/modificar-pre-inventario-vales-digitales/:id', modificarPreInventarioValesDigitales);
router.put('/modificar-pre-inventario-vales-regalados/:id', modificarPreInventarioValesRegalados);
router.put('/aceptar-pre-inventario-vales-fisicos/:id/:idResponsable', aceptarPreInventarioValesFisicos);
router.put('/aceptar-pre-inventario-vales-digitales/:id/:idResponsable', aceptarPreInventarioValesDigitales);
router.put('/aceptar-pre-inventario-vales-regalados/:id/:idResponsable', aceptarPreInventarioValesRegalados);

module.exports = router;