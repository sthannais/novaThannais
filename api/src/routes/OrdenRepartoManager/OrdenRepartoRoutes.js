const Router = require('express');
const router = Router();
const { 
        getOrdenesDeReparto, 
        getOrdenDeRepartoById, 
        createOrden, 
        getOrdenDeRepartoByAdminIdAndDate,
        RechargeOrden,
        changeRecharge,
        finalizeOrden,
        cuadrarOrden,
        getAllChoferOrdenesDeRepartoBetweenDates,
        getAllAyudanteOrdenesDeRepartoBetweenDates,
        sendEmailWithCode,
        getAllOrdenesByDate,
        getAllOrdenesWhereEstadoFalseByDate,
        changeLlenos,
        desactiveRecarga
    } = require('./OrdenRepartoController');

router.get('/admin/:id/:date', getOrdenDeRepartoByAdminIdAndDate);
router.get('/', getOrdenesDeReparto);
router.get('/date/:date', getAllOrdenesByDate);
router.get('/date/estado/:date', getAllOrdenesWhereEstadoFalseByDate);
router.get('/:id', getOrdenDeRepartoById);
router.post('/', createOrden);
router.put('/:id', RechargeOrden);
router.put('/changeRecharge/:idOrden/:idRecarga', changeRecharge);
router.put('/changeLlenos/:idOrden', changeLlenos);
router.put('/finalize/:id', finalizeOrden);
router.put('/cuadrar/:id', cuadrarOrden);
router.put('/desactiveRecarga/:idOrden/:idRecarga', desactiveRecarga);
router.get('/chofer/:id/:fechaInicio/:fechaFin?', getAllChoferOrdenesDeRepartoBetweenDates);
router.get('/ayudante/:id/:fechaInicio/:fechaFin?', getAllAyudanteOrdenesDeRepartoBetweenDates);
router.post('/sendEmail', sendEmailWithCode);



module.exports = router;