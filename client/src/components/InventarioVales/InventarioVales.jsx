import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JorgeGas from '../../assetsOficial/jorgegas.svg';
import { brinInventarioVales } from '../../redux/novaSlice/thunks';
import style from './inventarioVales.module.css'

const InventarioVales = () => {

    const dispatch = useDispatch();
    const { inventarioVales } = useSelector((state) => state.Nova);

    useEffect(() => {
        dispatch(brinInventarioVales());
    }, [dispatch]);

    return (
        <div className={style.margin}>
            <p className={style.text}>Inventario de vales</p>
            <img src={JorgeGas} alt="logo" className={style.logo} />
            <div className={style.container}>
            <p className={style.title}>Vales fisicos</p>
            <div className={style.tableContainer}>
                <table className="table-sm table table-bordered table-hover responsive">
                    <thead>
                        <tr>
                            <th className="px-4 py-3">Vales</th>
                            <th className="px-4 py-3">Cantidad</th>
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
                                    <th className="px-4 py-3">Vales</th>
                                    <th className="px-4 py-3">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={style.text2}>Vale fisico 5kg</td>
                                    <td className={style.text2}>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital5kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.text2}>Vale fisico 11kg</td>
                                    <td className={style.text2}>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital11kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.text2}>Vale fisico 15kg</td>
                                    <td className={style.text2}>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital15kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={style.text2}>Vale fisico 45kg</td>
                                    <td className={style.text2}>
                                        {
                                            inventarioVales.map((vale) => {
                                                return <>{vale.digital45kg}</>
                                            })
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div> 
        </div>
    )
}

export default InventarioVales
