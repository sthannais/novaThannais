import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IoTicketSharp } from 'react-icons/io5';
import style from './contabilidadVales.module.css';

const ContabilidadVales = () => {

    const dispatch = useDispatch();
    const { inventarioVales } = useSelector((state) => state.Nova);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [vales, setVales] = useState({
        fisico5kg: '',
        fisico11kg: '',
        fisico15kg: '',
        fisico45kg: '',
        digital5kg: '',
        digital11kg: '',
        digital15kg: '',
        digital45kg: '',
    });

    const [diferencia, setDiferencia] = useState({
        dif5kg: '',
        dif11kg: '',
        dif15kg: '',
        dif45kg: '',
    });

    const [comentario, setComentario] = useState({
        comFisico5kg: '',
        comFisico11kg: '',
        comFisico15kg: '',
        comFisico45kg: '',
        comDigital5kg: '',
        comDigital11kg: '',
        comDigital15kg: '',
        comDigital45kg: '',
    });

    const handleInputChange = (e) => {
        setVales({
            ...vales,
            [e.target.name]: e.target.value
        });
    };

    const handleInputChangeDiferencia = (e) => {
        setDiferencia({
            ...diferencia,
            [e.target.name]: e.target.value
        });
    };

    const handleInputChangeComentario = (e) => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <IoTicketSharp className={style.icono}/>
                    <p>Contabilizar vales</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle} className={style.modalHeader}>Contabilizar vales</ModalHeader>
                <ModalBody className={style.modalBody}>
                    <Form>
                        <p className={style.title2}>Vales fisicos</p>
                        <div className={style.tableContainer}>
                            <table className="table-sm table table-bordered table-hover responsive">
                                <thead>
                                    <tr>
                                        <th>Vales</th>
                                        <th>Cantidad pasiva</th>
                                        <th>Cantidad Real</th>
                                        <th>Diferencia</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Vale fisico 5kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico5kg}</>
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Vale fisico 11kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico11kg}</>
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Vale fisico 15kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico15kg}</>
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Vale fisico 45kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico45kg}</>
                                                })
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        <p className={style.title2}>Vales digitales</p>
                        <div className={style.tableContainer2}>
                        <table className="table-sm table table-bordered table-hover responsive">
                            <thead>
                                <tr>
                                    <th>Vales</th>
                                    <th>Cantidad pasiva</th>
                                    <th>Cantidad Real</th>
                                    <th>Diferencia</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Vale fisico 5kg</td>
                                    <td>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital5kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vale fisico 11kg</td>
                                    <td>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital11kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vale fisico 15kg</td>
                                    <td>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital15kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Vale fisico 45kg</td>
                                    <td>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital45kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div> 
                    </Form>
                </ModalBody>
                <ModalFooter className={style.modalFooter}>
                    <Button color="primary" onClick={toggle}>Guardar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ContabilidadVales
