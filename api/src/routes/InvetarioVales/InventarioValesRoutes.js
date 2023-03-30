const { Router } = require('express');
const router = Router();
const { getInventarioVales, 
        sumarInventarioVales, 
        modificarInventarioVales, 
        descargarVales,
        getRegistroVales,
        getAllValesByDate,
        getAllRegistroCambiosVales
    } = require('./InventarioValesController.js');

router.get('/', getInventarioVales);
router.get('/registro', getRegistroVales);
router.get('/vales/:date', getAllValesByDate);
router.get('/registroVales', getAllRegistroCambiosVales);
router.post('/descargar', descargarVales);
router.put('/modificar', modificarInventarioVales);
router.put('/:id', sumarInventarioVales);


module.exports = router;