import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JorgeGas from '../../../assetsOficial/jorgegas.svg';
import {  bringValesDigitalesRegalados, brinInventarioVales } from '../../../redux/novaSlice/thunks';
import ContabilidadVales from './ModalesAuxiliares/ContabilidadVales/ContabilidadVales';
import HistorialCambiosVales from './ModalesAuxiliares/HistorialCambiosVales/HistorialCambiosVales';
import ValesPorFecha from './ModalesAuxiliares/ValesPorFecha/ValesPorFecha';
import MetricaVales from './ModalesAuxiliares/MetricaVales/MetricaVales';
import EnviarVales from './ModalesAuxiliares/EnviarVales/EnviarVales';
import HistorialSalidaVales from './ModalesAuxiliares/HistorialSalidaVales/HistorialSalidaVales';
import InventarioValesDigitalesRegalados from './ModalesAuxiliares/InventarioValesRegalados/InventarioValesRegalados';
import AceptarVales from './ModalesAuxiliares/AceptarVales/AceptarVales';
import style from './inventarioVales.module.css'

const InventarioVales = () => {

    const dispatch = useDispatch();
    const { inventarioVales, ValesDigitalesRegalados } = useSelector((state) => state.Nova);

    useEffect(() => {
        dispatch(brinInventarioVales());
        dispatch(bringValesDigitalesRegalados());
    }, [dispatch]);

    //suma de vales digitales con vales digitales regalados
    const valesDigitalesTotales5kg = Number(inventarioVales[0]?.digital5kg) + Number(inventarioVales[0]?.fisico5kg) + Number(ValesDigitalesRegalados[0]?.digital5kg);
    const valesDigitalesTotales11kg = Number(inventarioVales[0]?.digital11kg) + Number(inventarioVales[0]?.fisico11kg) + Number(ValesDigitalesRegalados[0]?.digital11kg);
    const valesDigitalesTotales15kg = Number(inventarioVales[0]?.digital15kg) + Number(inventarioVales[0]?.fisico15kg) + Number(ValesDigitalesRegalados[0]?.digital15kg);
    const valesDigitalesTotales45kg = Number(inventarioVales[0]?.digital45kg) + Number(inventarioVales[0]?.fisico45kg) + Number(ValesDigitalesRegalados[0]?.digital45kg);
    const sumaValesDigitalesRegalados = Number(ValesDigitalesRegalados[0]?.digital5kg) + Number(ValesDigitalesRegalados[0]?.digital11kg) + Number(ValesDigitalesRegalados[0]?.digital15kg) + Number(ValesDigitalesRegalados[0]?.digital45kg);
    const totalDeVales = Number(inventarioVales[0]?.totalValesAmbos) + Number(ValesDigitalesRegalados[0]?.digital5kg) + Number(ValesDigitalesRegalados[0]?.digital11kg) + Number(ValesDigitalesRegalados[0]?.digital15kg) + Number(ValesDigitalesRegalados[0]?.digital45kg);

    return (
        <div className={style.margin}>
            <ContabilidadVales />
            <HistorialCambiosVales />
            <ValesPorFecha />
            <MetricaVales />
            <EnviarVales />
            <HistorialSalidaVales />
            <InventarioValesDigitalesRegalados />
            <AceptarVales />
            <p className={style.text}>Inventario de vales</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
            {/* <p className={style.title}>Vales fisicos</p> */}
            <div className={style.tableContainer}>
                <table className="table-sm table table-bordered table-hover responsive">
                    <thead>
                        <tr>
                            <th className={style.text2}>Vales</th>
                            <th className={style.text2}>Cantidad fisicos</th>
                            <th className={style.text2}>Cantidad Digitales</th>
                            <th className={style.text2}>Cantidad Regalados</th>
                            <th className={style.text2}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={style.text2}>Vale 5kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico5kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    inventarioVales?.map((vale) => {
                                        return <>{vale.digital5kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    ValesDigitalesRegalados?.map((vale) => {
                                        return <>{vale?.digital5kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {valesDigitalesTotales5kg}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Vale 11kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico11kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    inventarioVales?.map((vale) => {
                                        return <>{vale.digital11kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    ValesDigitalesRegalados?.map((vale) => {
                                        return <>{vale?.digital11kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {valesDigitalesTotales11kg}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Vale 15kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico15kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    inventarioVales?.map((vale) => {
                                        return <>{vale.digital15kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    ValesDigitalesRegalados?.map((vale) => {
                                        return <>{vale?.digital15kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {valesDigitalesTotales15kg}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Vale 45kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico45kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    inventarioVales?.map((vale) => {
                                        return <>{vale.digital45kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    ValesDigitalesRegalados?.map((vale) => {
                                        return <>{vale?.digital45kg}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {valesDigitalesTotales45kg}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Total</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.totalValesFisicos}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {
                                    inventarioVales?.map((vale) => {
                                        return <>{vale.totalValesDigitales}</>
                                    })
                                }
                            </td>
                            <td className={style.text2}>
                                {sumaValesDigitalesRegalados}
                            </td>
                            <td className={style.text2}>
                                {totalDeVales}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            </div>
        </div>
    )
}

export default InventarioVales
