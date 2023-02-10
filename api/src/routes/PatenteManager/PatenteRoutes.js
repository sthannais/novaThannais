const Router = require('express');
const router = Router();
const { getPatentes, getAllPatentes, createPatente } = require('./PatenteController');

router.get('/', getPatentes);
router.get('/all', getAllPatentes);
router.post('/', createPatente);

module.exports = router;