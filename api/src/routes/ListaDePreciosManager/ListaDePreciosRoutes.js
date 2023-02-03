const { Router } = require('express');
const router = Router();
const { getListaDePrecios, activeListaDePrecios, createListaDePrecios, getListaDePreciosActive } = require('./ListaDePreciosController.js');

router.get('/', getListaDePrecios);
router.get('/active', getListaDePreciosActive);
router.post('/', createListaDePrecios);
router.put('/:id', activeListaDePrecios);

module.exports = router;
