import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'reactstrap'
import DatePicker, { registerLocale } from 'react-datepicker';
import { ordenesRendicionBetween, bringOrdenesByPersonalAndDate, bringChoferesYAyudantes } from '../../../../redux/novaSlice/thunks'
import es from 'date-fns/locale/es';
import { numberWithDots } from '../../../../helpers/numberWithDot';
import { RiFileExcel2Fill } from 'react-icons/ri';
import JorgeGas from '../../../../assetsOficial/jorgegas.svg';
import vectorDerecho from '../../../../assetsOficial/vectorDerecho2.svg';
import 'react-datepicker/dist/react-datepicker.css';
import style from './rendicionPersonal.module.css'
import InfiniteScroll from 'react-infinite-scroller';
import * as XLSXPopulate from 'xlsx-populate/browser/xlsx-populate';
import Select from 'react-select';

registerLocale('es', es);

const RendicionPersonal = ({id}) => {

    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const soloFecha = startDate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const soloFechaFin = endDate?.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }).split('-').reverse().join('-');
    const [choferId, setChoferId] = useState(null);
    const [ayudanteId, setAyudanteId] = useState(null); 
    const [selectedOption, setSelectedOption] = useState(null);
    const [mostrarTodo, setMostrarTodo] = useState(false); 
    
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setMostrarTodo(false);
    }
    //FEATURE ORDENES POR PERSONAL
    useEffect(() => {
        dispatch(ordenesRendicionBetween(soloFecha, soloFechaFin));
        dispatch(bringChoferesYAyudantes());      
        if(choferId || ayudanteId || !choferId && !ayudanteId && mostrarTodo){
            if (typeof choferId === 'undefined') {
                setChoferId(0);
            }
            if (typeof ayudanteId === 'undefined') {
                setAyudanteId(0);
            }
            dispatch(bringOrdenesByPersonalAndDate(choferId, ayudanteId, soloFecha, soloFechaFin));
        }
    }, [dispatch, soloFecha, soloFechaFin, choferId, ayudanteId])
    

    const { ordenesRendidasDisponibles, choferesYAyudantes, ordenesPersonal } = useSelector(state => state.Nova)

    let advertencia = "";
    let totalTarros = "";
    let ordenesToRender;
    if (ordenesPersonal?.length > 0) {
        ordenesToRender = ordenesPersonal;
        let nombre;
        let sumaTarros = ordenesPersonal?.reduce((acc, curr) => {
            return acc + Number(curr.contabilidadRecarga.totalCantidad)
        }, 0);
        if(ordenesPersonal[0]?.chofer?.id == choferId){
            nombre = `${ordenesPersonal[0]?.chofer?.personal?.name} ${ordenesPersonal[0]?.chofer?.personal?.lastname}`;
        } else if (ordenesPersonal[0]?.ayudante?.id == ayudanteId) {
            nombre = `${ordenesPersonal[0]?.ayudante?.personal?.name} ${ordenesPersonal[0]?.ayudante?.personal?.lastname}`;
        }
        totalTarros = `La suma total de los tarros de ${nombre} es: ${sumaTarros}`;
    }else if (ordenesPersonal?.length === 0 && choferId !== null && ayudanteId !== null) {
        ordenesToRender = [];
        advertencia = "Empleado sin ordenes";
    }else {
        ordenesToRender = ordenesRendidasDisponibles;
    }
    const width = window.innerWidth;
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(width > 1800 ? 18 : 12)
    const [hasMore, setHasMore] = useState(true)
    const maximo = ordenesToRender?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = ordenesToRender?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 9
        )
    }

    const onChangePersonal = (e) => {
        const searchedPersonal = choferesYAyudantes.find(item => item.id === e.value);
        const choferId = searchedPersonal?.chofer?.id;
        const ayudanteId = searchedPersonal?.ayudante?.id;
        setChoferId(choferId);
        setAyudanteId(ayudanteId);
        setSelectedOption(e);
        setMostrarTodo(false);
    };

    const limpiarPersonal = () => {
        setChoferId(null);
        setAyudanteId(null);
        setSelectedOption(null);
        setMostrarTodo(true);
    };

    //FEATURE ORDENES POR PERSONAL

    const optionsPersonal = choferesYAyudantes?.map((personal) => {  
        return {
            value: personal?.id,
            label: `${personal?.name} ${personal?.lastname}`
        }
    }
);


    //EXCEL

    const handleExportExcelPopulate = async () => {
        const data = ordenesToRender?.map((post) => {
            return {
                'Numero de orden': post.id,
                'Fecha': post.fecha,
                'chofer': post?.chofer?.personal?.name + ' ' + post.chofer?.personal?.lastname,
                'peoneta': post?.ayudante?.personal?.name && post?.ayudante?.personal?.lastname ? 
                post?.ayudante?.personal?.name + ' ' + post?.ayudante?.personal?.lastname : 
                'Sin peoneta',
                '5kg': Number(post.contabilidadRecarga.ventas5kg),
                '11kg': Number(post.contabilidadRecarga.ventas11kg),
                '15kg': Number(post.contabilidadRecarga.ventas15kg),
                '45kg': Number(post.contabilidadRecarga.ventas45kg),
                'Cilindros': Number(post.contabilidadRecarga.totalCantidad),
                'Total': Number(post.contabilidadRecarga.totalRecaudacion),
            };
        });
        const saveAs = function (blob, fileName) {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        }

        const wb = await XLSXPopulate.fromBlankAsync();
        const ws = wb.sheet(0);
        ws.name('Rendicion de personal');

        //dejo la fila 1 en blanco
        ws.row(2).height(20);

        //le agrego width a las columnas 
        ws.column(1).width(20);
        ws.column(2).width(10);
        ws.column(3).width(20);
        ws.column(4).width(15);
        ws.column(5).width(20);
        ws.column(6).width(20);
        ws.column(7).width(15);
        ws.column(8).width(15);
        ws.column(10).width(15);

        ws.row(2).cell(1).value('Numero de orden').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(2).value('Fecha').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(3).value('Chofer').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(4).value('Peoneta').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(5).value('5kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(6).value('11kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(7).value('15kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(8).value('45kg').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(9).value('Cilindros').style({
            border: true,
            fill: '8d99ae',
            bold : true
        })
        ws.row(2).cell(10).value('Total').style({
            border: true,
            fill: '8d99ae',
            bold : true,
            numberFormat: '$#,##0'
        })
        
        for(let i = 0; i < data.length; i++) {
            //le agrego el valor a cada celda y le doy formato a la celda de tipo numero
            ws.row(i + 3).cell(1).value(data[i]['Numero de orden']);
            ws.row(i + 3).cell(2).value(data[i]['Fecha']);
            ws.row(i + 3).cell(3).value(data[i]['chofer']);
            ws.row(i + 3).cell(4).value(data[i]['peoneta']);
            ws.row(i + 3).cell(5).value(data[i]['5kg']);
            ws.row(i + 3).cell(6).value(data[i]['11kg']);
            ws.row(i + 3).cell(7).value(data[i]['15kg']);
            ws.row(i + 3).cell(8).value(data[i]['45kg']);
            ws.row(i + 3).cell(9).value(data[i]['Cilindros']);
            ws.row(i + 3).cell(10).value(data[i]['Total']).style({
                numberFormat: '$#,##0'
            });
        }

        wb.outputAsync().then(function (blob) {
            saveAs(blob, `Rendicion de personal ${usuario.name} ${usuario.lastname} ${soloFecha} ${soloFechaFin ? "- " + soloFechaFin: "" }.xlsx`);
        });

    };

    return (
        <div>
            <p className={style.text}>Rendicion del personal</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <Link to="/rendicionGeneral">
                    <button className={style.button}>
                        <img src={vectorDerecho} alt="vector" className={style.vectorDerecho} />
                        Rendicion General
                    </button>
                </Link>
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
                <div className={style.inputPerson}>
                    <Select
                        name="personal"
                        className={style.personalPicker}
                        options={optionsPersonal}
                        placeholder="Personal"
                        value={selectedOption}
                        onChange={(e) => {
                            onChangePersonal(e);
                        }}
                    />  
                    
                </div>
                <button className={style.buttonClean}  onClick={limpiarPersonal}>
                    Mostrar Todo
                </button>            
                <button onClick={handleExportExcelPopulate} className={style.excel}>
                    <RiFileExcel2Fill className={style.icon3} />
                    <p>Exportar a excel</p>
                </button>
                <div className={style.tableContainer}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={hasMore}
                    >
                        <Table
                            bordered
                            hover
                            responsive
                            className="table"
                            id={id}
                        >
                            <thead>
                                <tr>
                                    <th>Numero de orden</th>
                                    <th>Fecha</th>
                                    <th>Chofer</th>
                                    <th>Peoneta</th>
                                    <th>5kg</th>
                                    <th>11kg</th>
                                    <th>15kg</th>
                                    <th>45kg</th>
                                    <th>Tarros</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody
                                style={{
                                    overflowY: 'scroll',
                                }}
                            >
                                {currentPosts?.map((orden, index) => (
                                    <tr key={index}>
                                        <td>{orden.id}</td>
                                        <td>{orden.fecha}</td>
                                        <td>{orden.chofer.personal.name + " " + orden.chofer.personal.lastname}</td>
                                        <td>{orden.ayudante ? orden.ayudante.personal.name + " " + orden.ayudante.personal.lastname : "Sin peoneta"}</td>
                                        <td>{Number(orden.contabilidadRecarga.ventas5kg)}</td>
                                        <td>{Number(orden.contabilidadRecarga.ventas11kg)}</td>
                                        <td>{Number(orden.contabilidadRecarga.ventas15kg)}</td>
                                        <td>{Number(orden.contabilidadRecarga.ventas45kg)}</td>
                                        <td>{Number(orden.contabilidadRecarga.totalCantidad)}</td>
                                        <td>{orden.contabilidadRecarga.totalRecaudacion ? numberWithDots(orden.contabilidadRecarga.totalRecaudacion) : 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    <p className={style.textAdvertencia}>
                        { advertencia }
                    </p>
                    <p className={style.totalTarros}>
                        { totalTarros }
                    </p>
                    </InfiniteScroll>
                </div>
                <button onClick={loadMore} className={style.boton}>
                    Cargar mas
                </button>
            </div>
        </div>
    )
}

export default RendicionPersonal
