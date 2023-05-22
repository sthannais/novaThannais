import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import { TbTicket } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import {
    bringPreInventarioValesFisicos,
    bringPreInventarioValesDigitales,
    bringPreInventarioValesDigitalesRegalados,
    modifyPreInventarioValesFisicos,
    modifyPreInventarioValesDigitales,
    modifyPreInventarioValesDigitalesRegalados,
    aceptarPreInventarioValesFisicos,
    aceptarPreInventarioValesDigitales,
    aceptarPreInventarioValesDigitalesRegalados
} from '../../../../../redux/novaSlice/thunks';
import style from './aceptarVales.module.css';


const AceptarVales = () => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [modalAceptar, setModalAceptar] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleAceptar = () => setModalAceptar(!modalAceptar);
    const {
        preInventarioValesFisicos,
        preInventarioValesDigitales,
        preInventarioValesRegalados,
    } = useSelector(state => state.Nova);

    //Estados localas para modificar preInventario de vales fisicos
    const [modificarPreInventarioFisicos, setModificarPreInventarioFisicos] = useState(null);
    const [cantidadPreInventarioFisicos, setCantidadPreInventarioFisicos] = useState({
        fisico5kg: 0,
        fisico11kg: 0,
        fisico15kg: 0,
        fisico45kg: 0,
        comentario: ''
    });

    const handleChange = (e) => {
        setCantidadPreInventarioFisicos({
            ...cantidadPreInventarioFisicos,
            [e.target.name]: Number(e.target.value),
        });
    };

    const cleanPreInventarioFisicos = () => {
        setCantidadPreInventarioFisicos({
            fisico5kg: 0,
            fisico11kg: 0,
            fisico15kg: 0,
            fisico45kg: 0,
            comentario: ''
        });
    };

    //Estados localas para modificar preInventario de vales digitales
    const [modificarPreInventarioDigitales, setModificarPreInventarioDigitales] = useState(null);
    const [cantidadPreInventarioDigitales, setCantidadPreInventarioDigitales] = useState({
        digital5kg: 0,
        digital11kg: 0,
        digital15kg: 0,
        digital45kg: 0,
        comentario: ''
    });

    const handleChangeDigitales = (e) => {
        setCantidadPreInventarioDigitales({
            ...cantidadPreInventarioDigitales,
            [e.target.name]: Number(e.target.value),
        });
    };

    const cleanPreInventarioDigitales = () => {
        setCantidadPreInventarioDigitales({
            digital5kg: 0,
            digital11kg: 0,
            digital15kg: 0,
            digital45kg: 0,
            comentario: ''
        });
    };

    //Estados localas para modificar preInventario de vales digitales regalados
    const [modificarPreInventarioDigitalesRegalados, setModificarPreInventarioDigitalesRegalados] = useState(null);
    const [cantidadPreInventarioDigitalesRegalados, setCantidadPreInventarioDigitalesRegalados] = useState({
        regalados5kg: 0,
        regalados11kg: 0,
        regalados15kg: 0,
        regalados45kg: 0,
        comentario: ''
    });

    const handleChangeDigitalesRegalados = (e) => {
        setCantidadPreInventarioDigitalesRegalados({
            ...cantidadPreInventarioDigitalesRegalados,
            [e.target.name]: Number(e.target.value),
        });
    };

    const cleanPreInventarioDigitalesRegalados = () => {
        setCantidadPreInventarioDigitalesRegalados({
            regalados5kg: 0,
            regalados11kg: 0,
            regalados15kg: 0,
            regalados45kg: 0,
            comentario: ''
        });
    };

    useEffect(() => {
        dispatch(bringPreInventarioValesFisicos());
        dispatch(bringPreInventarioValesDigitales());
        dispatch(bringPreInventarioValesDigitalesRegalados());
    }, [dispatch]);

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-28%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "70rem",
    };
    
    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <TbTicket className={style.icono}/>
                    <p>Aceptar vales</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles}>
                <ModalHeader toggle={toggle}>Aceptar vales</ModalHeader>
                <ModalBody>
                    <div>
                        <table
                            className="table-sm table table-bordered table-hover responsive"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Fisico 5kg</th>
                                    <th scope="col">Fisico 11kg</th>
                                    <th scope="col">Fisico 15kg</th>
                                    <th scope="col">Fisico 45kg</th>
                                    {
                                        modificarPreInventarioFisicos !== null ? (
                                            <th scope="col">comentario</th>
                                        ) : (
                                            <th scope="col">Total</th>
                                        )
                                    }
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preInventarioValesFisicos?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.fecha}</td>
                                        {
                                            modificarPreInventarioFisicos === item.id ? (
                                                <>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="fisico5kg"
                                                            value={cantidadPreInventarioFisicos.fisico5kg}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="fisico11kg"
                                                            value={cantidadPreInventarioFisicos.fisico11kg}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="fisico15kg"
                                                            value={cantidadPreInventarioFisicos.fisico15kg}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="fisico45kg"
                                                            value={cantidadPreInventarioFisicos.fisico45kg}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="comentario"
                                                            value={cantidadPreInventarioFisicos.comentario}
                                                            onChange={handleChange}
                                                        />
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.fisico5kg}</td>
                                                    <td>{item.fisico11kg}</td>
                                                    <td>{item.fisico15kg}</td>
                                                    <td>{item.fisico45kg}</td>
                                                    <td>{item.totalValesFisicos}</td>
                                                </>
                                            )
                                        }
                                        <td>
                                            {
                                                modificarPreInventarioFisicos === item.id ? (
                                                    <>
                                                        <button
                                                            className={style.botonModificar}
                                                            onClick={() => {
                                                                dispatch(modifyPreInventarioValesFisicos(
                                                                    item.id,
                                                                    cantidadPreInventarioFisicos
                                                                ));
                                                                setModificarPreInventarioFisicos(!modificarPreInventarioFisicos);
                                                                cleanPreInventarioFisicos();
                                                            }}
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button 
                                                            className={style.botonModificar2}
                                                            onClick={() => {
                                                                setModificarPreInventarioFisicos(null);
                                                                cleanPreInventarioFisicos();
                                                            }}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button 
                                                            className={style.botonAceptar}
                                                            onClick={toggleAceptar}
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <Modal isOpen={modalAceptar} toggle={toggleAceptar}>
                                                            <ModalHeader toggle={toggleAceptar}>¿Aceptar vales fisicos del {item.fecha}?</ModalHeader>
                                                            <ModalFooter>
                                                                <Button color="primary" onClick={() => {
                                                                    toggleAceptar();
                                                                    dispatch(aceptarPreInventarioValesFisicos(item.id));
                                                                }}>
                                                                    Aceptar
                                                                </Button>
                                                                <Button color="secondary" onClick={toggleAceptar}>
                                                                    Cancelar
                                                                </Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                        <button
                                                            className={style.botonModificar}
                                                            onClick={() => {
                                                                setModificarPreInventarioFisicos(item.id);
                                                                setCantidadPreInventarioFisicos({
                                                                    fisico5kg: item.fisico5kg,
                                                                    fisico11kg: item.fisico11kg,
                                                                    fisico15kg: item.fisico15kg,
                                                                    fisico45kg: item.fisico45kg
                                                                });
                                                            }
                                                        }>
                                                            Modificar
                                                        </button>
                                                    </>
                                                )
                                            }
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table
                            className="table-sm table table-bordered table-hover responsive"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Digitales5kg</th>
                                    <th scope="col">Digitales11kg</th>
                                    <th scope="col">Digitales15kg</th>
                                    <th scope="col">Digitales45kg</th>
                                    {
                                        modificarPreInventarioDigitales !== null ? (
                                            <th scope="col">comentario</th>
                                        ) : (
                                            <th scope="col">Total</th>
                                        )
                                    }
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preInventarioValesDigitales?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.fecha}</td>
                                        {
                                            modificarPreInventarioDigitales === item.id ? (
                                                <>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="digital5kg"
                                                            value={cantidadPreInventarioDigitales.digital5kg}
                                                            onChange={handleChangeDigitales}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="digital11kg"
                                                            value={cantidadPreInventarioDigitales.digital11kg}
                                                            onChange={handleChangeDigitales}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="digital15kg"
                                                            value={cantidadPreInventarioDigitales.digital15kg}
                                                            onChange={handleChangeDigitales}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="digital45kg"
                                                            value={cantidadPreInventarioDigitales.digital45kg}
                                                            onChange={handleChangeDigitales}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="comentario"
                                                            value={cantidadPreInventarioDigitales.comentario}
                                                            onChange={handleChangeDigitales}
                                                        />
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.digital5kg}</td>
                                                    <td>{item.digital11kg}</td>
                                                    <td>{item.digital15kg}</td>
                                                    <td>{item.digital45kg}</td>
                                                    <td>{item.totalValesDigitales}</td>
                                                </>
                                            )
                                        }
                                        <td>
                                            {
                                                modificarPreInventarioDigitales === item.id ? (
                                                    <>
                                                        <button
                                                            className={style.botonModificar}
                                                            onClick={() => {
                                                                dispatch(modifyPreInventarioValesDigitales(
                                                                    item.id,
                                                                    cantidadPreInventarioDigitales
                                                                ));
                                                                setModificarPreInventarioDigitales(!modificarPreInventarioDigitales);
                                                                cleanPreInventarioDigitales();
                                                            }}
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            className={style.botonModificar2}
                                                            onClick={() => {
                                                                setModificarPreInventarioDigitales(null);
                                                                cleanPreInventarioDigitales();
                                                            }}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className={style.botonAceptar}
                                                            onClick={toggleAceptar}
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <Modal isOpen={modalAceptar} toggle={toggleAceptar}>
                                                            <ModalHeader toggle={toggleAceptar}>¿Aceptar vales digitales del {item.fecha}?</ModalHeader>
                                                            <ModalFooter>
                                                                <Button color="primary" onClick={() => {
                                                                    toggleAceptar();
                                                                    dispatch(aceptarPreInventarioValesDigitales(item.id));
                                                                }}>
                                                                    Aceptar
                                                                </Button>
                                                                <Button color="secondary" onClick={toggleAceptar}>
                                                                    Cancelar
                                                                </Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                        <button
                                                            className={style.botonModificar}
                                                            onClick={() => {
                                                                setModificarPreInventarioDigitales(item.id);
                                                                setCantidadPreInventarioDigitales({
                                                                    digital5kg: item.digital5kg,
                                                                    digital11kg: item.digital11kg,
                                                                    digital15kg: item.digital15kg,
                                                                    digital45kg: item.digital45kg
                                                                });
                                                            }
                                                        }>
                                                            Modificar
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table
                            className="table-sm table table-bordered table-hover responsive"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Regalados5kg</th>
                                    <th scope="col">Regalados11kg</th>
                                    <th scope="col">Regalados15kg</th>
                                    <th scope="col">Regalados45kg</th>
                                    {
                                        modificarPreInventarioDigitalesRegalados !== null ? (
                                            <th scope="col">comentario</th>
                                        ) : (
                                            <th scope="col">Total</th>
                                        )
                                    }
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preInventarioValesRegalados?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.fecha}</td>
                                        {
                                            modificarPreInventarioDigitalesRegalados === item.id ? (
                                                <>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="regalados5kg"
                                                            value={cantidadPreInventarioDigitalesRegalados.regalados5kg}
                                                            onChange={handleChangeDigitalesRegalados}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="regalados11kg"
                                                            value={cantidadPreInventarioDigitalesRegalados.regalados11kg}
                                                            onChange={handleChangeDigitalesRegalados}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="regalados15kg"
                                                            value={cantidadPreInventarioDigitalesRegalados.regalados15kg}
                                                            onChange={handleChangeDigitalesRegalados}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="regalados45kg"
                                                            value={cantidadPreInventarioDigitalesRegalados.regalados45kg}
                                                            onChange={handleChangeDigitalesRegalados}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="comentario"
                                                            value={cantidadPreInventarioDigitalesRegalados.comentario}
                                                            onChange={handleChangeDigitalesRegalados}
                                                        />
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{item.regalados5kg}</td>
                                                    <td>{item.regalados11kg}</td>
                                                    <td>{item.regalados15kg}</td>
                                                    <td>{item.regalados45kg}</td>
                                                    <td>{item.totalValesRegalados}</td>
                                                </>
                                            )
                                        }
                                        <td>
                                            {
                                                modificarPreInventarioDigitalesRegalados === item.id ? (
                                                    <>
                                                        <button
                                                            className={style.botonModificar}
                                                            onClick={() => {
                                                                dispatch(modifyPreInventarioValesDigitalesRegalados(
                                                                    item.id,
                                                                    cantidadPreInventarioDigitalesRegalados
                                                                ));
                                                                setModificarPreInventarioDigitalesRegalados(!modificarPreInventarioDigitalesRegalados);
                                                                cleanPreInventarioDigitalesRegalados();
                                                            }}
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            className={style.botonModificar2}
                                                            onClick={() => {
                                                                setModificarPreInventarioDigitalesRegalados(null);
                                                                cleanPreInventarioDigitalesRegalados();
                                                            }}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className={style.botonAceptar}
                                                            onClick={toggleAceptar}
                                                        >
                                                            Aceptar
                                                        </button>
                                                        <Modal isOpen={modalAceptar} toggle={toggleAceptar}>
                                                            <ModalHeader toggle={toggleAceptar}>¿Aceptar vales digitales regalados del {item.fecha}?</ModalHeader>
                                                            <ModalFooter>
                                                                <Button color="primary" onClick={() => {
                                                                    toggleAceptar();
                                                                    dispatch(aceptarPreInventarioValesDigitalesRegalados(item.id));
                                                                }}>
                                                                    Aceptar
                                                                </Button>
                                                                <Button color="secondary" onClick={toggleAceptar}>
                                                                    Cancelar
                                                                </Button>
                                                            </ModalFooter>
                                                        </Modal>
                                                        <button
                                                            className={style.botonModificar}
                                                            onClick={() => {
                                                                setModificarPreInventarioDigitalesRegalados(item.id);
                                                                setCantidadPreInventarioDigitalesRegalados({
                                                                    regalados5kg: item.regalados5kg,
                                                                    regalados11kg: item.regalados11kg,
                                                                    regalados15kg: item.regalados15kg,
                                                                    regalados45kg: item.regalados45kg
                                                                });
                                                            }
                                                        }>
                                                            Modificar
                                                        </button>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Aceptar
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AceptarVales
