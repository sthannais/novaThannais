import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { bringAllFaltantes, bringCuadratura2, bringAllAdministradores, descargarExcelOrdenesPorFecha, descargarExcelVentaDeTarros } from '../../../redux/novaSlice/thunks';
import { Input } from 'reactstrap';
import style from './rendicionGeneral.module.css'
import JorgeGas from '../../../assetsOficial/jorgegas.svg';
import SinAcceso from '../../ComponentesAuxiliares/SinAcceso/SinAcceso';
import 'react-datepicker/dist/react-datepicker.css';
import EfectivoTable from './TablasRendicion/EfectivoTabla/EfectivoTabla';
import TarrosTable from './TablasRendicion/TarrosTabla/TarrosTabla';
import ValesTable from './TablasRendicion/ValesTabla/ValesTabla';
import MetodosTable from './TablasRendicion/MetodosTabla/MetodosTabla';
import ResumenTable from './TablasRendicion/ResumenTabla/ResumenTabla';
import { RiFileExcel2Fill, RiFileExcel2Line } from 'react-icons/ri';
import { BsPersonVcardFill } from 'react-icons/bs';
import XLSX from 'xlsx';

registerLocale('es', es)

const RendicionGeneral = () => {

    const width = window.innerWidth;
    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const { email } = useSelector(state => state.Autenticacion.autBack)
    console.log(email)
    const [startDate , setStartDate] = useState(new Date())
    const [endDate , setEndDate] = useState(null)
    const soloFecha = startDate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const soloFechaFin = endDate?.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const [id, setId] = useState(0)
    const dispatch = useDispatch()
    const { cuadratura, faltantes, administradores } = useSelector(state => state.Nova)

    const tabla1Ref = useRef(null);
    const tabla2Ref = useRef(null);
    const tabla3Ref = useRef(null);
    const tabla4Ref = useRef(null);
    const tabla5Ref = useRef(null);

    const handleExportExcel = () => {
        const tabla1 = [...tabla1Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla2 = [...tabla2Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla3 = [...tabla3Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla4 = [...tabla4Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));
        const tabla5 = [...tabla5Ref.current.querySelectorAll("tr")].map(row => [...row.querySelectorAll("td,th")].map(cell => cell.innerText));

        const ws1 = XLSX.utils.aoa_to_sheet(tabla1);
        const ws2 = XLSX.utils.aoa_to_sheet(tabla2);
        const ws3 = XLSX.utils.aoa_to_sheet(tabla3);
        const ws4 = XLSX.utils.aoa_to_sheet(tabla4);
        const ws5 = XLSX.utils.aoa_to_sheet(tabla5);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws1, 'Efectivo');
        XLSX.utils.book_append_sheet(wb, ws2, 'Tarros');
        XLSX.utils.book_append_sheet(wb, ws3, 'Vales');
        XLSX.utils.book_append_sheet(wb, ws4, 'Metodos');
        XLSX.utils.book_append_sheet(wb, ws5, 'Resumen');

        XLSX.writeFile(wb, `Rendicion de gastos ${soloFecha} ${soloFechaFin ? "al " + soloFechaFin : ""}.xlsx`);
    }

    useEffect(() => {
        dispatch(bringAllAdministradores())
        dispatch(bringCuadratura2(soloFecha, soloFechaFin, id))
        dispatch(bringAllFaltantes(soloFecha, soloFechaFin, id))
    }, [dispatch, soloFecha, soloFechaFin, id])

    if(usuario.administrador === null) return <SinAcceso />

    return (
        <div>
            <p className={style.text}>Rendición general</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                {
                    width > 800 ? (
                        <Link to="/rendicionPersonal">
                            <button className={style.button}>Rendicion del Personal</button>
                        </Link>
                    ) : null
                }
                <Input
                    type="select"
                    name="id"
                    id="id"
                    className={style.selected}
                    value={id}
                    onChange={(e) => {
                        e.preventDefault()
                        setId(e.target.value)
                    }}
                >
                    <option hidden>Seleccione una rendicion </option>
                    {administradores?.map((admin) => (
                        <option key={admin.id} value={admin.id}>{admin.personal.name + " " + admin.personal.lastname}</option>
                    ))}
                    <option value="all">Todas las rendiciones</option>
                </Input>
                {
                    width > 800 ? (
                        <>
                            <button className={style.excel3} onClick={
                                () => {
                                    dispatch(descargarExcelVentaDeTarros(soloFecha, soloFechaFin))
                                }
                            }>
                                <BsPersonVcardFill className={style.icon3} />
                                <p>Excel venta tarros</p>
                            </button>
                            <button onClick={
                                () => {
                                    dispatch(descargarExcelOrdenesPorFecha(soloFecha, soloFechaFin))
                                }
                            } className={style.excel2}>
                                <RiFileExcel2Line className={style.icon3} />
                                <p>Excel por fecha</p>
                            </button>
                            <button onClick={handleExportExcel} className={style.excel}>
                                <RiFileExcel2Fill className={style.icon3} />
                                <p>Excel General</p>
                            </button>
                        </>
                    ) : null
                }
                <div className={style.datePicker}>
                    <p className={style.textDatePicker}>
                        Seleccione un rango de fechas
                    </p>
                    <DatePicker
                        selected={startDate}
                        onChange={onChangeDate}
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        className={style.classDatePicker}
                    />
                </div>
                {
                    width > 800 && email !== "bodega@jorgegas.cl" ? (
                        <>
                            <TarrosTable cuadratura={cuadratura} tablaRef={tabla2Ref}/>
                            <EfectivoTable cuadratura={cuadratura} tablaRef={tabla1Ref}/>
                            <ValesTable cuadratura={cuadratura} tablaRef={tabla3Ref}/>
                            <MetodosTable cuadratura={cuadratura} tablaRef={tabla4Ref}/>
                            <ResumenTable cuadratura={cuadratura} faltantes={faltantes} tablaRef={tabla5Ref}/>
                        </>
                    ) : (
                        <TarrosTable cuadratura={cuadratura} tablaRef={tabla2Ref}/>
                    )
                }
            </div>
        </div>
    )
}

export default RendicionGeneral
