import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cuadrarOrden, bringListaDePreciosActive } from '../../redux/novaSlice/thunks';
import style from './cuadratura.module.css';
import cuadratura from '../../assetsOficial/cuadratura.svg';
import validateBilletes from '../../helpers/validateBilletes';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Cuadratura = ({ novaOrdenById }) => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({});
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);

    const { listaDePrecios } = useSelector(state => state.Nova);

    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }

    const [idDeDecuadre, setIdDeDecuadre] = useState({
        idDeDecuadre : 0,
    })

    const [faltanteChofer, setFaltanteChofer] = useState({
        faltanteChofer : 0,
    })

    const [faltantePeoneta, setFaltantePeoneta] = useState({
        faltantePeoneta : 0,
    })

    const [efectivo, setEfectivo] = useState({
        totalBilletes1: 0,
        totalBilletes2 : 0,
        totalBilletes5 : 0,
        totalBilletes10 : 0,
        totalBilletes20 : 0,
        monedas : 0,
        totalGeneral : 0
    })

    const [vales, setVales] = useState({
        fisico5kg : 0,
        totalFisico5kg : 0,
        fisico11kg : 0,
        totalFisico11kg : 0,
        fisico15kg : 0,
        totalFisico15kg : 0,
        fisico45kg : 0,
        totalFisico45kg : 0,
        digital5kg : 0,
        totalDigital5kg : 0,
        digital11kg : 0,
        totalDigital11kg : 0,
        digital15kg : 0,
        totalDigital15kg : 0,
        digital45kg : 0,
        totalDigital45kg : 0,
        sumaTotalDigitalYFisico5kg : 0,
        sumaTotalDigitalYFisico11kg : 0,
        sumaTotalDigitalYFisico15kg : 0,
        sumaTotalDigitalYFisico45kg : 0,
        totalVales : 0,
        totalSumaVales : 0
    })

    const [metodoPagos, setMetodoPagos] = useState({
        montoTransbank : 0,
        montoTransferencias : 0,
        porcentajeDescuentoRut : 0,
        porcentajeDescuento : 0,
    })

    const [faltante, setFaltante] = useState({
        faltante : 0,
    })

    const [totalRecaudacion, setTotalRecaudacion] = useState({
        totalRecaudacion : 0,
    })

    const [sobrante, setSobrante] = useState({
        sobrante : 0,
    })


    useEffect(() => {
        dispatch(bringListaDePreciosActive());
    }, [dispatch])

    useEffect(() => {
        
        setEfectivo({
            ...efectivo,
            totalGeneral : (efectivo.totalBilletes1 + efectivo.totalBilletes2 + efectivo.totalBilletes5 + efectivo.totalBilletes10 + efectivo.totalBilletes20 + efectivo.monedas)
        })
        setVales({
            ...vales,
            totalFisico5kg : (vales.fisico5kg * Number(listaDePrecios?.precio5kg)),
            totalFisico11kg : (vales.fisico11kg * Number(listaDePrecios?.precio11kg)),
            totalFisico15kg : (vales.fisico15kg * Number(listaDePrecios?.precio15kg)),
            totalFisico45kg : (vales.fisico45kg * Number(listaDePrecios?.precio45kg)),
            totalDigital5kg : (vales.digital5kg * Number(listaDePrecios?.precio5kg)),
            totalDigital11kg : (vales.digital11kg * Number(listaDePrecios?.precio11kg)),
            totalDigital15kg : (vales.digital15kg * Number(listaDePrecios?.precio15kg)),
            totalDigital45kg : (vales.digital45kg * Number(listaDePrecios?.precio45kg)),
            sumaTotalDigitalYFisico5kg : (vales.totalFisico5kg + vales.totalDigital5kg),
            sumaTotalDigitalYFisico11kg : (vales.totalFisico11kg + vales.totalDigital11kg),
            sumaTotalDigitalYFisico15kg : (vales.totalFisico15kg + vales.totalDigital15kg),
            sumaTotalDigitalYFisico45kg : (vales.totalFisico45kg + vales.totalDigital45kg),
            totalVales : (vales.fisico5kg + vales.fisico11kg + vales.fisico15kg + vales.fisico45kg + vales.digital5kg + vales.digital11kg + vales.digital15kg + vales.digital45kg),
            totalSumaVales : (vales.sumaTotalDigitalYFisico5kg + vales.sumaTotalDigitalYFisico11kg + vales.sumaTotalDigitalYFisico15kg + vales.sumaTotalDigitalYFisico45kg)
        })
        
        // se setea el faltante con cada billete y moneda
        setFaltante({
            ...faltante,
            faltante : (novaOrdenById?.contabilidadRecarga?.totalRecaudacion) - 
            (   efectivo.totalGeneral +
                vales.totalSumaVales 
            ) - (
                metodoPagos.montoTransbank +
                metodoPagos.montoTransferencias 
            ) - (
                metodoPagos.porcentajeDescuentoRut +
                metodoPagos.porcentajeDescuento
            ) - (
                novaOrdenById?.metodoPagos[0]?.abono?.monto
            ) - (
                faltanteChofer.faltanteChofer + 
                faltantePeoneta.faltantePeoneta
            ) + (
                sobrante.sobrante
            )
        })

        setIdDeDecuadre({
            ...idDeDecuadre,
            idDeDecuadre : usuario.administrador.id
        })

    }, [
        efectivo.totalBilletes1,
        efectivo.totalBilletes2,
        efectivo.totalBilletes5,
        efectivo.totalBilletes10,
        efectivo.totalBilletes20,
        efectivo.monedas,
        efectivo.totalGeneral,
        vales.fisico5kg,
        vales.totalFisico5kg,
        vales.fisico11kg,
        vales.totalFisico11kg,
        vales.fisico15kg,
        vales.totalFisico15kg,
        vales.fisico45kg,
        vales.totalFisico45kg,
        vales.digital5kg,
        vales.totalDigital5kg,
        vales.digital11kg,
        vales.totalDigital11kg,
        vales.digital15kg,
        vales.totalDigital15kg,
        vales.digital45kg,
        vales.totalDigital45kg,
        vales.sumaTotalDigitalYFisico5kg,
        vales.sumaTotalDigitalYFisico11kg,
        vales.sumaTotalDigitalYFisico15kg,
        vales.sumaTotalDigitalYFisico45kg,
        vales.totalVales,
        vales.totalSumaVales,
        metodoPagos.montoTransbank,
        metodoPagos.montoTransferencias,
        metodoPagos.porcentajeDescuentoRut,
        metodoPagos.porcentajeDescuento,
        totalRecaudacion.totalRecaudacion,
        novaOrdenById?.contabilidadRecarga?.totalRecaudacion,
        novaOrdenById?.metodoPagos[0]?.abono?.monto,
        disabled,
        faltanteChofer.faltanteChofer,
        faltantePeoneta.faltantePeoneta,
        listaDePrecios?.precio5kg,
        listaDePrecios?.precio11kg,
        listaDePrecios?.precio15kg,
        listaDePrecios?.precio45kg,
        usuario.administrador.id,
        sobrante.sobrante
    ])

    useEffect(() => {
        if(
            !error.hasOwnProperty('totalBilletes1') &&
            !error.hasOwnProperty('totalBilletes2') &&
            !error.hasOwnProperty('totalBilletes5') &&
            !error.hasOwnProperty('totalBilletes10') &&
            !error.hasOwnProperty('totalBilletes20') &&
            faltante.faltante < 1 && faltante.faltante > -1
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [error, faltante.faltante,])
    

    const handleChange = (e) => {

        setError(
            validateBilletes({
                ...efectivo,
                [e.target.name] : Number(e.target.value)
            })
        )
        setEfectivo({
            ...efectivo,
            [e.target.name] : Number(e.target.value)
        })
        
        setVales({
            ...vales,
            [e.target.name] : Number(e.target.value)
        })

        setMetodoPagos({
            ...metodoPagos,
            [e.target.name] : Number(e.target.value)
        })

        setFaltanteChofer({
            ...faltanteChofer,
            [e.target.name] : Number(e.target.value)
        })

        setFaltantePeoneta({
            ...faltantePeoneta,
            [e.target.name] : Number(e.target.value)
        })

        setFaltante({
            ...faltante,
            [e.target.name] : Number(e.target.value)
        })

        setSobrante({
            ...sobrante,
            [e.target.name] : Number(e.target.value)
        })
    }

    const cleanStates = () => {
        setEfectivo({
            billetede1 : 0,
            totalBilletes1 : 0,
            billetesDe2 : 0,
            totalBilletes2 : 0,
            billetesDe5 : 0,
            totalBilletes5 : 0,
            billetesDe10 : 0,
            totalBilletes10 : 0,
            billetesDe20 : 0,
            totalBilletes20 : 0,
            moneda500 : 0,
            totalMoneda500 : 0,
            moneda100 : 0,
            totalMoneda100 : 0,
            moneda50 : 0,
            totalMoneda50 : 0,
            moneda10 : 0,
            totalMoneda10 : 0,
        })
        setVales({
            fisico5kg : 0,
            totalFisico5kg : 0,
            fisico11kg : 0,
            totalFisico11kg : 0,
            fisico15kg : 0,
            totalFisico15kg : 0,
            fisico45kg : 0,
            totalFisico45kg : 0,
            digital5kg : 0,
            totalDigital5kg : 0,
            digital11kg : 0,
            totalDigital11kg : 0,
            digital15kg : 0,
            totalDigital15kg : 0,
            digital45kg : 0,
            totalDigital45kg : 0,
            sumaTotalDigitalYFisico5kg : 0,
            sumaTotalDigitalYFisico11kg : 0,
            sumaTotalDigitalYFisico15kg : 0,
            sumaTotalDigitalYFisico45kg : 0,
        })
        setMetodoPagos({
            montoTransbank : 0,
            montoTransferencias : 0,
            porcentajeDescuentoRut : 0,
            porcentajeDescuento : 0,
        })
        setTotalRecaudacion({
            totalRecaudacion : novaOrdenById?.contabilidadRecarga?.totalRecaudacion,
        })
        setFaltante({
            faltante : 0,
        })

        setFaltanteChofer({
            faltanteChofer : 0,
        })

        setFaltantePeoneta({
            faltantePeoneta : 0,
        })

        setDisabled(true)
    }

    const cleanFaltantes = () => {
        setFaltanteChofer({
            faltanteChofer : 0,
        })

        setFaltantePeoneta({
            faltantePeoneta : 0,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(cuadrarOrden(novaOrdenById.id, {
            ...efectivo,
            ...vales,
            ...metodoPagos,
            ...faltante,
            ...faltanteChofer,
            ...faltantePeoneta,
            ...sobrante,
            ...idDeDecuadre
        }))
        cleanStates()
        toggle()
    }

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-28%, -3%)',
        "--bs-modal-padding": "1.5rem"
    };

    return (
        <div style={{
            position: 'absolute',
            top: '28%',
            left: '11%',
            width: '50%',
            height: '50%',
        }}>
            <Button onClick={() => {
                toggle()
                setTotalRecaudacion({
                    totalRecaudacion: novaOrdenById?.contabilidadRecarga?.totalRecaudacion
                })
            }} className={style.boton}>
                <p>Cuadratura</p>
                <img src={cuadratura} alt="cuadratura" className={style.icono} />
            </Button> 
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="lg" className={style.modal}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <ModalHeader toggle={toggle}>Cuadratura</ModalHeader>
                    <ModalBody>
                        <div className={style.containerGeneral}>
                            <div className={style.containerEfectivo}>
                                <p style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                }}>
                                    EFECTIVO
                                </p>
                                <div className={style.grid1}>
                                    <p>B. 20.000</p>
                                    <Input
                                        type="number"
                                        name="totalBilletes20"
                                        id="totalBilletes20"
                                        value={efectivo.totalBilletes20 === 0 ? "" : efectivo.totalBilletes20}
                                        className={style.inputs}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    <p>B. 10.000</p>
                                    <Input
                                        type="number"
                                        name="totalBilletes10"
                                        id="totalBilletes10"
                                        value={efectivo.totalBilletes10 === 0 ? "" : efectivo.totalBilletes10}
                                        className={style.inputs}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    <p>B. 5.000</p>
                                    <Input
                                        type="number"
                                        name="totalBilletes5"
                                        id="totalBilletes5"
                                        value={efectivo.totalBilletes5 === 0 ? "" : efectivo.totalBilletes5}
                                        className={style.inputs}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    <p>B. 2.000</p>
                                    <Input
                                        type="number"
                                        name="totalBilletes2"
                                        id="totalBilletes2"
                                        value={efectivo.totalBilletes2 === 0 ? "" : efectivo.totalBilletes2}
                                        className={style.inputs}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    <p>B. 1.000</p>
                                    <Input
                                        type="number"
                                        name="totalBilletes1"
                                        id="totalBilletes1"
                                        value={efectivo.totalBilletes1 === 0 ? "" : efectivo.totalBilletes1}
                                        className={style.inputs}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    <p>Monedas</p>
                                    <Input
                                        type="number"
                                        name="monedas"
                                        id="monedas"
                                        value={efectivo.monedas === 0 ? "" : efectivo.monedas}
                                        className={style.inputs}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                </div>
                                {   
                                    error.totalBilletes20 && <p className={style.error2}>{error.totalBilletes20}</p> ||
                                    error.totalBilletes10 && <p className={style.error2}>{error.totalBilletes10}</p> ||
                                    error.totalBilletes5 && <p className={style.error2}>{error.totalBilletes5}</p> ||
                                    error.totalBilletes2 && <p className={style.error2}>{error.totalBilletes2}</p> ||
                                    error.totalBilletes1 && <p className={style.error2}>{error.totalBilletes1}</p> 
                                }
                            </div>
                            <div className={style.containerVales}>
                                <p style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    marginTop: '0.5rem',
                                }}>
                                    VALES
                                </p>
                                <div className={style.grid2}>
                                    <p style={{fontWeight: "bold", fontSize: "18px"}}>Fisicos</p>
                                    <p style={{fontWeight: "bold", fontSize: "18px"}}>Digitales</p>
                                    <div>
                                    <p>5kg</p>
                                    <Input
                                        type="number"
                                        name="fisico5kg"
                                        id="fisico5kg"
                                        value={vales.fisico5kg === 0 ? "" : vales.fisico5kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>5kg</p>
                                    <Input
                                        type="number"
                                        name="digital5kg"
                                        id="digital5kg"
                                        value={vales.digital5kg === 0 ? "" : vales.digital5kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>11kg</p>
                                    <Input
                                        type="number"
                                        name="fisico11kg"
                                        id="fisico11kg"
                                        value={vales.fisico11kg === 0 ? "" : vales.fisico11kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>11kg</p>
                                    <Input
                                        type="number"
                                        name="digital11kg"
                                        id="digital11kg"
                                        value={vales.digital11kg === 0 ? "" : vales.digital11kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>15kg</p>
                                    <Input
                                        type="number"
                                        name="fisico15kg"
                                        id="fisico15kg"
                                        value={vales.fisico15kg === 0 ? "" : vales.fisico15kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>15kg</p>
                                    <Input
                                        type="number"
                                        name="digital15kg"
                                        id="digital15kg"
                                        value={vales.digital15kg === 0 ? "" : vales.digital15kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>45kg</p>
                                    <Input
                                        type="number"
                                        name="fisico45kg"
                                        id="fisico45kg"
                                        value={vales.fisico45kg === 0 ? "" : vales.fisico45kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                    <div>
                                    <p>45kg</p>
                                    <Input
                                        type="number"
                                        name="digital45kg"
                                        id="digital45kg"
                                        value={vales.digital45kg === 0 ? "" : vales.digital45kg}
                                        className={style.inputs3}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.containerMetodoPagos}>
                            <p style={{
                                fontWeight: 'bold',
                                fontFamily: 'Roboto',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                marginTop: '-0.5rem',
                            }}>
                                OTROS
                            </p>
                            <div className={style.grid3}>
                                <div style={{
                                    paddingBlock: '0.5rem',
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Trasnbank
                                    </p>
                                    <Input
                                        type="number"
                                        name="montoTransbank"
                                        id="montoTransbank"
                                        value={metodoPagos.montoTransbank === 0 ? "" : metodoPagos.montoTransbank}
                                        className={style.inputs2}
                                        onChange={(e) => handleChange(e)}
                                        min={0} 
                                    />
                                </div>
                                <div style={{
                                    paddingBlock: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Transferencias
                                    </p>
                                    <Input
                                        type="number"
                                        name="montoTransferencias"
                                        id="montoTransferencias"
                                        value={metodoPagos.montoTransferencias === 0 ? "" : metodoPagos.montoTransferencias}
                                        className={style.inputs2}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                </div>
                                <div style={{
                                    paddingBlock: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Descuentos
                                    </p>
                                    <Input
                                        type="number"
                                        name="porcentajeDescuento"
                                        id="porcentajeDescuento"
                                        value={metodoPagos.porcentajeDescuento === 0 ? "" : metodoPagos.porcentajeDescuento}
                                        className={style.inputs2}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                </div>
                                <div style={{
                                    paddingBlock: '0.5rem'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Roboto',
                                    }}>
                                        Descuento Rut
                                    </p>
                                    <Input
                                        type="number"
                                        name="porcentajeDescuentoRut"
                                        id="porcentajeDescuentoRut"
                                        value={metodoPagos.porcentajeDescuentoRut === 0 ? "" : metodoPagos.porcentajeDescuentoRut}
                                        className={style.inputs2}
                                        onChange={(e) => handleChange(e)}
                                        min={0}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.containerRecaudacion}>
                            <div className={style.grid4}>
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}>
                                    Total Recaudado
                                </p>
                                <Input
                                    type="number"
                                    name="totalRecaudado"
                                    id="totalRecaudado"
                                    placeholder="Total Recaudado"
                                    value={totalRecaudacion.totalRecaudacion}
                                    className={style.inputs4}
                                    disabled
                                />
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}>
                                    Faltante
                                </p>
                                <Input
                                    type="number"
                                    name="faltante"
                                    id="faltante"
                                    placeholder="Faltante"
                                    value={faltante.faltante}
                                    className={style.inputs4}
                                    disabled
                                    min={0}
                                />
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}>
                                    Abonos
                                </p>
                                <Input
                                    type="number"
                                    name="abonos"
                                    id="abonos"
                                    placeholder="abonos"
                                    value={novaOrdenById?.metodoPagos[0]?.abono?.monto}
                                    className={style.inputs4}
                                    disabled
                                />
                                {
                                    //si faltante es menor a 0, se habilita el input de sobrante
                                    faltante?.faltante < 0 ? (
                                        <>
                                            <p style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                fontFamily: 'Roboto',
                                            }}>
                                                Sobrante
                                            </p>
                                            <Input
                                                type="number"
                                                name="sobrante"
                                                id="sobrante"
                                                placeholder="Sobrante"
                                                value={sobrante.sobrante === 0 ? "" : sobrante.sobrante}
                                                className={style.inputs4}
                                                min={0}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </>
                                    ) : null
                                }
                                
                            </div>
                        </div>
                        {
                            faltante?.faltante < 0 ?
                            <p className={style.error}>
                                El faltante no puede ser negativo, por favor ingrese el sobrante al campo de sobrante
                            </p>
                            :
                            null
                        }
                        <Button color='success' onClick={toggleNested} className={style.boton2}>Asignar Faltante</Button>
                        <Modal
                            isOpen={nestedModal}
                            toggle={toggleNested}
                            onClosed={closeAll ? toggle : undefined}
                            style={modalStyles}
                        >
                            <ModalHeader>Asignar Faltante</ModalHeader>
                            <ModalBody>
                                    <FormGroup>
                                        <Label>Chofer: { novaOrdenById?.chofer?.personal?.name + " " + novaOrdenById?.chofer?.personal?.lastname }</Label>
                                        <Input
                                            type="number"
                                            name="faltanteChofer"
                                            id="faltanteChofer"
                                            value={faltanteChofer.faltanteChofer === 0 ? "" : faltanteChofer.faltanteChofer}
                                            className={style.inputs4}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Peoneta: { novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname }</Label>
                                        <Input
                                            type='number'
                                            name="faltantePeoneta"
                                            id="faltantePeoneta"
                                            value={faltantePeoneta.faltantePeoneta === 0 ? "" : faltantePeoneta.faltantePeoneta}
                                            className={style.inputs4}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggleNested}>Aceptar</Button>
                                <Button color="secondary" onClick={() => {
                                    toggleNested();
                                    cleanFaltantes();
                                }}>Cancelar</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' disabled={disabled}>Aceptar</Button>
                        <Button color="secondary" onClick={() => {
                            toggle();
                            cleanStates();
                        }}>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Cuadratura
