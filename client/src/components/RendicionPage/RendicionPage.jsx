import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { Input }  from 'reactstrap';
import { bringOrdenById, ordenesRendicion, bringOrdenByAdminId, bringAllAdministradores } from '../../redux/novaSlice/thunks';
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
import { RiFileExcel2Fill } from 'react-icons/ri';
import XLSX from 'xlsx';

registerLocale('es', es);

const RendicionPage = () => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch()
    const [ordenId , setOrdenId] = useState(0)
    const [ordenIdAdmin , setOrdenIdAdmin] = useState(0)
    const { ordenesRendidas, novaOrdenById, precios, administradores } = useSelector(state => state.Nova)
    const { email } = useSelector(state => state.Autenticacion.autBack)
    const precio5kg = precios?.filter(precio => precio.name === "GAS NORMAL 5 KILOS");
    const precio11kg = precios?.filter(precio => precio.name === "GAS NORMAL 11 KILOS");
    const precio15kg = precios?.filter(precio => precio.name === "GAS NORMAL 15 KILOS");
    const precio45kg = precios?.filter(precio => precio.name === "GAS NORMAL 45 KILOS");
    const preciosArray = [precio5kg[0]?.precio, precio11kg[0]?.precio, precio15kg[0]?.precio, precio45kg[0]?.precio];
    const [date , setDate] = useState(new Date())
    const soloFecha = date.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');

    const tabla1Ref = useRef(null);
    const tabla2Ref = useRef(null);
    const tabla3Ref = useRef(null);
    const tabla4Ref = useRef(null);

    const handleExportExcel = () => {
        
        const tabla1Data = [...tabla1Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla2Data = [...tabla2Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla3Data = [...tabla3Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla4Data = [...tabla4Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));

        const libroExcel = XLSX.utils.book_new();
        const hoja1 = XLSX.utils.aoa_to_sheet(tabla1Data);
        const hoja2 = XLSX.utils.aoa_to_sheet(tabla2Data);
        const hoja3 = XLSX.utils.aoa_to_sheet(tabla3Data);
        const hoja4 = XLSX.utils.aoa_to_sheet(tabla4Data);

        XLSX.utils.book_append_sheet(libroExcel, hoja1, "rendicion-tarros");
        XLSX.utils.book_append_sheet(libroExcel, hoja2, "efectivo");
        XLSX.utils.book_append_sheet(libroExcel, hoja3, "vales");
        XLSX.utils.book_append_sheet(libroExcel, hoja4, "opcionales");

        const nombreChofer = ordenesRendidas?.filter(orden => orden.id === Number(ordenId))[0]?.chofer.personal.name;
        const apellidoChofer = ordenesRendidas?.filter(orden => orden.id === Number(ordenId))[0]?.chofer.personal.lastname;
        const nombreAyudante = ordenesRendidas?.filter(orden => orden.id === Number(ordenId))[0]?.ayudante.personal.name;
        const apellidoAyudante = ordenesRendidas?.filter(orden => orden.id === Number(ordenId))[0]?.ayudante.personal.lastname;

        XLSX.utils.sheet_add_json(hoja1, [
            {A: ` `},
            {A: `Rendicion de ${usuario.name} ${usuario.lastname} - ${soloFecha}`},
            {A: `Chofer: ${nombreChofer} ${apellidoChofer}`},
            {A: `Ayudante: ${nombreAyudante} ${apellidoAyudante}`},
            {A: `Orden: ${ordenId}`},
        ], {skipHeader: true, origin: -1, header: ['A']});   

        XLSX.writeFile(libroExcel, `Rendicion-${usuario.name} ${usuario.lastname}-${soloFecha}-${nombreChofer} ${apellidoChofer}-${nombreAyudante} ${apellidoAyudante}.xlsx`);
    }

    useEffect(() => {
        if(email === "irmaperez.gea@gmail.com" || "maicol.nieto@jorgegas.cl") {
            dispatch(bringAllAdministradores())
            dispatch(bringOrdenByAdminId(ordenIdAdmin, soloFecha))
        } else {
            dispatch(bringOrdenByAdminId(usuario?.administrador?.id, soloFecha))
        }
    }, [
        dispatch,
        usuario.administrador.id,
        soloFecha,
        novaOrdenById?.contabilidadRecarga?.totalRecaudacion,
        email,
        ordenIdAdmin
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
                {
                    email === "irmaperez.gea@gmail.com" || "maicol.nieto@jorgegas.cl" ? (
                        
                        <Input
                            type="select"
                            value={ordenIdAdmin}
                            onChange={(e) => setOrdenIdAdmin(e.target.value)}
                            className={style.inputs2}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(bringOrdenByAdminId(ordenIdAdmin, soloFecha))
                            }}
                        >
                            <option hidden>Seleccione un administrador :</option>
                            {
                                administradores?.map((admin) => (
                                    <option key={admin.administrador.id} value={admin.administrador.id}>
                                        {
                                            `${admin.name} ${admin.lastname}`
                                        }
                                    </option>
                                ))
                            }
                        </Input>

                    ) : null
                }
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
                                    `#${orden.id} Patente: ${orden.patente.name} 
                                    Cuadrante: ${orden.cuadrante.name} - 
                                    ${orden.chofer.personal.name} ${orden.chofer.personal.lastname}`
                                }
                                {
                                    orden.ayudante ?
                                    ` y ${orden?.ayudante?.personal?.name} ${orden?.ayudante?.personal?.lastname}` :
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
                <button onClick={handleExportExcel} className={style.excel}>
                    <RiFileExcel2Fill className={style.icon3} />
                    <p>Exportar a excel</p>
                </button>
                <div className={style.tableContainer}>
                    <table 
                        className="table-sm table table-bordered table-hover" 
                        ref={tabla1Ref}
                    >
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Recargas</th>
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
                                <td className={style.tdStyle}>
                                    {
                                        novaOrdenById?.recargas?.map((recarga) => (
                                            <span key={recarga.id} className={style.tdclas}>
                                                {recarga.cantidad5kg} &nbsp;
                                            </span>
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
                                <td style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle'
                                    }}>
                                        <p>Gas 11 kilos</p>
                                </td>
                                <td className={style.tdStyle}>
                                    {
                                        novaOrdenById?.recargas?.map((recarga) => (
                                            <p key={recarga.id} className={style.tdclas}>
                                                {recarga.cantidad11kg} &nbsp;
                                            </p>
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
                                <td style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle'
                                    }}>
                                        <p>Gas 15 kilos</p>
                                </td>
                                <td className={style.tdStyle}>
                                    {
                                        novaOrdenById?.recargas?.map((recarga) => (
                                            <p key={recarga.id} className={style.tdclas}>
                                                    {recarga.cantidad15kg} &nbsp;
                                            </p>
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
                                <td style={{
                                    textAlign: 'center',
                                    verticalAlign: 'middle'
                                    }}>
                                        <p>Gas 45 kilos</p>
                                </td>
                                <td className={style.tdStyle}>
                                    {
                                        novaOrdenById?.recargas?.map((recarga) => (
                                            <p key={recarga.id} className={style.tdclas}>
                                                {recarga.cantidad45kg} &nbsp;
                                            </p>
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
                    </table>   
                </div> 
                {
                    novaOrdenById?.rendida === false ? (
                        <Cuadratura novaOrdenById={novaOrdenById} />
                    ) : null
                }
                <RecaudacionOrden novaOrdenById={novaOrdenById} />
                <OrdenInfo novaOrdenById={novaOrdenById} />
                <div className={style.containerTables}>
                    <TableVales novaOrdenById={novaOrdenById} tabla3Ref={tabla3Ref}/>
                    <TableEfectivo novaOrdenById={novaOrdenById} tabla2Ref={tabla2Ref}/>
                </div>
                <TablePayment novaOrdenById={novaOrdenById} tabla4Ref={tabla4Ref}/>
            </div>
        </div>
    )
}

export default RendicionPage
