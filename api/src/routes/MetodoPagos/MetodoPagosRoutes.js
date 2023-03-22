const Router = require('express');
const router = Router();
const { updateAbono, getAllMetodoPagosInOrdenDeRepartoBetweenDates, getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates, getAllOrdenesEstructuradas } = require('./MetodoPagosController.js');

router.put('/:id', updateAbono);
router.get('/:date1/:date2?', getAllMetodoPagosInOrdenDeRepartoBetweenDates);
router.get('/administrador/:administradorId/:fechaInicio/:fechaFin?', getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates);
router.get('/ordenesEstructuradas/:date1/:date2?', getAllOrdenesEstructuradas);

module.exports = router;