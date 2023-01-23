const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const {emailVerify} = require('../../helpers/DBValidators');
const {validateFields} = require('../../helpers/FieldValidators');

const { getPersonals,
        createPersonal, 
        getOnlyChofercWithFaltantesBetweenDates, 
        getOnlyAyudantesWithFaltantesBetweenDates,
        getAllFaltantesBetweenDates
    } = require('./PersonalController');

router.get('/', getPersonals);


router.get('/chofer/faltantes/:fechaInicio/:fechaFin?', getOnlyChofercWithFaltantesBetweenDates);

router.get('/ayudante/faltantes/:fechaInicio/:fechaFin?', getOnlyAyudantesWithFaltantesBetweenDates);

router.get('/faltantes/:administradorId/:fechaInicio/:fechaFin?', getAllFaltantesBetweenDates);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailVerify),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('rol', 'El rol no es válido').isIn(['Administrador', 'Auxiliar', 'Ayudante', 'Chofer']),
    validateFields
], createPersonal);


module.exports = router;