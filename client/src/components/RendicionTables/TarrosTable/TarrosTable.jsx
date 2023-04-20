import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './tarrosTable.module.css'

const TarrosTable = ({ cuadratura, tablaRef }) => {

    const width = window.innerWidth;

    return (
        <div className={style.columna}>
            <p className={style.text}>
                Rendicion de cilindros
            </p>
            <div className={style.tabla}>
                <table
                    className="table-lg table table-bordered table-hover" 
                    ref={tablaRef}
                >
                    <thead>
                        <tr>
                            <th>Cilindro</th>
                            <th>Cantidad</th>
                            {
                                width > 768 ? (
                                    <th>Valor</th>
                                ) : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>5kg</td>
                            <td>{cuadratura?.ventaTotalTarros?.ventas5kg}</td>
                            {
                                width > 768 ? (
                                    <td>{cuadratura?.ventaTotalTarros?.recaudacion5kg ? numberWithDots(cuadratura?.ventaTotalTarros?.recaudacion5kg) : 0}</td>
                                ) : null
                            }
                        </tr>
                        <tr>
                            <td>11kg</td>
                            <td>{cuadratura?.ventaTotalTarros?.ventas11kg}</td>
                            {
                                width > 768 ? (
                                    <td>{cuadratura?.ventaTotalTarros?.recaudacion11kg ? numberWithDots(cuadratura?.ventaTotalTarros?.recaudacion11kg) : 0}</td>
                                ) : null
                            }
                        </tr>
                        <tr>
                            <td>15kg</td>
                            <td>{cuadratura?.ventaTotalTarros?.ventas15kg}</td>
                            {
                                width > 768 ? (
                                    <td>{cuadratura?.ventaTotalTarros?.recaudacion15kg ? numberWithDots(cuadratura?.ventaTotalTarros?.recaudacion15kg) : 0}</td>
                                ) : null
                            }
                        </tr>
                        <tr>
                            <td>45kg</td>
                            <td>{cuadratura?.ventaTotalTarros?.ventas45kg}</td>
                            {
                                width > 768 ? (
                                    <td>{cuadratura?.ventaTotalTarros?.recaudacion45kg ? numberWithDots(cuadratura?.ventaTotalTarros?.recaudacion45kg) : 0}</td>
                                ) : null
                            }
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>{cuadratura?.ventaTotalTarros?.totalCantidad}</th>
                            {
                                width > 768 ? (
                                    <th>{cuadratura?.ventaTotalTarros?.totalRecaudacion ? numberWithDots(cuadratura?.ventaTotalTarros?.totalRecaudacion) : 0}</th>
                                ) : null
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TarrosTable
