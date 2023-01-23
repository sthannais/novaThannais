import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { Input, Table }  from 'reactstrap';
import { bringOrdenById, ordenesRendicion, bringOrdenByAdminId } from '../../redux/novaSlice/thunks';
import 'bootstrap/dist/css/bootstrap.css';
import style from './rendicionPage.module.css';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoWarning } from 'react-icons/io5';
import TablePayment from '../TablesPayments/TableGeneral/TableGeneral';
import TableEfectivo from '../TablesPayments/TableEfectivo/TableEfectivo';
import TableVales from '../TablesPayments/TableVales/TableVales';
import RecaudacionOrden from '../TablesPayments/RecaudacionOrden/RecaudacionOrden';
import OrdenInfo from '../TablesPayments/OrdenInfo/OrdenInfo';
import Cuadratura from '../Cuadratura/Cuadratura';
import { numberWithDots } from '../../helpers/numberWithDot';
import ModifyOrden from '../ModifyOrden/ModifyOrden';

registerLocale('es', es);

const RendicionPage = () => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch()
    const [ordenId , setOrdenId] = useState(0)
    const { ordenesRendidas, novaOrdenById, precios } = useSelector(state => state.Nova)
    const precio5kg = precios?.filter(precio => precio.name === "GAS NORMAL 5 KILOS");
    const precio11kg = precios?.filter(precio => precio.name === "GAS NORMAL 11 KILOS");
    const precio15kg = precios?.filter(precio => precio.name === "GAS NORMAL 15 KILOS");
    const precio45kg = precios?.filter(precio => precio.name === "GAS NORMAL 45 KILOS");
    const preciosArray = [precio5kg[0]?.precio, precio11kg[0]?.precio, precio15kg[0]?.precio, precio45kg[0]?.precio];
    const [date , setDate] = useState(new Date())
    const soloFecha = date.toISOString().slice(0, 10);

    useEffect(() => {
        dispatch(bringOrdenByAdminId(usuario.administrador.id, soloFecha))
    }, [
        dispatch,
        usuario.administrador.id,
        soloFecha,
        novaOrdenById?.contabilidadRecarga?.totalRecaudacion
    ])

    const dispatchOrden = () => {
        dispatch(bringOrdenById(ordenId))
        dispatch(ordenesRendicion())
    }
    return (
        <div className={style.conenedor}>
            <p className={style.text}>Rendicion de gastos</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <Input
                    type="select"
                    value={ordenId}
                    onChange={(e) => setOrdenId(e.target.value)}
                    onClick={dispatchOrden}
                    className={style.inputs}
                >
                    <option hidden>Seleccione una orden :</option>
                    {
                        ordenesRendidas?.map((orden) => (
                            <option key={orden.id} value={orden.id}>
                                {
                                    `#${orden.id}` + " " + 
                                    `Patente: ${orden.patente.name}` + " " + 
                                    `Cuadrante: ${orden.cuadrante.name}` + " - " + 
                                    `${orden.chofer.personal.name}` + " " + 
                                    `${orden.chofer.personal.lastname}` + " "  
                                }{
                                    orden.ayudante ? "y" + " " + 
                                    `${orden?.ayudante?.personal?.name}` + " " + 
                                    `${orden?.ayudante?.personal?.lastname}` :
                                    null
                                }
                            </option>
                        ))
                    }
                </Input>
                <div className={style.datePicker}>
                    <p  className={style.textDatePicker}>
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
                        onClickOutside={() => dispatch(bringOrdenByAdminId(usuario.administrador.id, soloFecha))}	
                    />
                </div>
                {
                    novaOrdenById?.rendida === true? (
                        <>
                            <p className={style.info}>
                                Cuadrada
                            </p>
                            <BsFillCheckCircleFill className={style.icon} />
                        </>
                    ) : (
                        <>
                            <p className={style.info}>
                                Por cuadrar
                            </p>
                            <IoWarning className={style.icon2} />
                        </>
                    )
                }
                <ModifyOrden novaOrdenById={novaOrdenById} ordenId={ordenId}/>
                <div className={style.tableContainer}>
                    <Table 
                        bordered
                        hover   
                        responsive
                        className="table-sm" 
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
                                            <th key={recarga.id} className={style.tdclas}>
                                                {recarga.cantidad5kg}
                                            </th>
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
                                            <th key={recarga.id} className={style.tdclas}>
                                                {recarga.cantidad11kg}
                                            </th>
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
                                            <th key={recarga.id} className={style.tdclas}>
                                                    {recarga.cantidad15kg}
                                            </th>
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
                                            <th key={recarga.id} className={style.tdclas}>
                                                {recarga.cantidad45kg}
                                            </th>
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
                        </tbody>
                    </Table>   
                </div> 
                {
                    novaOrdenById?.rendida === false ? (
                        <Cuadratura novaOrdenById={novaOrdenById} />
                    ) : null
                }
                <RecaudacionOrden novaOrdenById={novaOrdenById} />
                <OrdenInfo novaOrdenById={novaOrdenById} />
                <div className={style.containerTables}>
                    <TableVales novaOrdenById={novaOrdenById} />
                    <TableEfectivo novaOrdenById={novaOrdenById} />
                </div>
                <TablePayment novaOrdenById={novaOrdenById} />
            </div>
        </div>
    )
}

export default RendicionPage
