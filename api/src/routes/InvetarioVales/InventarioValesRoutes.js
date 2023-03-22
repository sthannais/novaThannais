const { Router } = require('express');
const router = Router();
const { getInventarioVales, 
        sumarInventarioVales, 
        modificarInventarioVales, 
        descargarVales,
        getRegistroVales,
        getAllValesByDate
    } = require('./InventarioValesController.js');

router.get('/', getInventarioVales);
router.get('/registro', getRegistroVales);
router.get('/vales/:date', getAllValesByDate);
router.post('/descargar', descargarVales);
router.put('/modificar/:id', modificarInventarioVales);
router.put('/:id', sumarInventarioVales);


module.exports = router;