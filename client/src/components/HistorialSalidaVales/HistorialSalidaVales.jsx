import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiChatHistoryFill } from 'react-icons/ri'
import { bringRegistroDeDescargaVales } from '../../redux/novaSlice/thunks';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table }  from 'reactstrap';
import style from './historialSalidaVales.module.css';

const HistorialSalidaVales = () => {

    const dispatch = useDispatch();

    const { registroDescargaVales } = useSelector((state) => state.Nova);

    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        dispatch(bringRegistroDeDescargaVales());
    }, [dispatch])

    const modalStylesAux = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-15%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "90rem",
    };

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <RiChatHistoryFill className={style.icono}/>
                    <p>Historial de salidas vales</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} style={modalStylesAux}>
                <ModalHeader toggle={toggle} className={style.modalHeader}>Historial de salidas vales</ModalHeader>
                <ModalBody className={style.modalBody}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Numero de guia</th>
                                <th>Nombre de factura</th>
                                <th>Nombre remitente</th>
                                <th>Nombre destinatario</th>
                                <th>vales fisicos 5kg</th>
                                <th>vales fisicos 11kg</th>
                                <th>vales fisicos 15kg</th>
                                <th>vales fisicos 45kg</th>
                                <th>vales digital 5kg</th>
                                <th>vales digital 11kg</th>
                                <th>vales digital 15kg</th>
                                <th>vales digital 45kg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registroDescargaVales?.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.fecha}</td>
                                    <td>{e.hora}</td>
                                    <td>{e.numeroGuia}</td>
                                    <td>{e.numeroFactura}</td>
                                    <td>{e.nombreEntrega}</td>
                                    <td>{e.nombreRecibe}</td>
                                    <td>{e.vale5kgFisico}</td>
                                    <td>{e.vale11kgFisico}</td>
                                    <td>{e.vale15kgFisico}</td>
                                    <td>{e.vale45kgFisico}</td>
                                    <td>{e.vale5kgDigital}</td>
                                    <td>{e.vale11kgDigital}</td>
                                    <td>{e.vale15kgDigital}</td>
                                    <td>{e.vale45kgDigital}</td>
                                </tr>
                            ))}
                        </tbody>    
                    </Table>
                </ModalBody>
                <ModalFooter className={style.modalFooter}>
                    <Button color="secondary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default HistorialSalidaVales
