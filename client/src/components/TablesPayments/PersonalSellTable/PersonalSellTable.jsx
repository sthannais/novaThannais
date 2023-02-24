import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'reactstrap'
import DatePicker, { registerLocale } from 'react-datepicker';
import { ordenesRendicionBetween } from '../../../redux/novaSlice/thunks'
import es from 'date-fns/locale/es';
import { numberWithDots } from '../../../helpers/numberWithDot';
import JorgeGas from '../../../assetsOficial/jorgegas.svg';
import vectorDerecho from '../../../assetsOficial/vectorDerecho2.svg';
import 'react-datepicker/dist/react-datepicker.css';
import style from './personalSellTable.module.css'
import moment from 'moment';
import 'moment-timezone';

registerLocale('es', es);

const PersonalSellTable = ({id}) => {

    const dispatch = useDispatch()
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const soloFecha = startDate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const soloFechaFin = endDate?.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    useEffect(() => {
        dispatch(ordenesRendicionBetween(soloFecha, soloFechaFin))
    }, [dispatch, soloFecha, soloFechaFin])

    const { ordenesRendidasDisponibles } = useSelector(state => state.Nova)

    return (
        <div>
            <p className={style.text}>Rendicion del personal</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <div className={style.datePicker}>
                    <p className={style.textDatePicker}>
                        Seleccione una fecha
                    </p>
                    <DatePicker
                        selected={startDate}
                        onChange={onChangeDate}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        className={style.classDatePicker}
                        maxDate={new Date()}
                    />
                </div>
                <Link to="/rendicionGeneral">
                    <button className={style.button}>
                        <img src={vectorDerecho} alt="vector" className={style.vectorDerecho} />
                        Rendicion General
                    </button>
                </Link>
                <div className={style.tableContainer}>
                    <Table
                        bordered
                        hover
                        responsive
                        className="table"
                        id={id}
                    >
                        <thead>
                            <tr>
                                <th>#Orden</th>
                                <th>Fecha</th>
                                <th>Chofer</th>
                                <th>Peoneta</th>
                                <th>5kg</th>
                                <th>11kg</th>
                                <th>15kg</th>
                                <th>45kg</th>
                                <th>Cilindros</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenesRendidasDisponibles?.map((orden, index) => (
                                <tr key={index}>
                                    <td>{orden.id}</td>
                                    <td>{orden.fecha}</td>
                                    <td>{orden.chofer.personal.name + " " + orden.chofer.personal.lastname}</td>
                                    <td>{orden.ayudante ? orden.ayudante.personal.name + " " + orden.ayudante.personal.lastname : "Sin peoneta"}</td>
                                    <td>{orden.contabilidadRecarga.ventas5kg}</td>
                                    <td>{orden.contabilidadRecarga.ventas11kg}</td>
                                    <td>{orden.contabilidadRecarga.ventas15kg}</td>
                                    <td>{orden.contabilidadRecarga.ventas45kg}</td>
                                    <td>{orden.contabilidadRecarga.totalCantidad}</td>
                                    <td>{orden.contabilidadRecarga.totalRecaudacion ? numberWithDots(orden.contabilidadRecarga.totalRecaudacion) : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default PersonalSellTable
