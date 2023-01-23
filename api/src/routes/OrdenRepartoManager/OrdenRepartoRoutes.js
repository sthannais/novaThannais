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
        sendEmailWithCode
    } = require('./OrdenRepartoController');

router.get('/admin/:id/:date', getOrdenDeRepartoByAdminIdAndDate);
router.get('/', getOrdenesDeReparto);
router.get('/:id', getOrdenDeRepartoById);
router.post('/', createOrden);
router.put('/:id', RechargeOrden);
router.put('/changeRecharge/:idOrden/:idRecarga', changeRecharge);
router.put('/finalize/:id', finalizeOrden);
router.put('/cuadrar/:id', cuadrarOrden);
router.get('/chofer/:id/:fechaInicio/:fechaFin?', getAllChoferOrdenesDeRepartoBetweenDates);
router.get('/ayudante/:id/:fechaInicio/:fechaFin?', getAllAyudanteOrdenesDeRepartoBetweenDates);
router.post('/sendEmail', sendEmailWithCode);


module.exports = router;