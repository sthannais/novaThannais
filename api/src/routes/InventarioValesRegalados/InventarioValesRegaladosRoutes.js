const { Router } = require('express');
const {
    getInventarioValesRegalados,
    postInvetarioValesRegalados,
    putInventarioValesRegalados
} = require('./InventarioValesRegaladosController');

const router = Router();

router.get('/', getInventarioValesRegalados);
router.post('/', postInvetarioValesRegalados);
router.put('/', putInventarioValesRegalados);

module.exports = router;