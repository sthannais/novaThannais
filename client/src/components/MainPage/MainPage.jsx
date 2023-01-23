import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonals } from '../../redux/novaSlice/thunks';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import style from './mainPage.module.css';
import { RiFileExcel2Fill } from 'react-icons/ri';
import CreatePersonal from '../CreatePersonal/CreatePersonal';
import { Table } from 'reactstrap';
import Paginado from '../Paginado/Paginado';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const MainPage = () => {

    const personal = useSelector((state) => state.Nova.novaPersonals)
    const dispatch = useDispatch()
    
    const [paginaActual, setPaginaActual] = useState(1)
    const [porPagina, setPorPagina] = useState(9)
    const maximo = personal?.length / porPagina
    const primerIndice = (paginaActual - 1) * porPagina
    const ultimoIndice = (paginaActual - 1) * porPagina + porPagina
    const currentPosts = personal?.slice(primerIndice, ultimoIndice)

    useEffect(() => {
        dispatch(getPersonals())
    }, [dispatch])

    return (
        <div className={style.margin}>
            <p className={style.text}>Lista de personal</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
                <div>
                    <CreatePersonal />
                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className={style.excel}
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText={
                            <>
                                <RiFileExcel2Fill className={style.icon} />
                                Exportar a Excel
                            </>
                        }
                    /> 
                </div>
                <div className={style.tableContainer}>
                    <Table 
                        bordered
                        hover
                        responsive
                        className={style.tabla}
                        id="table-to-xls"
                        >
                        <thead>
                            <tr>
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Apellido</th>
                                <th className="px-4 py-3">Rut</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts?.map((personal) => (
                                <tr key={personal.id}>
                                    <td className="px-4 py-3">{personal.name}</td>
                                    <td className="px-4 py-3">{personal.lastname}</td>
                                    <td className="px-4 py-3">{personal.rut}</td>
                                    <td className="px-4 py-3">{personal.email}</td>
                                    <td className="px-4 py-3">{personal.rol.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Paginado pagina={paginaActual} setPagina={setPaginaActual} maximo={maximo} style={style}/>
            </div>
        </div>
    )
}

export default MainPage
