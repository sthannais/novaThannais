import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form }  from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRegistroCambioVales } from '../../redux/novaSlice/thunks';
import { FaHistory } from 'react-icons/fa';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import 'moment-timezone';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import style from './historialCambiosVales.module.css';

registerLocale('es', es);

const HistorialCambiosVales = () => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        dispatch(getAllRegistroCambioVales());
    }, [dispatch]);

    const [date, setDate] = useState(new Date());
    const soloFecha = moment(date).tz('America/Santiago').format('YYYY-MM-DD');
    
    const { registroCambiosVales } = useSelector((state) => state.Nova.RegistroCambiosVales);

    const modalStyles = {
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
                    <FaHistory className={style.icono}/>
                    <p>Historial de cambios</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles}>
                <ModalHeader toggle={toggle} className={style.modalHeader}>Historial de contabilidad</ModalHeader>
                <ModalBody className={style.modalBody}>
                    <p>Seleccione una fecha disponible</p>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        className={style.datepicker}
                        dayClassName={(date) => {
                            const fecha = moment(date).tz('America/Santiago').format('YYYY-MM-DD');
                            const fechaEncontrada = registroCambiosVales.find((registro) => registro.fecha === fecha);
                            if (fechaEncontrada) {
                                return style.datepicker2;
                            }
                        }}
                        maxDate={new Date()}
                        filterDate={(date) => {
                            const fecha = moment(date).tz('America/Santiago').format('YYYY-MM-DD');
                            const fechaEncontrada = registroCambiosVales.find((registro) => registro.fecha === fecha);
                            if (fechaEncontrada) {
                                return true;
                            }
                        }}
                    />
                    <div className={style.tableContainer}>
                        <table className="table-sm table table-bordered table-hover responsive">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3">Vale fisico 5kg Anterior</th>
                                    <th className="px-4 py-3">Vale fisico 5kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 5kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                    <th className="px-4 py-3">Vale fisico 11kg Anterior</th>
                                    <th className="px-4 py-3">Vale fisico 11kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 11kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                    <th className="px-4 py-3">Vale fisico 15kg Anterior</th>
                                    <th className="px-4 py-3">Vale fisico 15kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 15kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                    <th className="px-4 py-3">Vale fisico 45kg Anterior</th>
                                    <th className="px-4 py-3">Vale fisico 45kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 45kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registroCambiosVales?.map((registro) => {
                                    if (registro.fecha === soloFecha) {
                                        return (
                                            <tr key={registro.id}>
                                                <td className="px-4 py-3">{registro.vale5kgFisicoAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale5kgFisicoActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia5kgFisico}</td>
                                                <td className="px-4 py-3">{registro.comentario5kgFisico}</td>
                                                <td className="px-4 py-3">{registro.vale11kgFisicoAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale11kgFisicoActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia11kgFisico}</td>
                                                <td className="px-4 py-3">{registro.comentario11kgFisico}</td>
                                                <td className="px-4 py-3">{registro.vale15kgFisicoAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale15kgFisicoActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia15kgFisico}</td>
                                                <td className="px-4 py-3">{registro.comentario15kgFisico}</td>
                                                <td className="px-4 py-3">{registro.vale45kgFisicoAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale45kgFisicoActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia45kgFisico}</td>
                                                <td className="px-4 py-3">{registro.comentario45kgFisico}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.tableContainer2}>
                        <table className="table-sm table table-bordered table-hover responsive">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3">Vale digital 5kg Anterior</th>
                                    <th className="px-4 py-3">Vale digital 5kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 5kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                    <th className="px-4 py-3">Vale digital 11kg Anterior</th>
                                    <th className="px-4 py-3">Vale digital 11kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 11kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                    <th className="px-4 py-3">Vale digital 15kg Anterior</th>
                                    <th className="px-4 py-3">Vale digital 15kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 15kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                    <th className="px-4 py-3">Vale digital 45kg Anterior</th>
                                    <th className="px-4 py-3">Vale digital 45kg Actual</th>
                                    <th className="px-4 py-3">Diferencia 45kg</th>
                                    <th className="px-4 py-3">comentario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registroCambiosVales?.map((registro) => {
                                    if (registro.fecha === soloFecha) {
                                        return (
                                            <tr key={registro.id}>
                                                <td className="px-4 py-3">{registro.vale5kgDigitalAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale5kgDigitalActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia5kgDigital}</td>
                                                <td className="px-4 py-3">{registro.comentario5kgDigital}</td>
                                                <td className="px-4 py-3">{registro.vale11kgDigitalAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale11kgDigitalActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia11kgDigital}</td>
                                                <td className="px-4 py-3">{registro.comentario11kgDigital}</td>
                                                <td className="px-4 py-3">{registro.vale15kgDigitalAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale15kgDigitalActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia15kgDigital}</td>
                                                <td className="px-4 py-3">{registro.comentario15kgDigital}</td>
                                                <td className="px-4 py-3">{registro.vale45kgDigitalAnterior}</td>
                                                <td className="px-4 py-3">{registro.vale45kgDigitalActual}</td>
                                                <td className="px-4 py-3">{registro.diferencia45kgDigital}</td>
                                                <td className="px-4 py-3">{registro.comentario45kgDigital}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </ModalBody>
                <ModalFooter className={style.modalFooter}>
                    <Button color="secondary" onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default HistorialCambiosVales
