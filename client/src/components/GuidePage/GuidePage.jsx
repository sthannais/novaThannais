import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import { bringOrdenByAdminId, getAllOrdenes } from '../../redux/novaSlice/thunks';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import CreateOrden from '../CreateOrden/CreateOrden';
import OrdenList from '../OrdenList/OrdenList';
import DownloadOrden from '../DownloadOrden/DownloadOrden';
import ListaDePrecios from '../ListaDePrecios/ListaDePrecios';
import Patentes from '../Pantetes/Patentes';
import style from './guidePage.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { RiFileExcel2Fill } from 'react-icons/ri';
import XLSX from 'xlsx';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

registerLocale('es', es);
const GuidePage = () => {

    const dispatch = useDispatch();
    const { novaOrdenes } = useSelector((state) => state.Nova);
    const { email } = useSelector(state => state.Autenticacion.autBack)
    const { usuario } = JSON.parse(localStorage.getItem('usuario'));
    
    const [date, setDate] = useState(new Date());
    const fechaChile = date.toLocaleString('es-CL', { timeZone: 'America/Santiago' });
    const soloFecha = moment(fechaChile).format('YYYY-MM-DD');

    const width = window.innerWidth;

    ///// PAGINADO /////
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(width > 1800 ? 18 : 12)
    const [hasMore, setHasMore] = useState(true)
    const maximo = novaOrdenes?.ordenDeRepartos?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = novaOrdenes?.ordenDeRepartos?.slice(primerIndice, ultimoIndice)

    const loadMore = () => {
        if (paginaActual >= maximo) {
            setHasMore(false)
            return
        }
        setPorPagina(
            porPagina + 9
        )
    }

    useEffect(() => {
            dispatch(getAllOrdenes(soloFecha));
    }, [dispatch, soloFecha]);
    
    /////// EXCEL ///////
    const tablaRef = useRef(null);

    const handleExportExcel = () => {
        const ws = XLSX.utils.table_to_sheet(tablaRef.current);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `Guia de reparto`);
        XLSX.writeFile(wb, `Guia de reparto ${usuario.name} ${usuario.lastname} ${soloFecha}.xlsx`);
    };

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
                    />
                </div>
                <button onClick={handleExportExcel} className={style.excel}>
                    <RiFileExcel2Fill className={style.icon3} />
                    <p>Exportar a excel</p>
                </button>
                {
                    email === "maicol.nieto@jorgegas.cl" ||
                    email === "benjaminsotoro@gmail.com" ||
                    email === "jorgetalento@outlook.es" ? (
                        <>
                            <ListaDePrecios/>
                            <Patentes />
                        </>
                    ) : null
                }
                <CreateOrden/>
                <DownloadOrden fecha={soloFecha}/>
                <div className={style.tableContainer}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={hasMore}
                    >
                        <table
                            className="table-md table table-bordered table-hover" 
                            ref={tablaRef}
                        >
                            <thead>
                                <tr>
                                    <th>Numero de orden</th>
                                    <th>Fecha</th>
                                    <th>Cantidad de tarros</th>
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
                                {currentPosts?.map((orden) => (
                                    <OrdenList
                                        key={orden?.id}
                                        id={orden?.id}
                                        fecha={orden?.fecha}
                                        totalCantidad={orden?.contabilidadRecarga?.totalCantidad}
                                        patente={orden?.patente?.name}
                                        chofer={orden?.chofer?.personal?.name + ' ' + orden.chofer?.personal?.lastname }
                                        ayudante= {
                                            orden?.ayudante?.personal?.name && 
                                            orden?.ayudante?.personal?.name ? 
                                            orden?.ayudante?.personal?.name + ' ' + orden?.ayudante?.personal?.name : 
                                            'Sin peoneta'
                                        }
                                        cuadrante={orden?.cuadrante?.name}
                                        estado={orden?.estado === true ? 'Activa' : 'Descargada'}
                                        recargas={orden?.recargas}
                                        contabilidadRecarga={orden?.contabilidadRecarga}
                                        metodoPagos={orden?.metodoPagos}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
                <button onClick={loadMore} className={style.boton}>
                    Cargar mas
                </button>
            </div>
        </div>
    )
}

export default GuidePage
