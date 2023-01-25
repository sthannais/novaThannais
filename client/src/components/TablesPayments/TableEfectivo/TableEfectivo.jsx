import React from 'react'
import { numberWithDots } from '../../../helpers/numberWithDot'
import style from './tableEfectivo.module.css'

const TableEfectivo = ({ novaOrdenById, tabla2Ref }) => {
    const efectivo = novaOrdenById?.metodoPagos?.map((metodoPago) => metodoPago.efectivo)
    const efectivoObj = efectivo ? Object.assign({}, ...efectivo) : null

    return (
        <div className={style.tabla}>
            <table
                className="table-sm table table-bordered table-hover"
                ref={tabla2Ref}
            >
                <thead>
                    <tr>
                        <th>Efectivo</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            20.000
                        </td>
                        <td>
                            {efectivoObj?.billetesDe20}
                        </td>
                        <td>
                            {efectivoObj?.totalBilletes20 ? numberWithDots(efectivoObj?.totalBilletes20) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            10.000
                        </td>
                        <td>
                            {efectivoObj?.billetesDe10}
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes10 ? numberWithDots(efectivoObj?.totalBilletes10) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            5.000
                        </td>
                        <td>
                            {efectivoObj?.billetesDe5}
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes5 ? numberWithDots(efectivoObj?.totalBilletes5) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2.000
                        </td>
                        <td>
                            {efectivoObj?.billetesDe2}
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes2 ? numberWithDots(efectivoObj?.totalBilletes2) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1.000
                        </td>
                        <td>
                            {efectivoObj?.billetede1}
                        </td>
                        <td>
                        {efectivoObj?.totalBilletes1 ? numberWithDots(efectivoObj?.totalBilletes1) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            M. 500
                        </td>
                        <td>
                            {efectivoObj?.moneda500}
                        </td>
                        <td>
                            {efectivoObj?.totalMoneda500 ? numberWithDots(efectivoObj?.totalMoneda500) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            M. 100
                        </td>
                        <td>
                            {efectivoObj?.moneda100}
                        </td>
                        <td>
                            {efectivoObj?.totalMoneda100 ? numberWithDots(efectivoObj?.totalMoneda100) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            M. 50
                        </td>
                        <td>
                            {efectivoObj?.moneda50}
                        </td>
                        <td>
                            {efectivoObj?.totalMoneda50 ? numberWithDots(efectivoObj?.totalMoneda50) : 0}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            M. 10 
                        </td>
                        <td>
                            {efectivoObj?.moneda10}
                        </td>
                        <td>
                            {efectivoObj?.totalMoneda10 ? numberWithDots(efectivoObj?.totalMoneda10) : 0}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Total
                        </th>
                        <td>
                            {null}
                        </td>
                        <td>
                            {efectivoObj?.totalGeneral ? numberWithDots(efectivoObj?.totalGeneral) : 0}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableEfectivo
