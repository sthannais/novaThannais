import React from 'react'
import { numberWithDots } from '../../../../../helpers/numberWithDot'
import style from './valesTabla.module.css'

const ValesTabla = ({ cuadratura, tablaRef }) => {

    const sumaCantidadValesyValesRegalados5kg = Number(cuadratura?.totalVales?.fisico5kg) + Number(cuadratura?.totalVales?.digital5kg) + Number(cuadratura?.totalValesRegalados?.digital5kg)
    const sumaCantidadValesyValesRegalados11kg = Number(cuadratura?.totalVales?.fisico11kg) + Number(cuadratura?.totalVales?.digital11kg) + Number(cuadratura?.totalValesRegalados?.digital11kg)
    const sumaCantidadValesyValesRegalados15kg = Number(cuadratura?.totalVales?.fisico15kg) + Number(cuadratura?.totalVales?.digital15kg) + Number(cuadratura?.totalValesRegalados?.digital15kg)
    const sumaCantidadValesyValesRegalados45kg = Number(cuadratura?.totalVales?.fisico45kg) + Number(cuadratura?.totalVales?.digital45kg) + Number(cuadratura?.totalValesRegalados?.digital45kg)

    const sumaValorValesYValesRegalados5kg = Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico5kg) + Number(cuadratura?.totalValesRegalados?.totalDigital5kg)
    const sumaValorValesYValesRegalados11kg = Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico11kg) + Number(cuadratura?.totalValesRegalados?.totalDigital11kg)
    const sumaValorValesYValesRegalados15kg = Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico15kg) + Number(cuadratura?.totalValesRegalados?.totalDigital15kg)
    const sumaValorValesYValesRegalados45kg = Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico45kg) + Number(cuadratura?.totalValesRegalados?.totalDigital45kg)

    const sumaTotalCantidadValesRegalados = Number(cuadratura?.totalValesRegalados?.digital5kg) + Number(cuadratura?.totalValesRegalados?.digital11kg) + Number(cuadratura?.totalValesRegalados?.digital15kg) + Number(cuadratura?.totalValesRegalados?.digital45kg)
    const sumaTotalCantidadValesRegaladosConValesFisicosYValesDigitales = Number(cuadratura?.totalValesRegalados?.digital5kg) + Number(cuadratura?.totalValesRegalados?.digital11kg) + Number(cuadratura?.totalValesRegalados?.digital15kg) + Number(cuadratura?.totalValesRegalados?.digital45kg) + Number(cuadratura?.totalVales?.totalVales)
    const sumaValorTotalValesFisicosConValesDigitalesYValesRegalados = Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico5kg) + Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico11kg) + Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico15kg) + Number(cuadratura?.totalVales?.sumaTotalDigitalYFisico45kg) + Number(cuadratura?.totalValesRegalados?.totalDigital5kg) + Number(cuadratura?.totalValesRegalados?.totalDigital11kg) + Number(cuadratura?.totalValesRegalados?.totalDigital15kg) + Number(cuadratura?.totalValesRegalados?.totalDigital45kg)

    return (
        <div className={style.columna}>
            <p className={style.text}>
                Rendicion de vales
            </p>
            <div className={style.tabla}>
                <table
                    className="table-lg table table-bordered table-hover" 
                    ref={tablaRef}
                >
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Fisico</th>
                            <th>Digital</th>
                            <th>Regalado</th>
                            <th>Total</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>5kg</td>
                            <td>{cuadratura?.totalVales?.fisico5kg}</td>
                            <td>{cuadratura?.totalVales?.digital5kg}</td>
                            <td>{cuadratura?.totalValesRegalados?.digital5kg}</td>
                            <td>{sumaCantidadValesyValesRegalados5kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico5kg ? numberWithDots(sumaValorValesYValesRegalados5kg) : 0 }</td>
                        </tr>
                        <tr>
                            <td>11kg</td>
                            <td>{cuadratura?.totalVales?.fisico11kg}</td>
                            <td>{cuadratura?.totalVales?.digital11kg}</td>
                            <td>{cuadratura?.totalValesRegalados?.digital11kg}</td>
                            <td>{sumaCantidadValesyValesRegalados11kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico11kg ? numberWithDots(sumaValorValesYValesRegalados11kg) : 0 }</td>
                        </tr>
                        <tr>
                            <td>15kg</td>
                            <td>{cuadratura?.totalVales?.fisico15kg}</td>
                            <td>{cuadratura?.totalVales?.digital15kg}</td>
                            <td>{cuadratura?.totalValesRegalados?.digital15kg}</td>
                            <td>{sumaCantidadValesyValesRegalados15kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico15kg ? numberWithDots(sumaValorValesYValesRegalados15kg) : 0 }</td>
                        </tr>
                        <tr>
                            <td>45kg</td>
                            <td>{cuadratura?.totalVales?.fisico45kg}</td>
                            <td>{cuadratura?.totalVales?.digital45kg}</td>
                            <td>{cuadratura?.totalValesRegalados?.digital45kg}</td>
                            <td>{sumaCantidadValesyValesRegalados45kg}</td>
                            <td>{cuadratura?.totalVales?.sumaTotalDigitalYFisico45kg ? numberWithDots(sumaValorValesYValesRegalados45kg) : 0 }</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>{cuadratura?.totalVales?.totalFisico}</th>
                            <th>{cuadratura?.totalVales?.totalDigital}</th>
                            <th>{sumaTotalCantidadValesRegalados}</th>
                            <th>{sumaTotalCantidadValesRegaladosConValesFisicosYValesDigitales}</th>
                            <th>{cuadratura?.totalVales?.totalSumaVales ? numberWithDots(sumaValorTotalValesFisicosConValesDigitalesYValesRegalados) : 0 }</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ValesTabla
