import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'reactstrap'
import { bringOrdenByAdminId } from '../../../redux/novaSlice/thunks';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { numberWithDots } from '../../../helpers/numberWithDot';
import JorgeGas from '../../../assetsOficial/jorgegas.svg';
import vectorDerecho from '../../../assetsOficial/vectorDerecho2.svg';
import 'react-datepicker/dist/react-datepicker.css';
import style from './personalSellTable.module.css'

registerLocale('es', es);

const PersonalSellTable = () => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch()
    const [date , setDate] = useState(new Date())
    const soloFecha = date.toISOString().slice(0, 10);

    useEffect(() => {
        dispatch(bringOrdenByAdminId(usuario.administrador.id, soloFecha))
    }, [dispatch, usuario.administrador.id, soloFecha])

    const { ordenDeRepartos } = useSelector(state => state.Nova.novaOrdenes)

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
                        selected={date}
                        onChange={(date) => setDate(date)}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        placeholderText='Seleccione una fecha'
                        maxDate={new Date()}
                        className={style.classDatePicker}
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
                            {ordenDeRepartos?.map((orden, index) => (
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
