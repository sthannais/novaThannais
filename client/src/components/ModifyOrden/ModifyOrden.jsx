import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bringCodigoParaModificar, setAutorizacion, modifyRecargaOrdenQuantity } from '../../redux/novaSlice/thunks';
import style from './modifyOrden.module.css';
import { numberWithDots } from '../../helpers/numberWithDot';
import vectorDerecho from "../../assetsOficial/vectorDerecho.svg"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const ModifyOrden = ({ novaOrdenById, ordenId }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [codigo, setCodigo] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [disabled2, setDisabled2] = useState(false);
    const [disabled3, setDisabled3] = useState(false);
    const [idRecarga, setIdRecarga] = useState(null);

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch();
    const { codigoDeModificar, autorizado, precios } = useSelector(state => state.Nova);
    const precio5kg = precios?.filter(precio => precio.name === "GAS NORMAL 5 KILOS");
    const precio11kg = precios?.filter(precio => precio.name === "GAS NORMAL 11 KILOS");
    const precio15kg = precios?.filter(precio => precio.name === "GAS NORMAL 15 KILOS");
    const precio45kg = precios?.filter(precio => precio.name === "GAS NORMAL 45 KILOS");
    const preciosArray = [precio5kg[0]?.precio, precio11kg[0]?.precio, precio15kg[0]?.precio, precio45kg[0]?.precio];

    const [info, setInfo] = useState({
        id: 0,
        name: "",
        lastname: "",
        email: "",
    });

    const [recarga, setRecarga] = useState({
        actual5kg: 0,
        actual11kg: 0,
        actual15kg: 0,
        actual45kg: 0,
    });

    const handleRecarga = (e) => {
        e.preventDefault();
        setRecarga({
            ...recarga,
            [e.target.name]: Number(e.target.value)
        });
    };

    const cleanRecarga = () => {
        setRecarga({
            actual5kg: 0,
            actual11kg: 0,
            actual15kg: 0,
            actual45kg: 0,
        });
    };

    const handleRecargaSubmit = (e) => {
        e.preventDefault();
        dispatch(modifyRecargaOrdenQuantity(novaOrdenById?.id, idRecarga, recarga));
        cleanRecarga();
        toggle();
    };

    const cleanState = () => {
        setInfo({
            id: 0,
            name: "",
            lastname: "",
            email: "",
        });
    };

    useEffect(() => {
        setInfo({
            ...info,
            id: novaOrdenById?.id,
            name: usuario?.name,
            lastname: usuario?.lastname,
        });

        if(codigoDeModificar?.code !== codigo ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        if( recarga.actual11kg === 0 || 
            recarga.actual15kg === 0 || 
            recarga.actual45kg === 0 || 
            recarga.actual5kg === 0
        ) {
            setDisabled2(true);
        } else {
            setDisabled2(false);
        }

        if( ordenId === 0 ) {
            setDisabled3(true);
        } else {
            setDisabled3(false);
        }

    }, [
        codigoDeModificar?.code,
        codigo,
        novaOrdenById?.id,
        recarga.actual5kg,
        recarga.actual11kg,
        recarga.actual15kg,
        recarga.actual45kg,
        ordenId,
    ]);

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-30%, -2%)',
        fontFamily: 'Roboto',
        "--bs-modal-bg": "#F5F5F5",
    };

    return (
        <div>
            {
                novaOrdenById?.rendida === false ? (
                    <Button onClick={toggle} className={style.boton} disabled={disabled3}>Modificar Orden</Button>
                ) : null
            }
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="lg">
                {
                    autorizado === "Autorizado"  ?  (
                        <>
                            <ModalHeader toggle={toggle}>Modifique las recargas</ModalHeader>
                            <Form onSubmit={handleRecargaSubmit}>
                                <ModalBody>
                                    <Table 
                                        bordered
                                        hover   
                                        responsive
                                        className="table-md bg-white" 
                                    >
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Recarga</th>
                                                <th>Total</th>
                                                <th>Llenos</th>
                                                <th>Venta</th>
                                                <th>Precio</th>
                                                <th>Recaudacion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="px-4 py-2" style={{
                                                    textAlign: 'center',
                                                    verticalAlign: 'middle'
                                                    }}>
                                                        <p>Gas 5 kilos</p>
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.recargas?.map((recarga) => (
                                                            idRecarga === recarga.id ? (
                                                                <td key={recarga.id}>
                                                                    <Input
                                                                        type="number"
                                                                        name="actual5kg"
                                                                        id="actual5kg"
                                                                        onChange={(e) => handleRecarga(e)}
                                                                        value={recarga.actual5kg}
                                                                        className={style.inputs}
                                                                        min={0}
                                                                        autoComplete="off"
                                                                    />
                                                                </td>
                                                            ) :
                                                            (
                                                                <th key={recarga.id} className={style.cuadrado}> 
                                                                    {recarga.cantidad5kg}
                                                                </th>
                                                            )   
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.total5kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.llenos5kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.ventas5kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        preciosArray[0] ? numberWithDots(preciosArray[0]) : 0
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.recaudacion5kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion5kg) : 0
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2" style={{
                                                    textAlign: 'center',
                                                    verticalAlign: 'middle'
                                                    }}>
                                                        <p>Gas 11 kilos</p>
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.recargas?.map((recarga) => (
                                                            idRecarga === recarga.id ? (
                                                                <td key={recarga.id}>
                                                                    <Input
                                                                        type="number"
                                                                        name="actual11kg"
                                                                        id="actual11kg"
                                                                        onChange={(e) => handleRecarga(e)}
                                                                        value={recarga.actual11kg}
                                                                        className={style.inputs}
                                                                        min={0}
                                                                        autocomplete='off'
                                                                    />
                                                                </td>
                                                            ) :
                                                            (
                                                                <th key={recarga.id} className={style.cuadrado}>
                                                                    {recarga.cantidad11kg}
                                                                </th>
                                                            )
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.total11kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.llenos11kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.ventas11kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        preciosArray[1] ? numberWithDots(preciosArray[1]) : 0
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.recaudacion11kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion11kg) : 0
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2" style={{
                                                    textAlign: 'center',
                                                    verticalAlign: 'middle'
                                                    }}>
                                                        <p>Gas 15 kilos</p>
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.recargas?.map((recarga) => (
                                                            idRecarga === recarga.id ? (
                                                                <td key={recarga.id}>
                                                                    <Input
                                                                        type="number"
                                                                        name="actual15kg"
                                                                        id="actual15kg"
                                                                        onChange={(e) => handleRecarga(e)}
                                                                        value={recarga.actual15kg}
                                                                        className={style.inputs}
                                                                        min={0}
                                                                        autocomplete='off'
                                                                    />
                                                                </td>
                                                            ) :
                                                            (
                                                                <th key={recarga.id} className={style.cuadrado}>
                                                                    {recarga.cantidad15kg}
                                                                </th>
                                                            )
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.total15kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.llenos15kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.ventas15kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        preciosArray[2] ? numberWithDots(preciosArray[2]) : 0
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.recaudacion15kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion15kg) : 0
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2" style={{
                                                    textAlign: 'center',
                                                    verticalAlign: 'middle'
                                                    }}>
                                                        <p>Gas 45 kilos</p>
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.recargas?.map((recarga) => (
                                                            idRecarga === recarga.id ? (
                                                                <td key={recarga.id}>
                                                                    <Input
                                                                        type="number"
                                                                        name="actual45kg"
                                                                        id="actual45kg"
                                                                        onChange={(e) => handleRecarga(e)}
                                                                        value={recarga.actual45kg}
                                                                        className={style.inputs}
                                                                        min={0}
                                                                        autocomplete='off'
                                                                    />
                                                                </td>
                                                            ) :
                                                            (
                                                                <th key={recarga.id} className={style.cuadrado}>
                                                                    {recarga.cantidad45kg}
                                                                </th>
                                                            )
                                                        ))
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.total45kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.llenos45kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.ventas45kg
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        preciosArray[3] ? numberWithDots(preciosArray[3]) : 0
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        novaOrdenById?.contabilidadRecarga?.recaudacion45kg ? numberWithDots(novaOrdenById?.contabilidadRecarga?.recaudacion45kg) : 0
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="px-4 py-2" style={{
                                                    textAlign: 'center',
                                                    verticalAlign: 'middle'
                                                }}>
                                                    Seleccionar
                                                </th>
                                                <th>
                                                    {
                                                        novaOrdenById?.recargas?.map((recarga) => (
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
                                        </tbody>
                                    </Table>   
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" type="submit" disabled={disabled2} className={style.tamaño}>
                                        Actualizar recarga
                                    </Button>
                                    <Button color="secondary" onClick={() => {
                                        cleanRecarga()
                                        toggle()
                                    }} className={style.tamaño}>
                                        Cerrar
                                    </Button>
                                </ModalFooter>
                            </Form>
                        </>
                    ) : (
                        <>
                            <ModalHeader toggle={toggle}>Autorice con un superior</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup className={style.margin}>
                                        <Label>Selecccione a un superior</Label>
                                        <Input type="select" name="select" id="exampleSelect" onChange={
                                            (e) => {
                                                setInfo({
                                                    ...info,
                                                    email: e.target.value
                                                })
                                            }
                                        } className={style.selects}>
                                            <option hidden>Seleccione</option>
                                            <option value="jhoskartoro@gmail.com">Jhoskar</option>
                                            <option value="maicol.nieto@gmail.com">Maicol</option>
                                            <option value="jorgetalento@outlook.es">Jorge</option>
                                        </Input>
                                    </FormGroup>
                                    {
                                        autorizado === "No autorizado" ? (
                                            <div className={style.margin2}>
                                                <Button color='primary' onClick={
                                                    () => {
                                                        dispatch(bringCodigoParaModificar(info));
                                                        cleanState();
                                                    }
                                                } className={style.tamaño}>
                                                    Enviar codigo
                                                </Button>
                                                &nbsp;
                                                <Button onClick={
                                                    () => {
                                                        toggle();
                                                        cleanState();
                                                    }
                                                } className={style.tamaño}>
                                                    Cancelar
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className={style.margin}>
                                                <FormGroup>
                                                    <Label>Ingrese el codigo</Label>
                                                    <Input type="text" name="codigo" id="codigo" onChange={
                                                        (e) => {
                                                            setCodigo(Number(e.target.value));
                                                        }
                                                    } autoComplete="off" className={style.selects}/>
                                                </FormGroup>
                                                <Button color='primary' disabled={disabled} onClick={
                                                    () => {
                                                        dispatch(setAutorizacion());
                                                        cleanState();
                                                    }
                                                } className={style.tamaño}>
                                                    Autorizar
                                                </Button>
                                                &nbsp;
                                                <Button onClick={
                                                    () => {
                                                        toggle();
                                                        cleanState();
                                                    }
                                                } className={style.tamaño}>
                                                    Cancelar
                                                </Button >
                                            </div>
                                        )
                                    }
                                </Form>
                            </ModalBody>
                        </>
                    )
                }
            </Modal>
        </div>
    )
}

export default ModifyOrden
