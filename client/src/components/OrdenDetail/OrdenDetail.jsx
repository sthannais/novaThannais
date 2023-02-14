import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrdenQuantity, updateAbono, modifyRecargaOrdenQuantity } from '../../redux/novaSlice/thunks';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
import { numberWithDots } from '../../helpers/numberWithDot';
import vectorDerecho from "../../assetsOficial/vectorDerecho.svg"
import style from './ordenDetail.module.css';
import 'bootstrap/dist/css/bootstrap.css';

const OrdenDetail = (
    {   modal,
        toggle, 
        id, 
        fecha, 
        patente,
        chofer,
        ayudante,
        cuadrante,
        estado,
        recargas,
        contabilidadRecarga,
        metodoPagos
    }) => {
    
    ////// MODIFICAR PRODUCTOS, CANTIDADTOTAL Y PRECIO TOTAL DE LA ORDEN //////
    const [editQuantity, setEditQuantity] = useState(null);
    const [editRecarga, setEditRecarga] = useState(null);
    const [idRecarga, setIdRecarga] = useState(null);
    const [editAbono, setEditAbono] = useState(null);
    const dispatch = useDispatch();

    /////////////// MODIFICA LA RECARGA DE LA ORDEN ///////////////

    const [recarga, setRecarga] = useState({
        actual5kg: 0,
        actual11kg: 0,
        actual15kg: 0,
        actual45kg: 0,
    });

    const cleanRecarga = () => {
        setRecarga({
            actual5kg: 0,
            actual11kg: 0,
            actual15kg: 0,
            actual45kg: 0,
        })
    }

    const handleRecarga = (e) => {
        const { name, value } = e.target;
        const newRecarga = {...recarga};
        newRecarga[name] = Number(value);
        setRecarga(newRecarga);
    }

    const handleEditRecarga = (e, ordenId) => {
        e.preventDefault();
        setEditRecarga(ordenId);
    }

    const handleUpdateRecarga = () => {
        dispatch(modifyRecargaOrdenQuantity(editRecarga, idRecarga, recarga, fecha));
        setEditRecarga(!editRecarga);
        setIdRecarga(!idRecarga);
        cleanRecarga();
    }

    ///////////// AGREGA UNA NUEVA RECARGA A LA ORDEN ///////////////

    const [quantity, setQuantity] = useState({
            actual5kg: "",
            actual11kg: "",
            actual15kg: "",
            actual45kg: "",
        });

    const cleanQuantity = () => {
        setQuantity({
            actual5kg: "",
            actual11kg: "",
            actual15kg: "",
            actual45kg: "",
        })
    }
    
    const handleQuantity = (e) => {
        const { name, value } = e.target;
        const newQuantity = {...quantity};
        newQuantity[name] = value;
        setQuantity(newQuantity);
    }

    const handleEditQuantity = (e, ordenId) => {
        e.preventDefault();
        setEditQuantity(ordenId);
    }

    const handleUpdateQuantity = () => {
        dispatch(updateOrdenQuantity(editQuantity, quantity, fecha));
        setEditQuantity(!editQuantity);
        cleanQuantity();
    }

    ////// AGREGA UN ABONO DE LA ORDEN //////

    const [abono, setAbono] = useState({
        abono: 0,
    });

    const handleAbono = (e) => {
        const { name, value } = e.target;
        const newAbono = {...abono};
        newAbono[name] = Number(value);
        setAbono(newAbono);
    }

    const handleEditAbono = (e, ordenId) => {
        e.preventDefault();
        setEditAbono(ordenId);
    }

    const handleUpdateAbono = () => {
        dispatch(updateAbono(editAbono, abono, fecha));
        setEditAbono(!editAbono);
        cleanAbono();
    }

    const cleanAbono = () => {
        setAbono({
            abono: 0,
        })
    }

    ///////// CALCULA EL TOTAL DE CANTIDAD DE RECARGAS Y EL TOTAL RECAUDADO ////////

    let totalCantidad =  0
    
    recargas?.forEach((recarga) => {
        totalCantidad += Number(recarga.cantidad5kg) + Number(recarga.cantidad11kg) + Number(recarga.cantidad15kg) + Number(recarga.cantidad45kg)
    })

    let totalRecaudacion = 0

    recargas?.forEach((recarga) => {
        let recargas5kg = Number(recarga.cantidad5kg) * Number(contabilidadRecarga?.precio5kg)
        let recargas11kg = Number(recarga.cantidad11kg) * Number(contabilidadRecarga?.precio11kg)
        let recargas15kg = Number(recarga.cantidad15kg) * Number(contabilidadRecarga?.precio15kg)
        let recargas45kg = Number(recarga.cantidad45kg) * Number(contabilidadRecarga?.precio45kg)
        totalRecaudacion += recargas5kg + recargas11kg + recargas15kg + recargas45kg
    })

    ////// MODAL //////

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-38%, -3%)',
        fontFamily: 'Roboto',
    };

    return (    
        <Modal isOpen={modal} toggle={toggle} style={modalStyles} >
            <ModalHeader toggle={toggle}>Detalle de orden #{id}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Fecha:</Label>
                        <Input type="text" name="fecha" id="fecha" value={fecha} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Patente asignada:</Label>
                        <Input type="text" name="patente" id="patente" value={patente} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Chofer:</Label>
                        <Input type="text" name="chofer" id="chofer" value={chofer} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Peoneta:</Label>
                        <Input type="text" name="ayudante" id="ayudante" value={ayudante} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Comuna:</Label>
                        <Input type="text" name="cuadrante" id="cuadrante" value={cuadrante} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Estado de la orden:</Label>
                        <Input type="text" name="estado" id="estado" value={estado} disabled/>
                    </FormGroup>
                </Form>
                <Table
                    className={style.tabla}
                    striped
                    bordered
                    hover
                    size="sm"
                >
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Recargas</th>
                            <th>Actual</th>
                            {
                                editQuantity === id ?
                                <th>Nueva recarga</th>
                                : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>
                                    Gas normal 5 kilos
                                </td>
                                <td>
                                    {
                                        recargas?.map((recarga) => (
                                            idRecarga === recarga.id ? (
                                                <td key={recarga.id}>
                                                    <Input
                                                        type="number"
                                                        name="actual5kg"
                                                        id="actual5kg"
                                                        onChange={(e) => handleRecarga(e)}
                                                        value={recarga.actual5kg}
                                                        className={style.inputs2}
                                                        min={0}
                                                        autoComplete="off"
                                                    />
                                                </td>
                                            ) :
                                            (
                                                <th className={style.tdclas} key={recarga.id}>
                                                    {recarga?.cantidad5kg}
                                                </th>
                                            )   
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        contabilidadRecarga?.total5kg
                                    }
                                </td>
                                {
                                    editQuantity === id ?
                                    <td>
                                        <Input 
                                            type="number" 
                                            name="actual5kg" 
                                            id="actual5kg" 
                                            value={quantity.actual5kg} 
                                            onChange={handleQuantity}
                                            className={style.inputs}
                                            min="0"
                                            autoComplete='off'
                                        />
                                    </td>
                                    : null
                                }
                            </tr>
                            <tr>
                                <td>
                                    Gas normal 11 kilos
                                </td>
                                <td>
                                    {
                                        recargas?.map((recarga) => (
                                            idRecarga === recarga.id ? (
                                                <td key={recarga.id}>
                                                    <Input
                                                        type="number"
                                                        name="actual11kg"
                                                        id="actual11kg"
                                                        onChange={(e) => handleRecarga(e)}
                                                        value={recarga.actual11kg}
                                                        className={style.inputs2}
                                                        min={0}
                                                        autoComplete="off"
                                                    />
                                                </td>
                                            ) :
                                            (
                                                <th className={style.tdclas} key={recarga.id}>
                                                    {recarga?.cantidad11kg}
                                                </th>
                                            )
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        contabilidadRecarga?.total11kg
                                    }
                                </td>
                                {
                                    editQuantity === id ?
                                    <td>
                                        <Input
                                            type="number"
                                            name="actual11kg"
                                            id="actual11kg"
                                            value={quantity.actual11kg}
                                            onChange={handleQuantity}
                                            className={style.inputs}
                                            min="0"
                                            autoComplete='off'
                                        />
                                    </td>
                                    : null
                                }
                            </tr>
                            <tr>
                                <td>
                                    Gas normal 15 kilos
                                </td>
                                <td>
                                    {
                                        recargas?.map((recarga) => (
                                            idRecarga === recarga.id ? (
                                                <td key={recarga.id}>
                                                    <Input
                                                        type="number"
                                                        name="actual15kg"
                                                        id="actual15kg"
                                                        onChange={(e) => handleRecarga(e)}
                                                        value={recarga.actual15kg}
                                                        className={style.inputs2}
                                                        min={0}
                                                        autoComplete="off"
                                                    />
                                                </td>
                                            ) :
                                            (
                                                <th className={style.tdclas} key={recarga.id}>
                                                    {recarga?.cantidad15kg}
                                                </th>
                                            )
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        contabilidadRecarga?.total15kg
                                    }
                                </td>
                                {
                                    editQuantity === id ?
                                    <td>
                                        <Input
                                            type="number"
                                            name="actual15kg"
                                            id="actual15kg"
                                            value={quantity.actual15kg}
                                            onChange={handleQuantity}
                                            className={style.inputs}
                                            min="0"
                                            autoComplete='off'
                                        />
                                    </td>
                                    : null
                                }
                            </tr>
                            <tr>
                                <td>
                                    Gas normal 45 kilos
                                </td>
                                <td>
                                    {
                                        recargas?.map((recarga) => (
                                            idRecarga === recarga.id ? (
                                                <td key={recarga.id}>
                                                    <Input
                                                        type="number"
                                                        name="actual45kg"
                                                        id="actual45kg"
                                                        onChange={(e) => handleRecarga(e)}
                                                        value={recarga.actual45kg}
                                                        className={style.inputs2}
                                                        min={0}
                                                        autoComplete="off"
                                                    />
                                                </td>
                                            ) :
                                            (
                                                <th className={style.tdclas} key={recarga.id}>
                                                    {recarga?.cantidad45kg}
                                                </th>
                                            )
                                        ))
                                    }
                                </td>
                                <td>
                                    {
                                        contabilidadRecarga?.total45kg
                                    }
                                </td>
                                {
                                    editQuantity === id ?
                                    <td>
                                        <Input
                                            type="number"
                                            name="actual45kg"
                                            id="actual45kg"
                                            value={quantity.actual45kg}
                                            onChange={handleQuantity}
                                            className={style.inputs}
                                            min="0"
                                            autoComplete='off'
                                        />
                                    </td>
                                    : null
                                }
                            </tr>
                            {
                                editRecarga === id ? (
                                    <tr>
                                        <th className="px-4 py-2" style={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                        }}>
                                            Seleccionar
                                        </th>
                                        <th>
                                            {
                                                recargas?.map((recarga) => (
                                                    <button key={recarga.id} style={{
                                                        cursor: 'pointer',
                                                    }} onClick={(e) => {
                                                        e.preventDefault()
                                                        setIdRecarga(recarga.id)
                                                    }}>
                                                        <img src={vectorDerecho} alt="flechita" className={style.flechita} />
                                                    </button>
                                                ))
                                            }
                                        </th>
                                    </tr>    
                                ) : null
                            }
                                                    
                    </tbody>
                </Table>
                <FormGroup>
                    <Label>Total de tarros</Label>
                    <Input type="number" name="totalCantidad" id="totalCantidad" value={totalCantidad} disabled/>
                </FormGroup>
                <FormGroup>
                    <Label>Recaudacion</Label>
                    <Input type="text" name="totalRecaudacion" id="totalRecaudacion" value={
                        totalRecaudacion ? numberWithDots(totalRecaudacion) : 0
                    } disabled/>
                </FormGroup>
                {
                    editAbono === id ?
                    <FormGroup>
                        <Label>Nuevo abono</Label>
                        <Input type="number" name="abono" id="abono" value={abono.abono === 0 ? "" : abono.abono } onChange={handleAbono} min="0" autoComplete='off'/>
                    </FormGroup>
                    : (
                        <FormGroup>
                            <Label>Abono</Label>
                            <Input type="number" name="abono" id="abono" value={metodoPagos[0]?.abono?.monto} disabled/>
                        </FormGroup>
                    )
                }
            </ModalBody>
            <ModalFooter>
                {
                    editRecarga === id ? (
                        <>
                            <Button color="success" onClick={handleUpdateRecarga}>Guardar</Button>
                            <Button color="secondary" onClick={
                                () => {
                                    cleanRecarga();
                                    setEditRecarga(null);
                                    setIdRecarga(null); //
                                }
                            }>Cancelar</Button>
                        </>
                    ) : estado === "Activa" ? (
                        <>
                            <Button color="success" onClick={(e) => handleEditRecarga(e, id)}>Modificar recargas</Button>
                        </>
                    ) : null
                }
                {
                    editQuantity === id ? (
                        <>
                            <Button color="success" onClick={handleUpdateQuantity}>Guardar</Button>
                            <Button color="secondary" onClick={
                                () => {
                                    cleanQuantity();
                                    setEditQuantity(null);
                                }
                                }>Cancelar</Button>
                        </>
                    ) : estado === "Activa" ? (
                        <>
                            <Button color="primary" onClick={(e) => handleEditQuantity(e, id)}>
                                Recargar</Button>
                        </>
                    ) : null
                }
                {
                    editAbono === id ? (
                        <>
                            <Button color="success" onClick={handleUpdateAbono}>Abonar</Button>
                            <Button color="secondary" onClick={
                                () => {
                                    cleanAbono();
                                    setEditAbono(null);
                                }
                                }>Cancelar</Button>
                        </>
                    ) : estado === "Activa" ? (
                        <>
                            <Button color="warning" onClick={(e) => handleEditAbono(e, id)}>
                                Abonar</Button>
                        </>
                    ) : null
                }
            </ModalFooter>
        </Modal>
    )
}

export default OrdenDetail