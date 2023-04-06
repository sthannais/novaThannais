import React from 'react'
import style from './tableVales.module.css'
import { numberWithDots } from '../../../helpers/numberWithDot'

const TableVales = ({ novaOrdenById, tabla3Ref }) => {

    return (
        <div className={style.tabla}>
            <table
                className="table-md table table-bordered table-hover"
                ref={tabla3Ref}
            >
                <thead>
                    <tr>
                        <th style={{
                            verticalAlign: 'middle',
                        }}
                        >
                            Producto
                        </th>
                        <th>Vales Digitales</th>
                        <th
                            style={{
                                verticalAlign: 'middle',
                            }}
                        >
                            Subtotal
                        </th>
                        <th>Vales Fisicos</th>
                        <th
                            style={{
                                verticalAlign: 'middle',
                            }}
                        >
                            Subtotal
                        </th>
                        <th style={{
                            verticalAlign: 'middle',
                        }}>
                            Regalados
                        </th>
                        <th style={{
                            verticalAlign: 'middle',
                        }}>
                            Subtotal
                        </th>
                        <th style={{
                            verticalAlign: 'middle',
                        }}>
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 5 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {

                            const sumaVale = metodo.valesDigiRegalado?.totalDigital5kg ? Number(metodo.vale.sumaTotalDigitalYFisico5kg) + Number(metodo.valesDigiRegalado?.totalDigital5kg) : metodo.vale.sumaTotalDigitalYFisico5kg

                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: "middle"
                                    }}>
                                        {metodo.vale.digital5kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: "middle"
                                        }}>
                                            {
                                                metodo.vale.totalDigital5kg ? numberWithDots(metodo.vale.totalDigital5kg) : 0
                                            }
                                    </td>
                                    <td>
                                        {metodo.vale.fisico5kg}
                                    </td>
                                    <td>
                                        {
                                            metodo.vale.totalFisico5kg ? numberWithDots(metodo.vale.totalFisico5kg) : 0
                                        }
                                    </td>
                                    <td>
                                        {
                                            metodo.valesDigiRegalado?.digital5kg ? numberWithDots(metodo?.valesDigiRegalado?.digital5kg) : 0
                                        }
                                    </td>
                                    <td>
                                        {
                                            metodo.valesDigiRegalado?.totalDigital5kg ? numberWithDots(metodo?.valesDigiRegalado?.totalDigital5kg) : 0
                                        }
                                    </td>
                                    <td>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico5kg ? numberWithDots(sumaVale) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 11 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {

                            const sumaVale = metodo.valesDigiRegalado?.totalDigital11kg ? Number(metodo.vale.sumaTotalDigitalYFisico11kg) + Number(metodo.valesDigiRegalado?.totalDigital11kg) : metodo.vale.sumaTotalDigitalYFisico11kg

                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.digital11kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {
                                                metodo.vale.totalDigital11kg ? numberWithDots(metodo.vale.totalDigital11kg) : 0
                                            }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.fisico11kg}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle' 
                                    }}>
                                        {
                                            metodo.vale.totalFisico11kg ? numberWithDots(metodo.vale.totalFisico11kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.valesDigiRegalado?.digital11kg ? numberWithDots(metodo.valesDigiRegalado?.digital11kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.valesDigiRegalado?.totalDigital11kg ? numberWithDots(metodo.valesDigiRegalado?.totalDigital11kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico11kg ? numberWithDots(sumaVale) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 15 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {

                            const sumaVale = metodo.valesDigiRegalado?.totalDigital15kg ? Number(metodo.vale.sumaTotalDigitalYFisico15kg) + Number(metodo.valesDigiRegalado?.totalDigital15kg) : metodo.vale.sumaTotalDigitalYFisico15kg

                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.digital15kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {
                                                metodo.vale.totalDigital15kg ? numberWithDots(metodo.vale.totalDigital15kg) : 0
                                            }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.fisico15kg}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.totalFisico15kg ? numberWithDots(metodo.vale.totalFisico15kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.valesDigiRegalado?.digital15kg ? numberWithDots(metodo.valesDigiRegalado?.digital15kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.valesDigiRegalado?.totalDigital15kg ? numberWithDots(metodo.valesDigiRegalado?.totalDigital15kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico15kg ? numberWithDots(sumaVale) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <td style={{
                            verticalAlign: 'middle',
                        }}>
                            Gas 45 kilos
                        </td>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {

                            const sumaVale = metodo.valesDigiRegalado?.totalDigital45kg ? Number(metodo.vale.sumaTotalDigitalYFisico45kg) + Number(metodo.valesDigiRegalado?.totalDigital45kg) : metodo.vale.sumaTotalDigitalYFisico45kg

                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.digital45kg}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {
                                                metodo.vale.totalDigital45kg ? numberWithDots(metodo.vale.totalDigital45kg) : 0
                                            }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {metodo.vale.fisico45kg}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.totalFisico45kg ? numberWithDots(metodo.vale.totalFisico45kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.valesDigiRegalado?.digital45kg ? numberWithDots(metodo.valesDigiRegalado?.digital45kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.valesDigiRegalado?.totalDigital45kg ? numberWithDots(metodo.valesDigiRegalado?.totalDigital45kg) : 0
                                        }
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.sumaTotalDigitalYFisico45kg ? numberWithDots(sumaVale) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                    <tr>
                        <th style={{
                            verticalAlign: 'middle',
                        }}>
                            Total
                        </th>
                        {novaOrdenById?.metodoPagos?.map((metodo) => {
                            
                            const sumaVale5 = metodo.valesDigiRegalado?.totalDigital5kg ? Number(metodo.vale.sumaTotalDigitalYFisico5kg) + Number(metodo.valesDigiRegalado?.totalDigital5kg) : metodo.vale.sumaTotalDigitalYFisico5kg
                            const sumaVale11 = metodo.valesDigiRegalado?.totalDigital11kg ? Number(metodo.vale.sumaTotalDigitalYFisico11kg) + Number(metodo.valesDigiRegalado?.totalDigital11kg) : metodo.vale.sumaTotalDigitalYFisico11kg
                            const sumaVale15 = metodo.valesDigiRegalado?.totalDigital15kg ? Number(metodo.vale.sumaTotalDigitalYFisico15kg) + Number(metodo.valesDigiRegalado?.totalDigital15kg) : metodo.vale.sumaTotalDigitalYFisico15kg
                            const sumaVale45 = metodo.valesDigiRegalado?.totalDigital45kg ? Number(metodo.vale.sumaTotalDigitalYFisico45kg) + Number(metodo.valesDigiRegalado?.totalDigital45kg) : metodo.vale.sumaTotalDigitalYFisico45kg
                            const sumaVale = sumaVale5 + sumaVale11 + sumaVale15 + sumaVale45

                            return (
                                <React.Fragment key={metodo.id}>
                                    <td key={metodo.vale.id} style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {null}
                                    </td>
                                    <td style={{
                                        verticalAlign: 'middle'
                                    }}>
                                        {
                                            metodo.vale.totalSumaVales ? numberWithDots(sumaVale) : 0
                                        }
                                    </td>
                                </React.Fragment>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableVales
