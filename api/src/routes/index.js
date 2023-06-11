const { Router } = require("express");

const router = Router();
const choferRoutes = require("./ChoferManager/ChoferRoutes");
const adminRoutes = require("./AdminManager/AdminRoutes");
const auxiliarRoutes = require("./AuxiliarManager/AuxiliarRoutes");
const ayudanteRoutes = require("./AyudanteManager/AyudanteRoutes");
const personalRoutes = require("./PersonalManager/PersonalRoutes");
const authRoutes = require("./AuthManager/AuthRoutes");
const ordenRoutes = require("./OrdenRepartoManager/OrdenRepartoRoutes");
const patentesRoutes = require("./PatenteManager/PatenteRoutes");
const cuadranteRoutes = require("./CuadranteManager/CuadranteRoutes");
const metodoPagoRoutes = require("./MetodoPagos/MetodoPagosRoutes");
const listaDePreciosRoutes = require("./ListaDePreciosManager/ListaDePreciosRoutes");
const inventarioValesRoutes = require("./InvetarioVales/InventarioValesRoutes");
const inventarioValesRegaladosRoutes = require("./InventarioValesRegalados/InventarioValesRegaladosRoutes");
const preInventarioValesRoutes = require("./PreInventarioValesManager/PreInventarioValesRoutes");
const asistenteNovaRoutes = require("./AsistenteNova/AsistenteNovaRoutas");

router.use("/chofer", choferRoutes);
router.use("/admin", adminRoutes);
router.use("/auxiliar", auxiliarRoutes);
router.use("/ayudante", ayudanteRoutes);
router.use("/personal", personalRoutes);
router.use("/auth", authRoutes);
router.use("/orden", ordenRoutes);
router.use("/patente", patentesRoutes);
router.use("/cuadrante", cuadranteRoutes);
router.use("/metodoPago", metodoPagoRoutes);
router.use("/listaDePrecios", listaDePreciosRoutes);
router.use("/inventarioVales", inventarioValesRoutes);
router.use("/inventarioValesRegalados", inventarioValesRegaladosRoutes);
router.use("/preInventarioVales", preInventarioValesRoutes);
router.use("/asistenteNova", asistenteNovaRoutes);

module.exports = router;
