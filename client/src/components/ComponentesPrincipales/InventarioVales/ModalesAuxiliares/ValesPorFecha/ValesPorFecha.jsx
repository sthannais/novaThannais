import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter }  from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import { CgRowLast } from 'react-icons/cg';
import { bringValesPorFecha } from '../../../../../redux/novaSlice/thunks';
import moment from 'moment';
import 'moment-timezone';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import style from './valesPorFecha.module.css';

registerLocale('es', es);

const ValesPorFecha = () => {

    const dispatch = useDispatch();
    const { valesPorFecha } = useSelector((state) => state.Nova);
    const toggle = () => setModal(!modal);
    const [modal, setModal] = useState(false);

    const [date, setDate] = useState(new Date());
    const soloFecha = moment(date).tz('America/Santiago').format('YYYY-MM-DD');

    useEffect (() => {
        dispatch(bringValesPorFecha(soloFecha));
    }, [dispatch, soloFecha]);

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-28%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "62rem",
    };

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <CgRowLast className={style.icono}/>
                    <p>Ultimos vales</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles}>
                <ModalHeader toggle={toggle}>Ultimos vales</ModalHeader>
                <ModalBody>
                    <p>Seleccione una fecha</p>
                    <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        className={style.datePicker}
                        maxDate={new Date()}
                    />
                    <br />
                    <br />
                    <p>Nuevas entradas de vales</p>
                    <div className={style.tableContainer}>
                        <table
                            className="table-sm table table-bordered table-hover responsive"
                        >
                            <thead>
                                <tr>
                                    <th className="px-4 py-3">Vales Fisicos5kg</th>
                                    <th className="px-4 py-3">Vales Fisicos11kg</th>
                                    <th className="px-4 py-3">Vales Fisicos15kg</th>
                                    <th className="px-4 py-3">Vales Fisicos45kg</th>
                                    <th className="px-4 py-3">Vales Digitales5kg</th>
                                    <th className="px-4 py-3">Vales Digitales11kg</th>
                                    <th className="px-4 py-3">Vales Digitales15kg</th>
                                    <th className="px-4 py-3">Vales Digitales45kg</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.fisico5kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.fisico11kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.fisico15kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.fisico45kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digital5kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digital11kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digital15kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digital45kg}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={style.tableContainer2}>
                        <table
                            className="table-sm table table-bordered table-hover responsive"
                        >
                            <thead>
                                <tr>
                                    <th className="px-4 py-3">Vales digitales regalados 5kg</th>
                                    <th className="px-4 py-3">Vales digitales regalados 11kg</th>
                                    <th className="px-4 py-3">Vales digitales regalados 15kg</th>
                                    <th className="px-4 py-3">Vales digitales regalados 45kg</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digitalRegalado5kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digitalRegalado11kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digitalRegalado15kg}</td>
                                    <td className="px-4 py-3">{valesPorFecha?.vales?.digitalRegalado45kg}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {
                        valesPorFecha?.message ? <p style={{
                            color: 'red',
                        }}>{valesPorFecha?.message}</p> : null
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ValesPorFecha
