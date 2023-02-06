import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrdenQuantity, updateAbono } from '../../redux/novaSlice/thunks';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
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
    const [editAbono, setEditAbono] = useState(null);
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState({
            "actual5kg": 0,
            "actual11kg": 0,
            "actual15kg": 0,
            "actual45kg": 0,
        });

    const cleanQuantity = () => {
        setQuantity({
            "actual5kg": 0,
            "actual11kg": 0,
            "actual15kg": 0,
            "actual45kg": 0,
        })
    }
    
    //handle para calcular cantidades y precios totales
    const handleQuantity = (e) => {
        const { name, value } = e.target;
        const newQuantity = {...quantity};
        newQuantity[name] = Number(value);
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

    ////// MODIFICAR ABONO DE LA ORDEN //////

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
                                            <th className={style.tdclas} key={recarga.id}>
                                                {recarga.cantidad5kg} 
                                            </th>
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
                                            value={quantity.actual5kg === 0 ? "" : quantity.actual5kg} 
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
                                            <th className={style.tdclas} key={recarga.id}>
                                                {recarga?.cantidad11kg}
                                            </th>
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
                                            value={quantity.actual11kg === 0 ? "" : quantity.actual11kg}
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
                                            <th className={style.tdclas} key={recarga.id}>
                                                {recarga?.cantidad15kg}
                                            </th>
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
                                            value={quantity.actual15kg === 0 ? "" : quantity.actual15kg}
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
                                            <th className={style.tdclas} key={recarga.id}>
                                                {recarga?.cantidad45kg}
                                            </th>
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
                                            value={quantity.actual45kg === 0 ? "" : quantity.actual45kg}
                                            onChange={handleQuantity}
                                            className={style.inputs}
                                            min="0"
                                            autoComplete='off'
                                        />
                                    </td>
                                    : null
                                }
                            </tr>
                    </tbody>
                </Table>
                <FormGroup>
                    <Label>Total de tarros actuales:</Label>
                    <Input type="number" name="totalCantidad" id="totalCantidad" value={contabilidadRecarga?.totalCantidad} disabled/>
                </FormGroup>
                <FormGroup>
                    <Label>Precio total actuales</Label>
                    <Input type="number" name="totalRecaudacion" id="totalRecaudacion" value={contabilidadRecarga?.totalRecaudacion} disabled/>
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
                    editQuantity === id ? (
                        <>
                            <Button color="primary" onClick={handleUpdateQuantity}>Guardar</Button>
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
                            <Button color="primary" onClick={handleUpdateAbono}>Abonar</Button>
                            <Button color="secondary" onClick={
                                () => {
                                    cleanAbono();
                                    setEditAbono(null);
                                }
                                }>Cancelar</Button>
                        </>
                    ) : estado === "Activa" ? (
                        <>
                            <Button color="primary" onClick={(e) => handleEditAbono(e, id)}>
                                Abonar</Button>
                        </>
                    ) : null
                }
            </ModalFooter>
        </Modal>
    )
}

export default OrdenDetail