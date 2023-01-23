const { Router } = require('express');
const router = Router();
const { getPrecios, putPrecios } = require('./PreciosController.js');

router.get('/', getPrecios);
router.put('/', putPrecios);

module.exports = router;
