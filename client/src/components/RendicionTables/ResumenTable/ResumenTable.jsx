import React from 'react'
import { Table } from 'reactstrap'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './resumenTable.module.css'

const ResumenTable = ({ cuadratura, faltantes }) => {
    return (
        <div className={style.columna}>
            <p className={style.text}>
                Resumen
            </p>
            <div className={style.tabla}>
                <Table
                    bordered
                    hover
                    responsive
                    className="table-lg"
                    size='sm'
                    style={{
                        width: '100%',
                    }}
                >
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vales</td>
                            <th>{cuadratura?.totalVales?.totalSumaVales ? numberWithDots(cuadratura?.totalVales?.totalSumaVales) : 0 }</th>
                        </tr>
                        <tr>
                            <td>Efectivo</td>
                            <th>{cuadratura?.totalEfectivo?.totalGeneral ? numberWithDots(cuadratura?.totalEfectivo?.totalGeneral) : 0}</th>
                        </tr>
                        <tr>
                            <td>Transferencias</td>
                            <td>{cuadratura?.totalTransferencia ? numberWithDots(cuadratura?.totalTransferencia) : 0}</td>
                        </tr>
                        <tr>
                            <td>Descuento Rut</td>
                            <td>{cuadratura?.totalDescuentoRut ? numberWithDots(cuadratura?.totalDescuentoRut) : 0}</td>
                        </tr>
                        <tr>
                            <td>Descuentos</td>
                            <td>{cuadratura?.totalDescuentos ? numberWithDots(cuadratura?.totalDescuentos) : 0}</td>
                        </tr>
                        <tr>
                            <td>Trasnbank</td>
                            <td>{cuadratura?.totalTransbank ? numberWithDots(cuadratura?.totalTransbank) : 0}</td>
                        </tr>
                        <tr>
                            <td>Sobrantes</td>
                            <td>{cuadratura?.sobrante ? numberWithDots(cuadratura?.sobrante) : 0}</td>
                        </tr>
                        <tr>
                            <th>Cilindros</th>
                            <th>{cuadratura?.ventaTotalTarros?.totalRecaudacion ? numberWithDots(cuadratura?.ventaTotalTarros?.totalRecaudacion) : 0}</th>
                        </tr>
                        <tr>
                            <th>Anticipos</th>
                            <th>{faltantes ? numberWithDots(faltantes) : 0}</th>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>{cuadratura?.totalGeneral ? numberWithDots(cuadratura?.totalGeneral) : 0}</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ResumenTable
