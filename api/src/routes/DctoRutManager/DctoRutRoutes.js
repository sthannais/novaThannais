const { Router } = require('express');
const {
    getInventarioDctoRut,
    getPreInventarioDctoRut,
    getHistorialAceptacionDctoRut,
    postInventarioDctoRut,
    postPreInventarioDctoRut,
    postHistorialAceptacionDctoRut,
    putInventarioDctoRut,
    putPreInventarioDctoRut,
    putHistorialAceptacionDctoRut
} = require('./DctoRutController');

const router = Router();

router.get('/inventario', getInventarioDctoRut);
router.get('/preinventario', getPreInventarioDctoRut);
router.get('/historialAceptacion', getHistorialAceptacionDctoRut);
router.post('/inventario', postInventarioDctoRut);
router.post('/preinventario', postPreInventarioDctoRut);
router.post('/historialAceptacion', postHistorialAceptacionDctoRut);
router.put('/inventario', putInventarioDctoRut);
router.put('/preinventario', putPreInventarioDctoRut);
router.put('/historialAceptacion', putHistorialAceptacionDctoRut);

module.exports = router;