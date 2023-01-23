import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import { bringOrdenByAdminId } from '../../redux/novaSlice/thunks';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import CreateOrden from '../CreateOrden/CreateOrden';
import OrdenList from '../OrdenList/OrdenList';
import DownloadOrden from '../DownloadOrden/DownloadOrden';
import style from './guidePage.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

registerLocale('es', es);

const GuidePage = () => {

    const dispatch = useDispatch();
    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const [date, setDate] = useState(new Date());
    const soloFecha = date.toISOString().slice(0, 10);

    useEffect(() => {
        dispatch(bringOrdenByAdminId(usuario.administrador.id, soloFecha));
    }, [dispatch, usuario.administrador.id, soloFecha]);

    const { novaOrdenes } = useSelector((state) => state.Nova);

    return (
        <div>
            <p className={style.text}>Guia de reparto</p>
            <img src={JorgeGas} alt="jorgeGas" className={style.icon}/>
            <div className={style.container}>
                <div className={style.datePicker}>
                    <p style={{
                        color: '#000000',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                    }}
                    >
                        Seleccione una fecha
                    </p>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        placeholderText="Seleccione una fecha"
                        maxDate={new Date()}
                        className={style.classDatePicker}
                        onClickOutside={() => dispatch(bringOrdenByAdminId(usuario.administrador.id, soloFecha))}
                    />
                </div>
                    <CreateOrden/>
                    <DownloadOrden/>
                <div className={style.tableContainer}>
                    <Table
                        bordered
                        hover
                        responsive
                        className={style.tabla}
                    >
                        <thead>
                            <tr>
                                <th>Numero de orden</th>
                                <th>Fecha</th>
                                <th>Cantidad tarrones</th>
                                <th>Patente</th>
                                <th>Chofer</th>
                                <th>Peoneta</th>
                                <th>Comuna</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody
                            style={{
                                overflowY: 'scroll',
                            }}
                        >
                            {novaOrdenes.ordenDeRepartos?.map((orden) => (
                                <OrdenList
                                    key={orden.id}
                                    id={orden.id}
                                    fecha={orden.fecha}
                                    totalCantidad={orden.contabilidadRecarga?.totalCantidad}
                                    patente={orden.patente?.name}
                                    chofer={orden.chofer?.personal?.name + ' ' + orden.chofer?.personal?.lastname }
                                    ayudante={orden.ayudante?.personal?.name + ' ' + orden.ayudante?.personal?.lastname}
                                    cuadrante={orden.cuadrante?.name}
                                    estado={orden?.estado === true ? 'Activa' : 'Descargada'}
                                    recargas={orden.recargas}
                                    contabilidadRecarga={orden.contabilidadRecarga}
                                    metodoPagos={orden.metodoPagos}
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default GuidePage
