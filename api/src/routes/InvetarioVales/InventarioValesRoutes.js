const { Router } = require('express');
const router = Router();
const { getInventarioVales, sumarInventarioVales, modificarInventarioVales } = require('./InventarioValesController.js');

router.get('/', getInventarioVales);
router.put('/modificar/:id', modificarInventarioVales);
router.put('/:id', sumarInventarioVales);


module.exports = router;