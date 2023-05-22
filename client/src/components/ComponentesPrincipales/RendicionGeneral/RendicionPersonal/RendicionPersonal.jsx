import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'reactstrap'
import DatePicker, { registerLocale } from 'react-datepicker';
import { ordenesRendicionBetween, bringOrdenesChoferById, bringOrdenesAyudanteById, bringChoferes, bringAyudantes, } from '../../../../redux/novaSlice/thunks'
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
    //const [ayudanteId, setAyudanteId] = useState(null);
    
    const onChangeDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const onChangeChofer = (choferId) => {
        setChoferId(choferId);
        console.log('choferId', choferId);
    }

    useEffect(() => {
        dispatch(ordenesRendicionBetween(soloFecha, soloFechaFin));
        dispatch(bringOrdenesChoferById(choferId, soloFecha, soloFechaFin));
        dispatch(bringChoferes());
        dispatch(bringAyudantes());
    }, [dispatch, soloFecha, soloFechaFin, choferId])

    const { ordenesRendidasDisponibles, choferes, ayudantes, ordenesChoferById } = useSelector(state => state.Nova)
    console.log( 'ordenesChoferById', ordenesChoferById)

    const width = window.innerWidth;
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(width > 1800 ? 18 : 12)
    const [hasMore, setHasMore] = useState(true)
    const maximo = ordenesRendidasDisponibles?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = ordenesRendidasDisponibles?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 9
        )
    }

    //FEATURE ORDENES POR PERSONAL

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const optionsChoferes = choferes?.map((chofer) => {
        return {
            choferId: chofer?.chofer?.id,
            label: `${chofer?.name} ${chofer?.lastname}`
        }
    });

    const optionsAyudantes = ayudantes?.map((ayudante) => {
        return {
            ayudanteId: ayudante?.ayudante?.id,
            label: `${ayudante?.name} ${ayudante?.lastname}`
        }
    });

    const optionsPersonal = [];

    optionsChoferes.forEach((chofer) => {
        const existingPersonal = optionsPersonal.find((personal) => personal.label === chofer.label);
        if (existingPersonal){
            existingPersonal.choferId = chofer.choferId;
        } else {
            optionsPersonal.push({ choferId: chofer.choferId, label: chofer.label });
        }
    });

    optionsAyudantes.forEach((ayudante) => {
        const existingPersonal = optionsPersonal.find((personal) => personal.label === ayudante.label);
        if (existingPersonal){
            if(!existingPersonal.ayudanteId){
                existingPersonal.ayudanteId = ayudante.ayudanteId;
            }
        } else {
            optionsPersonal.push({ ayudanteId: ayudante.ayudanteId, label: ayudante.label });
        }
    });



    //EXCEL

    const handleExportExcelPopulate = async () => {
        const data = ordenesRendidasDisponibles?.map((post) => {
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
                <div className={style.selectPersonal}>
                    <Select
                        name="personal"
                        //className={style.classFindByPersonal}
                        options={optionsPersonal}
                        placeholder="Personal"
                        isMenuOpen={isMenuOpen}
                        onMenuOpen={onMenuOpen}
                        onMenuClose={onMenuClose}
                        onChange={(e) => {
                            onChangeChofer(e.choferId);
                        }}
                    />
                </div>
                <Link to="/rendicionGeneral">
                    <button className={style.button}>
                        <img src={vectorDerecho} alt="vector" className={style.vectorDerecho} />
                        Rendicion General
                    </button>
                </Link>
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
                                    <th>Cilindros</th>
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
