import React, { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { bringUltimosVales } from '../../redux/novaSlice/thunks';
import style from './metricaVales.module.css';
Chart.register(ArcElement, Tooltip, Legend, );

const MetricaVales = () => {

    const { vales } = useSelector((state) => state.Nova.ultimosVales);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bringUltimosVales());
    }, [dispatch]);

    const data = {
        labels: [
            'fisico 5kg',
            'fisico 11kg',
            'fisico 15kg',
            'fisico 45kg'
        ],
        datasets: [
            {
                label: 'Cantidad de vales',
                fill: false,
                lineTension: 0.1,
                data: [
                    vales?.fisico5kg,
                    vales?.fisico11kg,
                    vales?.fisico15kg,
                    vales?.fisico45kg
                ],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                ],
                hoverOffset: 4
            }
        ]
    };
    
    const options = {
        scales: {
            yAxes: [
                {
                ticks: {
                    beginAtZero: true
                }
                }
            ]
        }
    }

    return (
    <div>
        <div className={style.grafica}>
            <p className={style.text}>Ultimos vales entrantes fisicos</p>
            <Doughnut 
                data={data} 
                options={options}
                height={10}
                width={10}
            />
        </div>
    </div>
    )
}

export default MetricaVales
