import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { bringCuadratura, bringAllFaltantes, bringCuadratura2 } from '../../redux/novaSlice/thunks';
import { Input } from 'reactstrap';
import style from './rendicionGeneral.module.css'
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import 'react-datepicker/dist/react-datepicker.css';
import EfectivoTable from '../RendicionTables/EfectivoTable/EfectivoTable';
import TarrosTable from '../RendicionTables/TarrosTable/TarrosTable';
import ValesTable from '../RendicionTables/ValesTable/ValesTable';
import MetodosTable from '../RendicionTables/MetodosTable/MetodosTable';
import ResumenTable from '../RendicionTables/ResumenTable/ResumenTable';


registerLocale('es', es)

const RendicionGeneral = () => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const [startDate , setStartDate] = useState(new Date())
    const [endDate , setEndDate] = useState(null)
    const soloFecha = startDate.toISOString().slice(0, 10);
    const soloFechaFin = endDate?.toISOString().slice(0, 10);
    
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const [id, setId] = useState(0)

    const dispatch = useDispatch()
    const { cuadratura, faltantes } = useSelector(state => state.Nova)

    useEffect(() => {
        // setId(usuario.administrador.id)
        dispatch(bringCuadratura2(soloFecha, soloFechaFin, id))
        dispatch(bringAllFaltantes(soloFecha, soloFechaFin, id))
    }, [dispatch, soloFecha, soloFechaFin, id, usuario.administrador.id])

    return (
        <div>
            <p className={style.text}>Rendicion de gastos</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <Link to="/personalSellTable">
                    <button className={style.button}>Rendicion del Personal</button>
                </Link>
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
                    onClick={() => {
                        dispatch(bringCuadratura2(soloFecha, soloFechaFin, id))
                        dispatch(bringAllFaltantes(soloFecha, soloFechaFin, id))
                    }} 
                >
                    <option hidden>Seleccione una rendicion </option>
                    <option value={usuario.administrador.id}>Mi rendicion</option>
                    <option value="all">Todas las rendiciones</option>
                </Input>
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
                        inline
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        className={style.classDatePicker}
                        onInputClick={(e) => {
                            e.preventDefault()
                            dispatch(bringCuadratura2(soloFecha, soloFechaFin, id))
                            dispatch(bringAllFaltantes(soloFecha, soloFechaFin, id))
                        }}	
                    />
                </div>
                <EfectivoTable cuadratura={cuadratura}/>
                <TarrosTable cuadratura={cuadratura}/>
                <ValesTable cuadratura={cuadratura}/>
                <MetodosTable cuadratura={cuadratura} />
                <ResumenTable cuadratura={cuadratura} faltantes={faltantes}/>
            </div>
        </div>
    )
}

export default RendicionGeneral
