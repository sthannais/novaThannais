import React from 'react'
import { Table } from 'reactstrap'
import style from './tableGeneral.module.css'
import { numberWithDots } from '../../../helpers/numberWithDot'

const TableGeneral = ({ novaOrdenById }) => {

    return (
        <div className={style.tabla}>
            <Table 
                bordered 
                hover
                responsive
                className="table-md"
            >
                <thead>
                    <tr>
                        <th>Transbank</th>
                        <th>Transferencias</th>
                        <th>Descuento rut</th>
                        <th>Descuento</th>
                        <th>Abonos</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        novaOrdenById?.metodoPagos?.map((metodoPago) => (
                            <tr key={metodoPago.id}>
                                <td>
                                    {
                                        metodoPago.transbank.monto ? numberWithDots(metodoPago.transbank.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.transferencia.monto ? numberWithDots(metodoPago.transferencia.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.descuentoRut.monto ? numberWithDots(metodoPago.descuentoRut.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.descuento.monto ? numberWithDots(metodoPago.descuento.monto) : 0
                                    }
                                </td>
                                <td>
                                    {
                                        metodoPago.abono.monto ? numberWithDots(metodoPago.abono.monto) : 0
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default TableGeneral
