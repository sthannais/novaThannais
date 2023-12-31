import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { bringUltimosVales } from '../../../../../redux/novaSlice/thunks';
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
                    // 1,
                    // 2,
                    // 3,
                    // 4
                ],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                ],
                hoverOffset: 1
            }
        ]
    };

    const data2 = {
        labels: [
            'digital 5kg',
            'digital 11kg',
            'digital 15kg',
            'digital 45kg'
        ],
        datasets: [
            {
                label: 'Cantidad de vales',
                fill: false,
                lineTension: 0.1,
                data: [
                    vales?.digital5kg,
                    vales?.digital11kg,
                    vales?.digital15kg,
                    vales?.digital45kg
                    // 1,
                    // 2,
                    // 3,
                    // 4
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
            <Bar 
                data={data} 
                options={options}
                height={10}
                width={10}
            />
        </div>
        <div className={style.grafica2}>
            <p className={style.text}>Ultimos vales entrantes digitales</p>
            <Bar
                data={data2}
                options={options}
                height={10}
                width={10}
            />
        </div>
    </div>
    )
}

export default MetricaVales
