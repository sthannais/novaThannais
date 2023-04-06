import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import {  bringValesDigitalesRegalados, brinInventarioVales } from '../../redux/novaSlice/thunks';
import ContabilidadVales from '../ContabilidadVales/ContabilidadVales';
import HistorialCambiosVales from '../HistorialCambiosVales/HistorialCambiosVales';
import ValesPorFecha from '../ValesPorFecha/ValesPorFecha';
import MetricaVales from '../MetricaVales/MetricaVales';
import EnviarVales from '../EnviarVales/EnviarVales';
import HistorialSalidaVales from '../HistorialSalidaVales/HistorialSalidaVales';
import InventarioValesDigitalesRegalados from '../InventarioValesRegalados/InventarioValesRegalados';
import style from './inventarioVales.module.css'

const InventarioVales = () => {

    const dispatch = useDispatch();
    const { inventarioVales, ValesDigitalesRegalados } = useSelector((state) => state.Nova);

    useEffect(() => {
        dispatch(brinInventarioVales());
        dispatch(bringValesDigitalesRegalados());
    }, [dispatch]);

    //suma de vales digitales con vales digitales regalados
    const valesDigitalesTotales5kg = Number(inventarioVales[0]?.digital5kg) + Number(ValesDigitalesRegalados[0]?.digital5kg);
    const valesDigitalesTotales11kg = Number(inventarioVales[0]?.digital11kg) + Number(ValesDigitalesRegalados[0]?.digital11kg);
    const valesDigitalesTotales15kg = Number(inventarioVales[0]?.digital15kg) + Number(ValesDigitalesRegalados[0]?.digital15kg);
    const valesDigitalesTotales45kg = Number(inventarioVales[0]?.digital45kg) + Number(ValesDigitalesRegalados[0]?.digital45kg);

    return (
        <div className={style.margin}>
            <ContabilidadVales />
            <HistorialCambiosVales />
            <ValesPorFecha />
            <MetricaVales />
            <EnviarVales />
            <HistorialSalidaVales />
            <InventarioValesDigitalesRegalados />
            <p className={style.text}>Inventario de vales</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
            <p className={style.title}>Vales fisicos</p>
            <div className={style.tableContainer}>
                <table className="table-sm table table-bordered table-hover responsive">
                    <thead>
                        <tr>
                            <th className={style.text2}>Vales</th>
                            <th className={style.text2}>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={style.text2}>Vale fisico 5kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico5kg}</>
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Vale fisico 11kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico11kg}</>
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Vale fisico 15kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico15kg}</>
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={style.text2}>Vale fisico 45kg</td>
                            <td className={style.text2}>
                                {
                                    inventarioVales.map((vale) => {
                                        return <>{vale.fisico45kg}</>
                                    })
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            </div>
            <p className={style.title2}>Vales digitales</p>
            <div className={style.tableContainer2}>
                        <table className="table-sm table table-bordered table-hover responsive">
                            <thead>
                                <tr>
                                    <th className={style.text2}>Vales</th>
                                    <th className={style.text2}>Cantidad Digitales</th>
                                    <th className={style.text2}>Cantidad Regalados</th>
                                    <th className={style.text2}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={style.text2}>Vale digital 5kg</td>
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
                                    <td className={style.text2}>Vale digital 11kg</td>
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
                                    <td className={style.text2}>Vale digital 15kg</td>
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
                                    <td className={style.text2}>Vale digital 45kg</td>
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
                            </tbody>
                        </table>
                </div> 
        </div>
    )
}

export default InventarioVales
