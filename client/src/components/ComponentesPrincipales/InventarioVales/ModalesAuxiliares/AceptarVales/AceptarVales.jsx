import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import { TbTicket } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import style from './aceptarVales.module.css';


const AceptarVales = () => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [modalAceptar, setModalAceptar] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleAceptar = () => setModalAceptar(!modalAceptar);

    const [modificarPreInventario, setModificarPreInventario] = useState(null);

    const [cantidadPreInventario, setCantidadPreInventario] = useState({
        fisico5kg: 0,
        fisico11kg: 0,
        fisico15kg: 0,
        fisico45kg: 0,
        digital5kg: 0,
        digital11kg: 0,
        digital15kg: 0,
        digital45kg: 0,
        digitalRegalado5kg: 0,
        digitalRegalado11kg: 0,
        digitalRegalado15kg: 0,
        digitalRegalado45kg: 0,
    });

    const handleChange = (e) => {
        setCantidadPreInventario({
            ...cantidadPreInventario,
            [e.target.name]: Number(e.target.value),
        });
    };

    const cleanPreInventario = () => {
        setCantidadPreInventario({
            fisico5kg: 0,
            fisico11kg: 0,
            fisico15kg: 0,
            fisico45kg: 0,
            digital5kg: 0,
            digital11kg: 0,
            digital15kg: 0,
            digital45kg: 0,
            digitalRegalado5kg: 0,
            digitalRegalado11kg: 0,
            digitalRegalado15kg: 0,
            digitalRegalado45kg: 0,
        });
    };

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
                                <th scope="col">Digital 5kg</th>
                                <th scope="col">Digital 11kg</th>
                                <th scope="col">Digital 15kg</th>
                                <th scope="col">Digital 45kg</th>
                                <th scope="col">Regalado 5kg</th>
                                <th scope="col">Regalado 11kg</th>
                                <th scope="col">Regalado 15kg</th>
                                <th scope="col">Regalado 45kg</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AceptarVales.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.fecha}</td>
                                    {
                                        modificarPreInventario === item.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="fisico5kg"
                                                        value={cantidadPreInventario.fisico5kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="fisico11kg"
                                                        value={cantidadPreInventario.fisico11kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="fisico15kg"
                                                        value={cantidadPreInventario.fisico15kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="fisico45kg"
                                                        value={cantidadPreInventario.fisico45kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digital5kg"
                                                        value={cantidadPreInventario.digital5kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digital11kg"
                                                        value={cantidadPreInventario.digital11kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digital15kg"
                                                        value={cantidadPreInventario.digital15kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digital45kg"
                                                        value={cantidadPreInventario.digital45kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digitalRegalado5kg"
                                                        value={cantidadPreInventario.digitalRegalado5kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digitalRegalado11kg"
                                                        value={cantidadPreInventario.digitalRegalado11kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digitalRegalado15kg"
                                                        value={cantidadPreInventario.digitalRegalado15kg}
                                                        onChange={handleChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="digitalRegalado45kg"
                                                        value={cantidadPreInventario.digitalRegalado45kg}
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
                                                <td>{item.digital5kg}</td>
                                                <td>{item.digital11kg}</td>
                                                <td>{item.digital15kg}</td>
                                                <td>{item.digital45kg}</td>
                                                <td>{item.digitalRegalado5kg}</td>
                                                <td>{item.digitalRegalado11kg}</td>
                                                <td>{item.digitalRegalado15kg}</td>
                                                <td>{item.digitalRegalado45kg}</td>
                                            </>
                                        )
                                    }
                                    <td>
                                        {
                                            modificarPreInventario === item.id ? (
                                                <>
                                                    <button
                                                        className={style.botonModificar}
                                                        onClick={() => {
                                                            setModificarPreInventario(!modificarPreInventario);
                                                            cleanPreInventario();
                                                        }}
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button 
                                                        className={style.botonModificar2}
                                                        onClick={() => {
                                                            setModificarPreInventario(!modificarPreInventario);
                                                            cleanPreInventario();
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
                                                        <ModalHeader toggle={toggleAceptar}>¿Aceptar vales de {item.fecha}?</ModalHeader>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={() => {
                                                                toggleAceptar();
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
                                                            setModificarPreInventario(item.id);
                                                            setCantidadPreInventario({
                                                                fisico5kg: item.fisico5kg,
                                                                fisico11kg: item.fisico11kg,
                                                                fisico15kg: item.fisico15kg,
                                                                fisico45kg: item.fisico45kg,
                                                                digital5kg: item.digital5kg,
                                                                digital11kg: item.digital11kg,
                                                                digital15kg: item.digital15kg,
                                                                digital45kg: item.digital45kg,
                                                                digitalRegalado5kg: item.digitalRegalado5kg,
                                                                digitalRegalado11kg: item.digitalRegalado11kg,
                                                                digitalRegalado15kg: item.digitalRegalado15kg,
                                                                digitalRegalado45kg: item.digitalRegalado45kg,
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
