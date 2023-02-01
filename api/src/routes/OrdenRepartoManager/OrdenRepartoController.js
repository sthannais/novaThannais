const { OrdenDeReparto,
        Patentes, 
        Cuadrante, 
        Chofer, 
        Ayudante, 
        Personal, 
        Administrador, 
        Precio,
        Recargas, 
        ContabilidadRecargas,
        MetodoPagos,
        Abonos,
        DescuentoRut,
        Descuentos,
        Vales,
        Efectivo,
        Transferencias,
        Transbank
    } = require('../../db.js');

const { Op } = require('sequelize');
const  transporter  = require('../../helpers/mailer');

///////////////////// GET //////////////////////

const getOrdenesDeReparto = async (req, res) => {
    try {
        const ordenesDeReparto = await OrdenDeReparto.findAll({
            include: [
                {
                    model: Patentes,
                },
                {
                    model: Recargas,
                },
                {
                    model: ContabilidadRecargas,
                },
                {
                    model: Cuadrante,
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
                },
                {
                    model: Administrador,
                    include: [
                        {
                            model: Personal
                        }
                    ]
                },
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
                            model: Efectivo,
                        },
                        {
                            model: Transferencias,
                        },
                        {
                            model: Transbank,
                        },
                    ]
                }       
            ]
        });
        res.json(ordenesDeReparto);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getOrdenDeRepartoById = async (req, res) => {
    const { id } = req.params;
    try {
        const ordenDeReparto = await OrdenDeReparto.findByPk(id, {
            include: [
                {
                    model: Patentes,
                },
                {
                    model: Recargas,
                },
                {
                    model: ContabilidadRecargas,
                },
                {
                    model: Cuadrante,
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
                },
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
                            model: Efectivo,
                        },
                        {
                            model: Transferencias,
                        },
                        {
                            model: Transbank,
                        }
                    ]
                },
                {
                    model: Administrador,
                    include: [
                        {
                            model: Personal
                        }
                    ]
                }
            ]
        });
        res.json(ordenDeReparto);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getOrdenDeRepartoByAdminIdAndDate = async (req, res) => {
    const { id, date } = req.params;
    try {
        const AdminOrden = await Administrador.findByPk(id, {
            include: [{
                model: OrdenDeReparto,
                where: {
                    fecha: date
                },
                include: [{
                    model: Patentes
                },
                {
                    model: Recargas
                },
                {
                    model: ContabilidadRecargas
                },
                {
                    model: Cuadrante
                }, {
                    model: Chofer,
                    include: [{
                        model: Personal
                    }]
                }, {
                    model: Ayudante,
                    include: [{
                        model: Personal
                    }]
                },
                {
                    model: MetodoPagos,
                    include: [
                        {
                            model: Abonos
                        },
                        {
                            model: DescuentoRut
                        },
                        {
                            model: Descuentos
                        },
                        {
                            model: Vales
                        },
                        {
                            model: Efectivo
                        },
                        {
                            model: Transferencias
                        },
                        {
                            model: Transbank
                        },
            ]
                }]
            }]
        });

        if(!AdminOrden) return res.status(200).json({error: "No se encontró el administrador"});

        res.json(AdminOrden);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getAllOrdenesByDate = async (req, res) => {
    const { date } = req.params;
    try {
        const ordenDeRepartos = await OrdenDeReparto.findAll({
            where: {
                fecha: date
            },
            include: [
                {
                    model: Patentes,
                },
                {
                    model: Recargas,
                },
                {
                    model: ContabilidadRecargas,
                },
                {
                    model: Cuadrante,
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
                },
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
                            model: Efectivo,
                        },
                        {
                            model: Transferencias,
                        },
                        {
                            model: Transbank,
                        }
                    ]
                }
            ]
        });
        res.json({ordenDeRepartos});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getAllChoferOrdenesDeRepartoBetweenDates = async (req, res) => {
    const { id, fechaInicio, fechaFin } = req.params;
    try {
        if(!fechaFin || fechaFin === "undefined" || fechaFin === null){
            const ordenesDeRepartoChofer = await OrdenDeReparto.findAll({
                where: {
                    fk_choferID: id,
                    fecha: fechaInicio
                },
                include: [
                    {
                        model: Chofer,
                        include: [
                            {
                                model: Personal,
                            }
                        ]
                    },
                ]
            });
            //sumo el faltanteChofer de cada orden de reparto
            let faltanteChofer = 0;
            ordenesDeRepartoChofer.forEach(ordenDeReparto => {
                faltanteChofer += Number(ordenDeReparto.faltanteChofer);
            });

            res.json({ordenesDeRepartoChofer, faltanteChofer});
        } else {
            const ordenesDeRepartoChofer = await OrdenDeReparto.findAll({
                where: {
                    fk_choferID: id,
                    fecha: {
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                include: [
                    {
                        model: Chofer,
                        include: [
                            {
                                model: Personal,
                            }
                        ]
                    },
                ]
            });
                //sumo el faltanteChofer de cada orden de reparto
                let faltanteChofer = 0;
                ordenesDeRepartoChofer.forEach(ordenDeReparto => {
                    faltanteChofer += Number(ordenDeReparto.faltanteChofer);
                });

            res.json({faltanteChofer, ordenesDeRepartoChofer});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message});
    }
};

const getAllAyudanteOrdenesDeRepartoBetweenDates = async (req, res) => {
    const { id, fechaInicio, fechaFin } = req.params;
    try {
        if(!fechaFin || fechaFin === "undefined" || fechaFin === null) {
            const ordenesDeRepartoAyudante = await OrdenDeReparto.findAll({
                where: {
                    fk_ayudanteID: id,
                    fecha: fechaInicio
                },
                include: [
                    {
                        model: Ayudante,
                        include: [
                            {
                                model: Personal,
                            }
                        ]
                    },
                ]
            });
            //sumo el faltantePeoneta de cada orden de reparto
            let faltantePeoneta = 0;
            ordenesDeRepartoAyudante.forEach(ordenDeReparto => {
                faltantePeoneta += Number(ordenDeReparto.faltantePeoneta);
            }
        );
        res.json({ordenesDeRepartoAyudante, faltantePeoneta});
        } else {
            const ordenesDeRepartoAyudante = await OrdenDeReparto.findAll({
                where: {
                    fk_ayudanteID: id,
                    fecha: {
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                include: [
                    {
                        model: Ayudante,
                        include: [
                            {
                                model: Personal,
                            }
                        ]
                    },
                ]
            });
                //sumo el faltantePeoneta de cada orden de reparto
                let faltantePeoneta = 0;
                ordenesDeRepartoAyudante.forEach(ordenDeReparto => {
                    faltantePeoneta += Number(ordenDeReparto.faltantePeoneta);
                }
            );

            res.json({faltantePeoneta, ordenesDeRepartoAyudante});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message});
    }
};


//////////////// POST  //////////////////////

const createOrden = async (req, res) => {
    const { fecha, patente, cuadranteId, idChofer, idPeoneta, idAdmin, productos, totalCantidad, totalRecaudacion} = req.body;
    try {

        //Validaciones si ya existe una orden con esa patente, chofer o peoneta

        const ordenWithPatente = await OrdenDeReparto.findOne({
            include: [
                {
                    model: Patentes,
                    where: {
                        name: patente,
                        active: true
                    }
                }]
        });

        if (ordenWithPatente) {
            return res.status(400).json({error: 'Ya existe una orden de reparto con esa patente'});
        }

        //Creacion de la orden de reparto

        const ordenDeReparto = await OrdenDeReparto.create({
            fecha
        });
        const metodoPagos = await MetodoPagos.create();
        const efectivo = await Efectivo.create();
        const abonos = await Abonos.create();
        const descuentoRut = await DescuentoRut.create();
        const descuentos = await Descuentos.create();
        const vales = await Vales.create();
        const transbank = await Transbank.create();
        const transferencias = await Transferencias.create();
        await metodoPagos.setEfectivo(efectivo);
        await metodoPagos.setAbono(abonos);
        await metodoPagos.setDescuentoRut(descuentoRut);
        await metodoPagos.setDescuento(descuentos);
        await metodoPagos.setVale(vales);
        await metodoPagos.setTransbank(transbank);
        await metodoPagos.setTransferencia(transferencias);
        await ordenDeReparto.setMetodoPagos(metodoPagos);

        const patenteNew = await Patentes.findOne({
            where: {
                name: patente,
                active: false
            }
        });
        
        const cuadranteNew = await Cuadrante.findByPk(cuadranteId);

        const realChofer = await Chofer.findByPk(idChofer, {
            include: [ {
                model: Personal
            }]
        });


        // Si se crea con un peoneta, se busca el peoneta y se lo asigna a la orden de reparto
        if(idPeoneta){

            var realPeoneta = await Ayudante.findByPk(idPeoneta, {
                include: [{
                    model: Personal
                }]
            });
            await ordenDeReparto.setAyudante(realPeoneta);
            await realPeoneta.update({activeForOrden: false});
        } else if (idPeoneta === 0 ) {
            await ordenDeReparto.setAyudante(null);
        }

        const newAdmin = await Administrador.findByPk(idAdmin, {
            include: [{
                model: Personal
            }]
        });

        // Se crea un array con los productos de la orden de reparto
        const productosNew = productos.map(producto => {
            return {
                name: producto.name,
                price: producto.price,
                cantidad: producto.quantity,
            }
        })
        await ordenDeReparto.setPatente(patenteNew);
        await patenteNew.update({active: true});
        await ordenDeReparto.setCuadrante(cuadranteNew);
        await ordenDeReparto.setChofer(realChofer);
        await realChofer.update({activeForOrden: false});
        await ordenDeReparto.setAdministrador(newAdmin);

        const recarga = await Recargas.create()
        const contabilidad = await ContabilidadRecargas.create();
        const precio5kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 5 KILOS'
            }
        })
        const precio11kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 11 KILOS'
            }
        })
        const precio15kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 15 KILOS'
            }
        })
        const precio45kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 45 KILOS'
            }
        })

        const total5kg = productosNew[0].cantidad;
        const total11kg = productosNew[1].cantidad;
        const total15kg = productosNew[2].cantidad;
        const total45kg = productosNew[3].cantidad;
        const recaudacion5kg = total5kg * precio5kg.precio;
        const recaudacion11kg = total11kg * precio11kg.precio;
        const recaudacion15kg = total15kg * precio15kg.precio;
        const recaudacion45kg = total45kg * precio45kg.precio;
        await contabilidad.update({
            totalCantidad, 
            totalRecaudacion,
            total5kg,
            recaudacion5kg,
            total11kg,
            recaudacion11kg,
            total15kg,
            recaudacion15kg,
            total45kg,
            recaudacion45kg
        });

        await recarga.update({
            cantidad5kg: total5kg,
            cantidad11kg: total11kg,
            cantidad15kg: total15kg,
            cantidad45kg: total45kg,
        });

        await ordenDeReparto.update({PrecioTotal: totalRecaudacion})
        await ordenDeReparto.addRecarga(recarga);
        await ordenDeReparto.setContabilidadRecarga(contabilidad);

        res.json([
            ordenDeReparto,
            patenteNew,
            cuadranteNew,
            realChofer,
            realPeoneta,
            productosNew,
            newAdmin,
        ]);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
};

const sendEmailWithCode = async (req, res) => {
    const { id, name, lastname, email } = req.body;
    //genero un codigo random de 6 digitos
    const code = Math.floor(100000 + Math.random() * 900000);
    
    await transporter.sendMail({
        from: '"modificación de orden 👻" <mdfdevelopers@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "modificación de orden", // Subject line
        html: `<h1>Codigo de verificación</h1>
                <p>codigo: ${code}</p>
                <p>para modificar la orden #${id}</p>
                <p>del usuario: ${name} ${lastname}</p>`, // html body
    });

    res.json({code});
}

///////////////////////////// PUT /////////////////////////////

const RechargeOrden = async (req, res) => {
    const { id } = req.params;
    const { 
        actual5kg, 
        actual11kg,
        actual15kg,
        actual45kg,
    } = req.body;
    try {
        const ordenDeReparto = await OrdenDeReparto.findByPk(id);
        const recarga = await Recargas.create({
            cantidad5kg: actual5kg,
            cantidad11kg: actual11kg,
            cantidad15kg: actual15kg,
            cantidad45kg: actual45kg,
        })
        await ordenDeReparto.addRecarga(recarga);
        const contabilidad = await ordenDeReparto.getContabilidadRecarga();
        
        const precio5kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 5 KILOS'
            }
        })
        const precio11kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 11 KILOS'
            }
        })
        const precio15kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 15 KILOS'
            }
        })
        const precio45kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 45 KILOS'
            }
        })

        const total5kg = actual5kg * precio5kg.precio;
        const total11kg = actual11kg * precio11kg.precio;
        const total15kg = actual15kg * precio15kg.precio;
        const total45kg = actual45kg * precio45kg.precio;
        const total = total5kg + total11kg + total15kg + total45kg;
        const totalCantidad = actual5kg + actual11kg + actual15kg + actual45kg;

        await contabilidad.update({
            total5kg:  Number(contabilidad.total5kg)  + Number(actual5kg),
            recaudacion5kg: Number(contabilidad.recaudacion5kg) + Number(total5kg),
            total11kg: Number(contabilidad.total11kg) + Number(actual11kg),
            recaudacion11kg: Number(contabilidad.recaudacion11kg) + Number(total11kg),
            total15kg: Number(contabilidad.total15kg) + Number(actual15kg),
            recaudacion15kg: Number(contabilidad.recaudacion15kg) + Number(total15kg),
            total45kg: Number(contabilidad.total45kg) + Number(actual45kg),
            recaudacion45kg: Number(contabilidad.recaudacion45kg) + Number(total45kg),
            totalCantidad: Number(contabilidad.totalCantidad) + Number(totalCantidad),
            totalRecaudacion: Number(contabilidad.totalRecaudacion) + Number(total)
        })

        await ordenDeReparto.update({
            PrecioTotal: contabilidad.totalRecaudacion,
        })

        res.json({msg: "Orden de reparto modificada correctamente"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const changeRecharge = async (req, res) => {
    const { idOrden, idRecarga } = req.params;
    const {
        actual5kg, 
        actual11kg,
        actual15kg,
        actual45kg,
    } = req.body;

    try {
        const ordenDeReparto = await OrdenDeReparto.findByPk(idOrden);
        const contabilidad = await ordenDeReparto.getContabilidadRecarga();

        const precio5kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 5 KILOS'
            }
        })

        const precio11kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 11 KILOS'
            }
        })

        const precio15kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 15 KILOS'
            }
        })

        const precio45kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 45 KILOS'
            }
        })

        const total5kg = Number(actual5kg) * precio5kg.precio;
        const total11kg = Number(actual11kg) * precio11kg.precio;
        const total15kg = Number(actual15kg) * precio15kg.precio;
        const total45kg = Number(actual45kg) * precio45kg.precio;
        const total = total5kg + total11kg + total15kg + total45kg;
        const totalCantidad = Number(actual5kg) + Number(actual11kg) + Number(actual15kg) + Number(actual45kg);

        const recarga = await Recargas.findByPk(idRecarga);
        
        //le resto los valores actuales de la recarga en la orden de reparto
        await contabilidad.update({
            total5kg:  Number(contabilidad.total5kg)  - Number(recarga.cantidad5kg),
            recaudacion5kg: Number(contabilidad.recaudacion5kg) - Number(recarga.cantidad5kg * precio5kg.precio),
            total11kg: Number(contabilidad.total11kg) - Number(recarga.cantidad11kg),
            recaudacion11kg: Number(contabilidad.recaudacion11kg) - Number(recarga.cantidad11kg * precio11kg.precio),
            total15kg: Number(contabilidad.total15kg) - Number(recarga.cantidad15kg),
            recaudacion15kg: Number(contabilidad.recaudacion15kg) - Number(recarga.cantidad15kg * precio15kg.precio),
            total45kg: Number(contabilidad.total45kg) - Number(recarga.cantidad45kg),
            recaudacion45kg: Number(contabilidad.recaudacion45kg) - Number(recarga.cantidad45kg * precio45kg.precio),
            totalCantidad: Number(contabilidad.totalCantidad) - (Number(recarga.cantidad5kg) + Number(recarga.cantidad11kg) + Number(recarga.cantidad15kg) + Number(recarga.cantidad45kg)),
            totalRecaudacion: Number(contabilidad.totalRecaudacion) - (Number(recarga.cantidad5kg) * Number(precio5kg.precio) + Number(recarga.cantidad11kg) * Number(precio11kg.precio) + Number(recarga.cantidad15kg) * Number(precio15kg.precio) + Number(recarga.cantidad45kg) * Number(precio45kg.precio))
        })

        //le sumo los valores nuevos de la recarga en la orden de reparto
        await contabilidad.update({
            total5kg:  Number(contabilidad.total5kg)  + Number(actual5kg),
            recaudacion5kg: Number(contabilidad.recaudacion5kg) + Number(total5kg),
            total11kg: Number(contabilidad.total11kg) + Number(actual11kg),
            recaudacion11kg: Number(contabilidad.recaudacion11kg) + Number(total11kg),
            total15kg: Number(contabilidad.total15kg) + Number(actual15kg),
            recaudacion15kg: Number(contabilidad.recaudacion15kg) + Number(total15kg),
            total45kg: Number(contabilidad.total45kg) + Number(actual45kg),
            recaudacion45kg: Number(contabilidad.recaudacion45kg) + Number(total45kg),
            totalCantidad: Number(contabilidad.totalCantidad) + Number(totalCantidad),
            totalRecaudacion: Number(contabilidad.totalRecaudacion) + Number(total)
        })

        await recarga.update({
            cantidad5kg: actual5kg,
            cantidad11kg: actual11kg,
            cantidad15kg: actual15kg,
            cantidad45kg: actual45kg,
        })

        await ordenDeReparto.update({
            PrecioTotal: contabilidad.totalRecaudacion,
        })

        res.json({msg: "Orden de reparto modificada correctamente"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const finalizeOrden = async (req, res) => {
    const { id } = req.params;
    const {
        llenos5kg,
        llenos11kg,
        llenos15kg,
        llenos45kg,
    } = req.body;

    try {
        const ordenDeReparto = await OrdenDeReparto.findByPk(Number(id), {
            where: {
                estado: true
            }
        });

        await ordenDeReparto.update({
            estado: false,
        });

        //busco la patente de la orden de reparto y la actualizo
        const patente = await ordenDeReparto.getPatente();
        await patente.update({active: false})

        //busco el chofer de la orden de reparto y lo actualizo
        const chofer = await ordenDeReparto.getChofer();
        await chofer.update({activeForOrden: true})

        //busco el ayudante de la orden de reparto y lo actualizo
        const ayudante = await ordenDeReparto.getAyudante();
        await ayudante.update({activeForOrden: true})

        const contabilidad = await ordenDeReparto.getContabilidadRecarga();
        const precio5kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 5 KILOS'
            }
        })
        const precio11kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 11 KILOS'
            }
        })
        const precio15kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 15 KILOS'
            }
        })
        const precio45kg = await Precio.findOne({
            where: {
                name: 'GAS NORMAL 45 KILOS'
            }
        })

        const ventas5kg = Number(contabilidad.total5kg) - Number(llenos5kg);
        const ventas11kg = Number(contabilidad.total11kg) - Number(llenos11kg);
        const ventas15kg = Number(contabilidad.total15kg) - Number(llenos15kg);
        const ventas45kg = Number(contabilidad.total45kg) - Number(llenos45kg);
        const totalCantidad = Number(contabilidad.totalCantidad) - Number(llenos5kg) - Number(llenos11kg) - Number(llenos15kg) - Number(llenos45kg);
        const recaudacion5kg = ventas5kg * precio5kg.precio;
        const recaudacion11kg = ventas11kg * precio11kg.precio;
        const recaudacion15kg = ventas15kg * precio15kg.precio;
        const recaudacion45kg = ventas45kg * precio45kg.precio;
        const totalRecaudacion = recaudacion5kg + recaudacion11kg + recaudacion15kg + recaudacion45kg;

        await contabilidad.update({
            llenos5kg,
            ventas5kg,
            recaudacion5kg,
            llenos11kg,
            ventas11kg,
            recaudacion11kg,
            llenos15kg,
            ventas15kg,
            recaudacion15kg,
            llenos45kg,
            ventas45kg,
            recaudacion45kg,
            totalCantidad,
            totalRecaudacion
        });

        res.json({msg: "Orden de reparto finalizada correctamente"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message});
    }
}

const cuadrarOrden = async (req, res) => {
    const { id } = req.params;
    const {
        montoTransbank,
        montoTransferencias,
        porcentajeDescuentoRut,
        porcentajeDescuento,
        totalBilletes1,
        totalBilletes2,
        totalBilletes5,
        totalBilletes10,
        totalBilletes20,
        monedas,
        totalGeneral,
        fisico5kg,
        totalFisico5kg,
        fisico11kg,
        totalFisico11kg,
        fisico15kg,
        totalFisico15kg,
        fisico45kg,
        totalFisico45kg,
        digital5kg,
        totalDigital5kg,
        digital11kg,
        totalDigital11kg,
        digital15kg,
        totalDigital15kg,
        digital45kg,
        totalDigital45kg,
        sumaTotalDigitalYFisico5kg,
        sumaTotalDigitalYFisico11kg,
        sumaTotalDigitalYFisico15kg,
        sumaTotalDigitalYFisico45kg,
        totalVales,
        totalSumaVales,
        faltanteChofer,
        faltantePeoneta,
        faltante,
        sobrante,
        idDeDecuadre,
    } = req.body;

    try {
        const ordenDeReparto = await OrdenDeReparto.findByPk(id)
        await ordenDeReparto.update({
            cuadradoPor: idDeDecuadre
        })
        const metodoPagos = await ordenDeReparto.getMetodoPagos();
        const efectivo = await Efectivo.findOne({
            where: {
                fk_MetodoPagosID: metodoPagos[0].id
            }
        })
        const vales = await Vales.findOne({
            where: {
                fk_MetodoPagosID: metodoPagos[0].id
            }
        })
        const transbank = await Transbank.findOne({
            where: {
                fk_MetodoPagosID: metodoPagos[0].id
            }
        })
        const transferencias = await Transferencias.findOne({
            where: {
                fk_MetodoPagosID: metodoPagos[0].id
            }
        })
        const descuentos = await Descuentos.findOne({
            where: {
                fk_MetodoPagosID: metodoPagos[0].id
            }
        })
        const descuentoRut = await DescuentoRut.findOne({
            where: {
                fk_MetodoPagosID: metodoPagos[0].id
            }
        })

        await efectivo.update({
            totalBilletes1,
            totalBilletes2,
            totalBilletes5,
            totalBilletes10,
            totalBilletes20,
            monedas,
            totalGeneral
        });

        await vales.update({
                fisico5kg,
                totalFisico5kg,
                fisico11kg,
                totalFisico11kg,
                fisico15kg,
                totalFisico15kg,
                fisico45kg,
                totalFisico45kg,
                digital5kg,
                totalDigital5kg,
                digital11kg,
                totalDigital11kg,
                digital15kg,
                totalDigital15kg,
                digital45kg,
                totalDigital45kg,
                sumaTotalDigitalYFisico5kg,
                sumaTotalDigitalYFisico11kg,
                sumaTotalDigitalYFisico15kg,
                sumaTotalDigitalYFisico45kg,
                totalVales,
                totalSumaVales
        });

        await transbank.update({
            monto: montoTransbank
        });

        await transferencias.update({
            monto: montoTransferencias
        });

        await descuentos.update({
            monto: porcentajeDescuento
        });

        await descuentoRut.update({
            monto: porcentajeDescuentoRut
        });

        await ordenDeReparto.update({
            faltante,
            faltanteChofer,
            faltantePeoneta,
            rendida : true,
            sobrante
        });

        res.json({msg: "Orden de reparto cuadrada correctamente"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getOrdenesDeReparto,
    getOrdenDeRepartoById,
    createOrden,
    RechargeOrden,
    changeRecharge,
    finalizeOrden,
    cuadrarOrden,
    getOrdenDeRepartoByAdminIdAndDate,
    getAllChoferOrdenesDeRepartoBetweenDates,
    getAllAyudanteOrdenesDeRepartoBetweenDates,
    sendEmailWithCode,
    getAllOrdenesByDate
}
