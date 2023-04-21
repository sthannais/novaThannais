const Router = require('express');
const router = Router();
const { updateAbono, 
        getAllMetodoPagosInOrdenDeRepartoBetweenDates, 
        getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates, 
        getAllOrdenesEstructuradas,
        getUltimosValesPorFecha,
        getUltimosValesDeAyer,
        getAllOrdenesByDatesToGetChoferAndPeonetasTotalTarros 
    } = require('./MetodoPagosController.js');

router.get('/tarrosChoferesYPeonetas/:date/:date2?', getAllOrdenesByDatesToGetChoferAndPeonetasTotalTarros);
router.get('/ultimosValesDeAyer', getUltimosValesDeAyer);
router.get('/ultimosVales/:date', getUltimosValesPorFecha);
router.put('/:id', updateAbono);
router.get('/:date1/:date2?', getAllMetodoPagosInOrdenDeRepartoBetweenDates);
router.get('/administrador/:administradorId/:fechaInicio/:fechaFin?', getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates);
router.get('/ordenesEstructuradas/:date1/:date2?', getAllOrdenesEstructuradas);




module.exports = router;