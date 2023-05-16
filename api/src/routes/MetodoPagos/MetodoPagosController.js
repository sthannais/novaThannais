const { 
    OrdenDeReparto, 
    Abonos,
    DescuentoRut,
    Descuentos,
    Efectivo,
    Transbank,
    Transferencias,
    Vales,
    Gastos,
    MetodoPagos,
    ContabilidadRecargas,
    ValesDigiRegalados,
    Chofer,
    Ayudante,
    Personal
    } = require('../../db.js');

const { Op } = require('sequelize');
const moment = require('moment');
const { createExcelBuffer } = require('../../helpers/excelCreate');

const updateAbono = async (req, res, next) => {
    const { id } = req.params;
    const { abono } = req.body;
    try {
        const orden = await OrdenDeReparto.findByPk(id);
        const metodoPago = await orden.getMetodoPagos();
        const abonos = await Abonos.findOne({
            where: {
                fk_MetodoPagosID: metodoPago[0].id
            }
        })

        await abonos.update({
            monto: abono + Number(abonos.monto)
        })
        
        res.json({
            message: 'Abono actualizado',
            data: abonos
        })
    } catch (error) {
        next(error);
    }
}

const getAllMetodoPagosInOrdenDeRepartoBetweenDates = async (req, res, next) => {
    const { date1, date2 } = req.params;
    try {

        let ordenes

        if( !date2 || date2 === 'undefined' || date2 === 'null' ) {

            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: date1
                }
            })
        } else {
            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: {
                        [Op.between]: [date1, date2]
                    }
                }
            })
        }

        const ordenesWithMetodoPagos = await Promise.all(ordenes.map(async (orden) => {
            const metodoPago = await orden.getMetodoPagos();
            
            const descuentoRut = await DescuentoRut.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const descuentos = await Descuentos.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const transbank = await Transbank.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const transferencias = await Transferencias.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })


            const sumaAbonos = await Abonos.sum('monto', {
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const contabilidadRecargas = await orden.getContabilidadRecarga();

            const efectivo = await Efectivo.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            const vales = await Vales.findOne({
                where: {
                    fk_MetodoPagosID: metodoPago[0].id
                }
            })

            return {
                sumaAbonos,
                contabilidadRecargas,
                efectivo,
                vales,
                descuentoRut,
                descuentos,
                transbank,
                transferencias,
            }
        }))

        const sumaSobrantes = ordenes.reduce((acc, curr) => {
            return Number(acc) + Number(curr.sobrante)
        }, 0)

        const sumaTotalAbonos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + curr.sumaAbonos
        }, 0)

        const sumaTotalRecargas = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                ventas5kg: Number(acc.ventas5kg) + Number(curr.contabilidadRecargas.ventas5kg),
                recaudacion5kg: Number(acc.recaudacion5kg) + Number(curr.contabilidadRecargas.recaudacion5kg),
                ventas11kg: Number(acc.ventas11kg) + Number(curr.contabilidadRecargas.ventas11kg),
                recaudacion11kg: Number(acc.recaudacion11kg) + Number(curr.contabilidadRecargas.recaudacion11kg),
                ventas15kg: Number(acc.ventas15kg) + Number(curr.contabilidadRecargas.ventas15kg),
                recaudacion15kg: Number(acc.recaudacion15kg) + Number(curr.contabilidadRecargas.recaudacion15kg),
                ventas45kg: Number(acc.ventas45kg) + Number(curr.contabilidadRecargas.ventas45kg),
                recaudacion45kg: Number(acc.recaudacion45kg) + Number(curr.contabilidadRecargas.recaudacion45kg),
                totalCantidad: Number(acc.totalCantidad) + Number(curr.contabilidadRecargas.totalCantidad),
                totalRecaudacion: Number(acc.totalRecaudacion) + Number(curr.contabilidadRecargas.totalRecaudacion),
            }
        }, {
            ventas5kg: 0,
            recaudacion5kg: 0,
            ventas11kg: 0,
            recaudacion11kg: 0,
            ventas15kg: 0,
            recaudacion15kg: 0,
            ventas45kg: 0,
            recaudacion45kg: 0,
            totalCantidad: 0,
            totalRecaudacion: 0
        })

        const sumaTotalEfectivo = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                totalBilletes20: Number(acc.totalBilletes20) + Number(curr.efectivo.totalBilletes20),
                totalBilletes10: Number(acc.totalBilletes10) + Number(curr.efectivo.totalBilletes10),
                totalBilletes5: Number(acc.totalBilletes5) + Number(curr.efectivo.totalBilletes5),
                totalBilletes2: Number(acc.totalBilletes2) + Number(curr.efectivo.totalBilletes2),
                totalBilletes1: Number(acc.totalBilletes1) + Number(curr.efectivo.totalBilletes1),
                monedas: Number(acc.monedas) + Number(curr.efectivo.monedas),
                totalGeneral: Number(acc.totalGeneral) + Number(curr.efectivo.totalGeneral),
            }
        }, {
            totalBilletes20: 0,
            totalBilletes10: 0,
            totalBilletes5: 0,
            totalBilletes2: 0,
            totalBilletes1: 0,
            monedas: 0,
            totalGeneral: 0
        })

        const sumaTotalVales = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return {
                fisico5kg: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg),
                digital5kg: Number(acc.digital5kg) + Number(curr.vales.digital5kg),
                totalCantidadFisicoYDigital5kg: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg) + Number(acc.digital5kg) + Number(curr.vales.digital5kg),
                sumaTotalDigitalYFisico5kg: Number(acc.sumaTotalDigitalYFisico5kg) + Number(curr.vales.sumaTotalDigitalYFisico5kg),
                fisico11kg: Number(acc.fisico11kg) + Number(curr.vales.fisico11kg),
                digital11kg: Number(acc.digital11kg) + Number(curr.vales.digital11kg),
                totalCantidadFisicoYDigital11kg: Number(acc.fisico11kg) + Number(curr.vales.fisico11kg) + Number(acc.digital11kg) + Number(curr.vales.digital11kg),
                sumaTotalDigitalYFisico11kg: Number(acc.sumaTotalDigitalYFisico11kg) + Number(curr.vales.sumaTotalDigitalYFisico11kg),
                fisico15kg: Number(acc.fisico15kg) + Number(curr.vales.fisico15kg),
                digital15kg: Number(acc.digital15kg) + Number(curr.vales.digital15kg),
                totalCantidadFisicoYDigital15kg: Number(acc.fisico15kg) + Number(curr.vales.fisico15kg) + Number(acc.digital15kg) + Number(curr.vales.digital15kg),
                sumaTotalDigitalYFisico15kg: Number(acc.sumaTotalDigitalYFisico15kg) + Number(curr.vales.sumaTotalDigitalYFisico15kg),
                fisico45kg: Number(acc.fisico45kg) + Number(curr.vales.fisico45kg),
                digital45kg: Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                totalCantidadFisicoYDigital45kg: Number(acc.fisico45kg) + Number(curr.vales.fisico45kg) + Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                sumaTotalDigitalYFisico45kg: Number(acc.sumaTotalDigitalYFisico45kg) + Number(curr.vales.sumaTotalDigitalYFisico45kg),
                totalFisico: Number(acc.fisico5kg) + Number(curr.vales.fisico5kg) + Number(acc.fisico11kg) + Number(curr.vales.fisico11kg) + Number(acc.fisico15kg) + Number(curr.vales.fisico15kg) + Number(acc.fisico45kg) + Number(curr.vales.fisico45kg),
                totalDigital: Number(acc.digital5kg) + Number(curr.vales.digital5kg) + Number(acc.digital11kg) + Number(curr.vales.digital11kg) + Number(acc.digital15kg) + Number(curr.vales.digital15kg) + Number(acc.digital45kg) + Number(curr.vales.digital45kg),
                totalVales: Number(acc.totalVales) + Number(curr.vales.totalVales),
                totalSumaVales: Number(acc.totalSumaVales) + Number(curr.vales.totalSumaVales)
            }
        }, {
            fisico5kg: 0,
            digital5kg: 0,
            totalCantidadFisicoYDigital5kg: 0,
            sumaTotalDigitalYFisico5kg: 0,
            fisico11kg: 0,
            digital11kg: 0,
            totalCantidadFisicoYDigital11kg: 0,
            sumaTotalDigitalYFisico11kg: 0,
            fisico15kg: 0,
            digital15kg: 0,
            totalCantidadFisicoYDigital15kg: 0,
            sumaTotalDigitalYFisico15kg: 0,
            fisico45kg: 0,
            digital45kg: 0,
            totalCantidadFisicoYDigital45kg: 0,
            sumaTotalDigitalYFisico45kg: 0,
            totalVales: 0,
            totalSumaVales: 0
        })

        const sumaTotalDescuentosRut = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.descuentoRut.monto)
        }, 0)

        const sumaTotalDescuentos = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.descuentos.monto)
        }, 0)

        const sumaTotalTransbank = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.transbank.monto)
        }, 0)

        const sumaTotalTransferencia = ordenesWithMetodoPagos.reduce((acc, curr) => {
            return acc + Number(curr.transferencias.monto)
        }, 0)

        //funcion para sumar todos los metodos de pago
        const sumaTotalDeTodo = 
        (
            sumaTotalAbonos +
            sumaTotalEfectivo.totalGeneral +
            sumaTotalVales.totalSumaVales +
            sumaTotalDescuentosRut +
            sumaTotalDescuentos +
            sumaTotalTransbank +
            sumaTotalTransferencia
        )

        res.json({
            message: 'Ordenes de reparto con metodo de pago',
            sumaAbonos: sumaTotalAbonos,
            ventaTotalTarros: sumaTotalRecargas,
            totalEfectivo: sumaTotalEfectivo,
            totalVales: sumaTotalVales,
            totalDescuentosRut: sumaTotalDescuentosRut,
            totalDescuentos: sumaTotalDescuentos,
            totalTransbank: sumaTotalTransbank,
            totalTransferencia: sumaTotalTransferencia,
            totalGeneral: sumaTotalDeTodo,
            sobrante: sumaSobrantes
        })

    } catch (error) {
        next(error);
    }
}

const getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates = async (req, res, next) => {
    const { fechaInicio, fechaFin, administradorId } = req.params;

    try {

        let ordenesDeReparto
        
        if(administradorId === 'all'){
            if(!fechaFin || fechaFin === 'undefined' || fechaFin === null){
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: fechaInicio,
                        rendida : true
                    },
                    include: [
                        { 
                            model: MetodoPagos, 
                            include: [
                                { model: DescuentoRut },
                                { model: Descuentos },
                                { model: Transbank },
                                { model: Transferencias },
                                { model: Abonos },
                                { model: Efectivo },
                                { model: Vales },
                                { model: ValesDigiRegalados },
                                { model: Gastos }
                            ]
                        },
                        { model: ContabilidadRecargas }
                    ],
                    order: [
                        ['fecha', 'DESC']
                    ]
                })
            }else{
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: {
                            [Op.between]: [fechaInicio, fechaFin]
                        },
                        rendida : true
                    },
                    include: [
                        { 
                            model: MetodoPagos, 
                            include: [
                                { model: DescuentoRut },
                                { model: Descuentos },
                                { model: Transbank },
                                { model: Transferencias },
                                { model: Abonos },
                                { model: Efectivo },
                                { model: Vales },
                                { model: ValesDigiRegalados },
                                { model: Gastos }
                            ]
                        },
                        { model: ContabilidadRecargas }
                    ],
                    order: [
                        ['fecha', 'DESC']
                    ]
                })
            }
        }else{
            if(!fechaFin || fechaFin === 'undefined' || fechaFin === null){
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: fechaInicio,
                        cuadradoPor: administradorId,
                        rendida : true
                    },
                    include: [
                        { 
                            model: MetodoPagos, 
                            include: [
                                { model: DescuentoRut },
                                { model: Descuentos },
                                { model: Transbank },
                                { model: Transferencias },
                                { model: Abonos },
                                { model: Efectivo },
                                { model: Vales },
                                { model: ValesDigiRegalados },
                                { model: Gastos }
                            ]
                        },
                        { model: ContabilidadRecargas }
                    ],
                    order: [
                        ['fecha', 'DESC']
                    ]
                })
            }else{
                ordenesDeReparto = await OrdenDeReparto.findAll({
                    where: {
                        fecha: {
                            [Op.between]: [fechaInicio, fechaFin]
                        },
                        cuadradoPor: administradorId,
                        rendida : true
                    },
                    include: [
                        { 
                            model: MetodoPagos, 
                            include: [
                                { model: DescuentoRut },
                                { model: Descuentos },
                                { model: Transbank },
                                { model: Transferencias },
                                { model: Abonos },
                                { model: Efectivo },
                                { model: Vales },
                                { model: ValesDigiRegalados },
                                { model: Gastos }
                            ]
                        },
                        { model: ContabilidadRecargas }
                    ],
                    order: [
                        ['fecha', 'DESC']
                    ]
                })
            }
        }
        
        const sumaAbonos = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.metodoPagos[0].abono.monto)
        }, 0)

        const sumaTotalRecargas = ordenesDeReparto.reduce((acc, curr) => {
            return {
                ventas5kg: Number(acc.ventas5kg) + Number(curr.contabilidadRecarga.ventas5kg),
                recaudacion5kg: Number(acc.recaudacion5kg) + Number(curr.contabilidadRecarga.recaudacion5kg),
                ventas11kg: Number(acc.ventas11kg) + Number(curr.contabilidadRecarga.ventas11kg),
                recaudacion11kg: Number(acc.recaudacion11kg) + Number(curr.contabilidadRecarga.recaudacion11kg),
                ventas15kg: Number(acc.ventas15kg) + Number(curr.contabilidadRecarga.ventas15kg),
                recaudacion15kg: Number(acc.recaudacion15kg) + Number(curr.contabilidadRecarga.recaudacion15kg),
                ventas45kg: Number(acc.ventas45kg) + Number(curr.contabilidadRecarga.ventas45kg),
                recaudacion45kg: Number(acc.recaudacion45kg) + Number(curr.contabilidadRecarga.recaudacion45kg),
                totalCantidad: Number(acc.totalCantidad) + Number(curr.contabilidadRecarga.totalCantidad),
                totalRecaudacion: Number(acc.totalRecaudacion) + Number(curr.contabilidadRecarga.totalRecaudacion),
            }
        },{
            ventas5kg: 0,
            recaudacion5kg: 0,
            ventas11kg: 0,
            recaudacion11kg: 0,
            ventas15kg: 0,
            recaudacion15kg: 0,
            ventas45kg: 0,
            recaudacion45kg: 0,
            totalCantidad: 0,
            totalRecaudacion: 0
        })

        const sumaTotalEfectivo = ordenesDeReparto.reduce((acc, curr) => {
            return {
                totalBilletes20: Number(acc.totalBilletes20) + Number(curr.metodoPagos[0].efectivo.totalBilletes20),
                totalBilletes10: Number(acc.totalBilletes10) + Number(curr.metodoPagos[0].efectivo.totalBilletes10),
                totalBilletes5: Number(acc.totalBilletes5) + Number(curr.metodoPagos[0].efectivo.totalBilletes5),
                totalBilletes2: Number(acc.totalBilletes2) + Number(curr.metodoPagos[0].efectivo.totalBilletes2),
                totalBilletes1: Number(acc.totalBilletes1) + Number(curr.metodoPagos[0].efectivo.totalBilletes1),
                monedas: Number(acc.monedas) + Number(curr.metodoPagos[0].efectivo.monedas),
                totalGeneral: Number(acc.totalGeneral) + Number(curr.metodoPagos[0].efectivo.totalGeneral),
            }
        }, {
            totalBilletes20: 0,
            totalBilletes10: 0,
            totalBilletes5: 0,
            totalBilletes2: 0,
            totalBilletes1: 0,
            monedas: 0,
            totalGeneral: 0
        })

        const sumaTotalVales = ordenesDeReparto.reduce((acc, curr) => {
            return {
                fisico5kg: Number(acc.fisico5kg) + Number(curr.metodoPagos[0].vale.fisico5kg),
                digital5kg: Number(acc.digital5kg) + Number(curr.metodoPagos[0].vale.digital5kg),
                totalCantidadFisicoYDigital5kg: Number(acc.fisico5kg) + Number(curr.metodoPagos[0].vale.fisico5kg) + Number(acc.digital5kg) + Number(curr.metodoPagos[0].vale.digital5kg),
                sumaTotalDigitalYFisico5kg: Number(acc.sumaTotalDigitalYFisico5kg) + Number(curr.metodoPagos[0].vale.sumaTotalDigitalYFisico5kg),
                fisico11kg: Number(acc.fisico11kg) + Number(curr.metodoPagos[0].vale.fisico11kg),
                digital11kg: Number(acc.digital11kg) + Number(curr.metodoPagos[0].vale.digital11kg),
                totalCantidadFisicoYDigital11kg: Number(acc.fisico11kg) + Number(curr.metodoPagos[0].vale.fisico11kg) + Number(acc.digital11kg) + Number(curr.metodoPagos[0].vale.digital11kg),
                sumaTotalDigitalYFisico11kg: Number(acc.sumaTotalDigitalYFisico11kg) + Number(curr.metodoPagos[0].vale.sumaTotalDigitalYFisico11kg),
                fisico15kg: Number(acc.fisico15kg) + Number(curr.metodoPagos[0].vale.fisico15kg),
                digital15kg: Number(acc.digital15kg) + Number(curr.metodoPagos[0].vale.digital15kg),
                totalCantidadFisicoYDigital15kg: Number(acc.fisico15kg) + Number(curr.metodoPagos[0].vale.fisico15kg) + Number(acc.digital15kg) + Number(curr.metodoPagos[0].vale.digital15kg),
                sumaTotalDigitalYFisico15kg: Number(acc.sumaTotalDigitalYFisico15kg) + Number(curr.metodoPagos[0].vale.sumaTotalDigitalYFisico15kg),
                fisico45kg: Number(acc.fisico45kg) + Number(curr.metodoPagos[0].vale.fisico45kg),
                digital45kg: Number(acc.digital45kg) + Number(curr.metodoPagos[0].vale.digital45kg),
                totalCantidadFisicoYDigital45kg: Number(acc.fisico45kg) + Number(curr.metodoPagos[0].vale.fisico45kg) + Number(acc.digital45kg) + Number(curr.metodoPagos[0].vale.digital45kg),
                sumaTotalDigitalYFisico45kg: Number(acc.sumaTotalDigitalYFisico45kg) + Number(curr.metodoPagos[0].vale.sumaTotalDigitalYFisico45kg),
                totalFisico: Number(acc.fisico5kg) + Number(curr.metodoPagos[0].vale.fisico5kg) + Number(acc.fisico11kg) + Number(curr.metodoPagos[0].vale.fisico11kg) + Number(acc.fisico15kg) + Number(curr.metodoPagos[0].vale.fisico15kg) + Number(acc.fisico45kg) + Number(curr.metodoPagos[0].vale.fisico45kg),
                totalDigital: Number(acc.digital5kg) + Number(curr.metodoPagos[0].vale.digital5kg) + Number(acc.digital11kg) + Number(curr.metodoPagos[0].vale.digital11kg) + Number(acc.digital15kg) + Number(curr.metodoPagos[0].vale.digital15kg) + Number(acc.digital45kg) + Number(curr.metodoPagos[0].vale.digital45kg),
                totalVales: Number(acc.totalVales) + Number(curr.metodoPagos[0].vale.totalVales),
                totalSumaVales: Number(acc.totalSumaVales) + Number(curr.metodoPagos[0].vale.totalSumaVales)
            }
        }, {
            fisico5kg: 0,
            digital5kg: 0,
            totalCantidadFisicoYDigital5kg: 0,
            sumaTotalDigitalYFisico5kg: 0,
            fisico11kg: 0,
            digital11kg: 0,
            totalCantidadFisicoYDigital11kg: 0,
            sumaTotalDigitalYFisico11kg: 0,
            fisico15kg: 0,
            digital15kg: 0,
            totalCantidadFisicoYDigital15kg: 0,
            sumaTotalDigitalYFisico15kg: 0,
            fisico45kg: 0,
            digital45kg: 0,
            totalCantidadFisicoYDigital45kg: 0,
            sumaTotalDigitalYFisico45kg: 0,
            totalVales: 0,
            totalSumaVales: 0
        })

        const sumaTotalValesRegalados = ordenesDeReparto.reduce((acc, curr) => {

            const valesRegalados5kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.digital5kg
            const totalMontoVales5kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.totalDigital5kg
            const valesRegalados11kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.digital11kg
            const totalMontoVales11kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.totalDigital11kg
            const valesRegalados15kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.digital15kg
            const totalMontoVales15kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.totalDigital15kg
            const valesRegalados45kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.digital45kg
            const totalMontoVales45kg = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado?.totalDigital45kg
            const totalValesDigitales = curr.metodoPagos[0]?.valesDigiRegalado === null ? 0 : curr.metodoPagos[0]?.valesDigiRegalado.totalValesDigitales

            return {
                digital5kg: Number(acc.digital5kg) + Number(valesRegalados5kg),
                totalDigital5kg: Number(acc.totalDigital5kg) + Number(totalMontoVales5kg),
                digital11kg: Number(acc.digital11kg) + Number(valesRegalados11kg),
                totalDigital11kg: Number(acc.totalDigital11kg) + Number(totalMontoVales11kg),
                digital15kg: Number(acc.digital15kg) + Number(valesRegalados15kg),
                totalDigital15kg: Number(acc.totalDigital15kg) + Number(totalMontoVales15kg),
                digital45kg: Number(acc.digital45kg) + Number(valesRegalados45kg),
                totalDigital45kg: Number(acc.totalDigital45kg) + Number(totalMontoVales45kg),
                totalDigital: Number(acc.digital5kg) + Number(valesRegalados5kg) + Number(acc.digital11kg) + Number(valesRegalados11kg) + Number(acc.digital15kg) + Number(valesRegalados15kg) + Number(acc.digital45kg) + Number(valesRegalados45kg),
                totalSumaValesRegalados: Number(acc.totalSumaValesRegalados) + Number(totalValesDigitales)
            }
        }, {
            digital5kg: 0,
            totalDigital5kg: 0,
            digital11kg: 0,
            totalDigital11kg: 0,
            digital15kg: 0,
            totalDigital15kg: 0,
            digital45kg: 0,
            totalDigital45kg: 0,
            totalDigital: 0,
            totalSumaValesRegalados: 0
        })
        
        const sumaTotalDescuentosRut = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.metodoPagos[0]?.descuentoRut?.monto)
        }, 0)

        const sumaTotalDescuentos = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.metodoPagos[0]?.descuento?.monto)
        }, 0)

        const sumaTotalTransbank = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.metodoPagos[0]?.transbank?.monto)
        }, 0)

        const sumaTotalTransferencia = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.metodoPagos[0]?.transferencia?.monto)
        }, 0)

        const sumaGastos = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.metodoPagos[0]?.gasto?.monto)
        }, 0)

        const sumaTotalSobrante = ordenesDeReparto.reduce((acc, curr) => {
            return acc + Number(curr.sobrante)
        }, 0)

        const sumaTotalDeTodo = 
        (
            sumaAbonos +
            sumaTotalEfectivo.totalGeneral +
            sumaTotalVales.totalSumaVales +
            sumaTotalDescuentosRut +
            sumaTotalDescuentos +
            sumaTotalTransbank +
            sumaTotalTransferencia +
            sumaGastos 
        )

        res.json({
            abonos: sumaAbonos,
            ventaTotalTarros: sumaTotalRecargas,
            totalEfectivo: sumaTotalEfectivo,
            totalVales: sumaTotalVales,
            totalValesRegalados: sumaTotalValesRegalados,
            totalDescuentosRut: sumaTotalDescuentosRut,
            totalDescuentos: sumaTotalDescuentos,
            totalTransbank: sumaTotalTransbank,
            totalTransferencia: sumaTotalTransferencia,
            totalGeneral: sumaTotalDeTodo,
            sobrante: sumaTotalSobrante,
            gastos: sumaGastos
        })

    } catch (error) {
        next(error);
    }
}

const getAllOrdenesEstructuradas = async (req, res, next) => {
    const { date1, date2 } = req.params;

    try {

        let ordenes

        if( !date2 || date2 === 'undefined' || date2 === 'null' ) {

            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: date1,
                    rendida: true
                },
                include: [
                    {
                        model: MetodoPagos,
                        include: [
                            {
                                model: Abonos,
                            },
                            {
                                model: DescuentoRut,
                            },
                            {
                                model: Descuentos,
                            },
                            {
                                model: Vales,
                            },
                            {
                                model: ValesDigiRegalados
                            },
                            {
                                model: Efectivo,
                            },
                            {
                                model: Transferencias,
                            },
                            {
                                model: Transbank,
                            },
                            {
                                model: Gastos,
                            }
                        ]
                    },
                    {
                        model: ContabilidadRecargas,
                    },
                    {
                        model: Chofer,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    },
                    {
                        model: Ayudante,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    }    
                    
                ],
                order: [
                    ['fecha', 'ASC'],
                ]
            })
        } else {
            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: {
                        [Op.between]: [date1, date2]
                    },
                    rendida: true
                },
                include: [
                    {
                        model: MetodoPagos,
                        include: [
                            {
                                model: Abonos,
                            },
                            {
                                model: DescuentoRut,
                            },
                            {
                                model: Descuentos,
                            },
                            {
                                model: Vales,
                            },
                            {
                                model: ValesDigiRegalados
                            },
                            {
                                model: Efectivo,
                            },
                            {
                                model: Transferencias,
                            },
                            {
                                model: Transbank,
                            },
                            {
                                model: Gastos,
                            }
                        ]
                    },
                    {
                        model: ContabilidadRecargas
                    },
                    {
                        model: Chofer,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    },
                    {
                        model: Ayudante,
                        include: [
                            {
                                model: Personal
                            }
                        ]
                    }         
                ],
                order: [
                    ['fecha', 'ASC'],
                ]
            })
        }

        // respondo con solo las fechas, los metodos de pago y los vales
        const ordenesWithMetodoPagos = ordenes.map(orden => {
            return {
                fecha: orden.fecha,
                chofer: orden.chofer.personal.name + ' ' + orden.chofer.personal.lastname,
                peoneta: orden.ayudante ? orden.ayudante.personal.name + ' ' + orden.ayudante.personal.lastname : 'Sin peoneta',
                sumaAnticipos: Number(orden.faltanteChofer) + Number(orden.faltantePeoneta),
                ventas5kg: Number(orden.contabilidadRecarga.ventas5kg),
                ventas11kg: Number(orden.contabilidadRecarga.ventas11kg),
                ventas15kg: Number(orden.contabilidadRecarga.ventas15kg),
                ventas45kg: Number(orden.contabilidadRecarga.ventas45kg),
                totalRecaudacion: Number(orden.contabilidadRecarga.totalRecaudacion),
                cantidadVale5kgFisico: Number(orden.metodoPagos[0].vale.fisico5kg),
                valorValefisico5kg: Number(orden.metodoPagos[0].vale.totalFisico5kg),
                cantidadVale11kgFisico: Number(orden.metodoPagos[0].vale.fisico11kg),
                valorValefisico11kg: Number(orden.metodoPagos[0].vale.totalFisico11kg),
                cantidadVale15kgFisico: Number(orden.metodoPagos[0].vale.fisico15kg),
                valorValefisico15kg: Number(orden.metodoPagos[0].vale.totalFisico15kg),
                cantidadVale45kgFisico: Number(orden.metodoPagos[0].vale.fisico45kg),
                valorValefisico45kg: Number(orden.metodoPagos[0].vale.totalFisico45kg),
                cantidadVale5kgDigital: Number(orden.metodoPagos[0].vale.digital5kg),
                valorValedigital5kg: Number(orden.metodoPagos[0].vale.totalDigital5kg),
                cantidadVale11kgDigital: Number(orden.metodoPagos[0].vale.digital11kg),
                valorValedigital11kg: Number(orden.metodoPagos[0].vale.totalDigital11kg),
                cantidadVale15kgDigital: Number(orden.metodoPagos[0].vale.digital15kg),
                valorValedigital15kg: Number(orden.metodoPagos[0].vale.totalDigital15kg),
                cantidadVale45kgDigital: Number(orden.metodoPagos[0].vale.digital45kg),
                valorValedigital45kg: Number(orden.metodoPagos[0].vale.totalDigital45kg),
                cantidadValesRegalados5kg: Number(orden.metodoPagos[0].valesDigiRegalado?.digital5kg),
                valorValesRegalados5kg: Number(orden.metodoPagos[0].valesDigiRegalado?.totalDigital5kg),
                cantidadValesRegalados11kg: Number(orden.metodoPagos[0].valesDigiRegalado?.digital11kg),
                valorValesRegalados11kg: Number(orden.metodoPagos[0].valesDigiRegalado?.totalDigital11kg),
                cantidadValesRegalados15kg: Number(orden.metodoPagos[0].valesDigiRegalado?.digital15kg),
                valorValesRegalados15kg: Number(orden.metodoPagos[0].valesDigiRegalado?.totalDigital15kg),
                cantidadValesRegalados45kg: Number(orden.metodoPagos[0].valesDigiRegalado?.digital45kg),
                valorValesRegalados45kg: Number(orden.metodoPagos[0].valesDigiRegalado?.totalDigital45kg),
                totalValesDigiRegalados: Number(orden.metodoPagos[0].valesDigiRegalado?.totalValesDigitales),
                totalSuma: Number(orden.metodoPagos[0].vale.totalSumaVales),
                efectivo: Number(orden.metodoPagos[0].efectivo.totalGeneral),
                transferencias: Number(orden.metodoPagos[0].transferencia.monto),
                transbank: Number(orden.metodoPagos[0].transbank.monto),
                descuentoRut: Number(orden.metodoPagos[0].descuentoRut.monto),
                descuentos: Number(orden.metodoPagos[0].descuento.monto),
                gastos: Number(orden.metodoPagos[0].gasto.monto),
                sobrante: Number(orden.sobrante),
                faltante: Number(orden.faltante),
            }
        })

        const excelBuffer = await createExcelBuffer(ordenesWithMetodoPagos);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'ordenes.xlsx');
        res.send(excelBuffer);

    }
        catch (error) {
        next(error);
        }
    };

const getUltimosValesPorFecha = async (req, res, next) => {
    const { date } = req.params;
    
    try {
        const vales = await OrdenDeReparto.findAll({
            where: {
                fecha: date,
                rendida: true
            },
            include: [
                {
                    model: MetodoPagos,
                    include: [
                        {
                            model: Vales,
                        },
                        {
                            model: ValesDigiRegalados
                        }
                    ]
                }
            ]
        })

        if(vales) {
            const valesOrdenados = vales.map(vale => {
                return {
                    fisico5kg: vale.metodoPagos[0].vale.fisico5kg,
                    fisico11kg: vale.metodoPagos[0].vale.fisico11kg,
                    fisico15kg: vale.metodoPagos[0].vale.fisico15kg,
                    fisico45kg: vale.metodoPagos[0].vale.fisico45kg,
                    digital5kg: vale.metodoPagos[0].vale.digital5kg,
                    digital11kg: vale.metodoPagos[0].vale.digital11kg,
                    digital15kg: vale.metodoPagos[0].vale.digital15kg,
                    digital45kg: vale.metodoPagos[0].vale.digital45kg,
                    digitalRegalado5kg: vale.metodoPagos[0].valesDigiRegalado.digital5kg,
                    digitalRegalado11kg: vale.metodoPagos[0].valesDigiRegalado.digital11kg,
                    digitalRegalado15kg: vale.metodoPagos[0].valesDigiRegalado.digital15kg,
                    digitalRegalado45kg: vale.metodoPagos[0].valesDigiRegalado.digital45kg
                }
            })

            //sumo todos los vales de cada tipo
            const sumaVales = valesOrdenados.reduce((acumulador, valorActual) => {
                return {
                    fisico5kg: Number(acumulador.fisico5kg) + Number(valorActual.fisico5kg),
                    fisico11kg: Number(acumulador.fisico11kg) + Number(valorActual.fisico11kg),
                    fisico15kg: Number(acumulador.fisico15kg) + Number(valorActual.fisico15kg),
                    fisico45kg: Number(acumulador.fisico45kg) + Number(valorActual.fisico45kg),
                    digital5kg: Number(acumulador.digital5kg) + Number(valorActual.digital5kg),
                    digital11kg: Number(acumulador.digital11kg) + Number(valorActual.digital11kg),
                    digital15kg: Number(acumulador.digital15kg) + Number(valorActual.digital15kg),
                    digital45kg: Number(acumulador.digital45kg) + Number(valorActual.digital45kg),
                    digitalRegalado5kg: Number(acumulador.digitalRegalado5kg) + Number(valorActual.digitalRegalado5kg),
                    digitalRegalado11kg: Number(acumulador.digitalRegalado11kg) + Number(valorActual.digitalRegalado11kg),
                    digitalRegalado15kg: Number(acumulador.digitalRegalado15kg) + Number(valorActual.digitalRegalado15kg),
                    digitalRegalado45kg: Number(acumulador.digitalRegalado45kg) + Number(valorActual.digitalRegalado45kg)
                }
            })

            res.json({
                fecha: date,
                vales: sumaVales
            })
        } else {
            res.json({
                message: 'No hay vales para esa fecha'
            })
        }

    } catch (error) {
        res.json({
            message: 'Todavia no hay vales en esta fecha',
            error: error
        })
    }
};

const getUltimosValesDeAyer = async (req, res, next) => {
    
    const fechaDeAyer = moment().subtract(1, 'days').format('YYYY-MM-DD');

    try {
        const vales = await OrdenDeReparto.findAll({
            where: {
                fecha: fechaDeAyer,
                rendida: true
            },
            include: [
                {
                    model: MetodoPagos,
                    include: [
                        {
                            model: Vales,
                        }
                    ]
                }
            ]
        })

        if(vales) {
            const valesOrdenados = vales.map(vale => {
                return {
                    fisico5kg: vale.metodoPagos[0].vale.fisico5kg,
                    fisico11kg: vale.metodoPagos[0].vale.fisico11kg,
                    fisico15kg: vale.metodoPagos[0].vale.fisico15kg,
                    fisico45kg: vale.metodoPagos[0].vale.fisico45kg,
                    digital5kg: vale.metodoPagos[0].vale.digital5kg,
                    digital11kg: vale.metodoPagos[0].vale.digital11kg,
                    digital15kg: vale.metodoPagos[0].vale.digital15kg,
                    digital45kg: vale.metodoPagos[0].vale.digital45kg,
                }
            })

            //sumo todos los vales de cada tipo
            const sumaVales = valesOrdenados.reduce((acumulador, valorActual) => {
                return {
                    fisico5kg: Number(acumulador.fisico5kg) + Number(valorActual.fisico5kg),
                    fisico11kg: Number(acumulador.fisico11kg) + Number(valorActual.fisico11kg),
                    fisico15kg: Number(acumulador.fisico15kg) + Number(valorActual.fisico15kg),
                    fisico45kg: Number(acumulador.fisico45kg) + Number(valorActual.fisico45kg),
                    digital5kg: Number(acumulador.digital5kg) + Number(valorActual.digital5kg),
                    digital11kg: Number(acumulador.digital11kg) + Number(valorActual.digital11kg),
                    digital15kg: Number(acumulador.digital15kg) + Number(valorActual.digital15kg),
                    digital45kg: Number(acumulador.digital45kg) + Number(valorActual.digital45kg),
                }
            })

            res.json({
                fecha: fechaDeAyer,
                vales: sumaVales
            })
        } else {
            res.json({
                message: 'No hay vales para esa fecha'
            })
        }

    } catch (error) {
        res.json({
            message: 'Todavia no hay vales en esta fecha',
            error: error
        })
    }
};
        
const getAllOrdenesByDatesToGetChoferAndPeonetasTotalTarros = async (req, res, next) => {
    const { date, date2 } = req.params;

    try {
        let ordenes 

        if( !date2 || date2 === 'undefined' || date2 === 'null' ) {
            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: date
                },
                include: [
                    { model: ContabilidadRecargas },
                    { model: Chofer,
                        include: [
                            { model: Personal }
                        ]
                    },
                    { model: Ayudante,
                        include: [
                            { model: Personal }
                        ]
                    }
                ]
            })
        } else {
            ordenes = await OrdenDeReparto.findAll({
                where: {
                    fecha: {
                        [Op.between]: [date, date2]
                    }
                },
                include: [
                    { model: ContabilidadRecargas },
                    { model: Chofer,
                        include: [
                            { model: Personal }
                        ]
                    },
                    { model: Ayudante,
                        include: [
                            { model: Personal }
                        ]
                    }
                ]
            })
        }

        if(ordenes) {
            //Choferes y Peonetas sin repetir
            const choferes = [...new Set(ordenes.map(orden => orden.chofer === null ? null : orden.chofer.id))].filter(chofer => chofer !== null)
            const peonetas = [...new Set(ordenes.map(orden => orden?.ayudante === null ? null : orden?.ayudante?.id))].filter(peoneta => peoneta !== null)

            //Choferes y Peonetas con total de tarros
            const choferesConTotalTarros = choferes.map(chofer => {
                const totalTarros = ordenes.reduce((acumulador, valorActual) => {
                    if(valorActual.chofer?.id === chofer) {
                        return acumulador + Number(valorActual?.contabilidadRecarga?.totalCantidad)
                    } else {
                        return acumulador
                    }
                }, 0)
                return {
                    rol: "Chofer",
                    nombre: ordenes.find(orden => orden.chofer?.id === chofer)?.chofer?.personal?.name,
                    apellido: ordenes.find(orden => orden.chofer?.id === chofer)?.chofer?.personal?.lastname,
                    totalTarros
                }
            })

            const peonetasConTotalTarros = peonetas.map(peoneta => {
                const totalTarros = ordenes.reduce((acumulador, valorActual) => {
                    if(valorActual.ayudante?.id === peoneta) {
                        return acumulador + Number(valorActual?.contabilidadRecarga?.totalCantidad)
                    } else {
                        return acumulador
                    }
                }, 0)
                return {
                    peoneta: "Peoneta",
                    nombre: ordenes.find(orden => orden.ayudante?.id === peoneta)?.ayudante?.personal?.name,
                    apellido: ordenes.find(orden => orden.ayudante?.id === peoneta)?.ayudante?.personal?.lastname,
                    totalTarros
                }
            })

            const excelBuffer = await createExcelBuffer([...choferesConTotalTarros, ...peonetasConTotalTarros])
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'Choferes y Peonetas con total de tarros.xlsx')
            res.end(excelBuffer)
        } else {
            res.json({
                message: 'No hay ordenes para esas fechas'
            })
        }
    } catch (error) {
        next(error)
    }
};

module.exports = {
    updateAbono,
    getAllMetodoPagosInOrdenDeRepartoBetweenDates,
    getallMetodoPagosInOrdenDeRepartoByAdministradorIdBetweenDates,
    getAllOrdenesEstructuradas,
    getUltimosValesPorFecha,
    getUltimosValesDeAyer,
    getAllOrdenesByDatesToGetChoferAndPeonetasTotalTarros
}
