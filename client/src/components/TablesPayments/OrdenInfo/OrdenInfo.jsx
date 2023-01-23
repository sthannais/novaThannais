import React from 'react'
import style from './ordenInfo.module.css'
import monito from '../../../assets/JORGITO.svg';

const OrdenInfo = ({ novaOrdenById }) => {
    return (
        <div className={style.container}>
            <div className={style.textContainer}>
                <p className={style.texto}>Informacion de la orden</p>
                <p>Numero de orden: {novaOrdenById?.id}</p>
                <p>Estado de la orden: {novaOrdenById?.estado === false ? "Descargada" : null}</p>
                <p>Fecha de creacion: {novaOrdenById?.fecha}</p>
            </div>
            <div className={style.personalContainer}>
                <img src={monito} alt="avatar" className={style.monito} />
                {
                    novaOrdenById?.id ? <p className={style.texto3}>Chofer: {novaOrdenById?.chofer?.personal?.name + " " + novaOrdenById?.chofer?.personal?.lastname}</p> : <p className={style.texto3}>Chofer: Seleccione una orden</p>
                }
                <img src={monito} alt="avatar" className={style.monito} />
                {
                    novaOrdenById?.id ? <p className={style.texto3}>Peoneta: {novaOrdenById?.ayudante?.personal?.name + " " + novaOrdenById?.ayudante?.personal?.lastname}</p> : <p className={style.texto3}>Peoneta: Seleccione una orden</p>
                }
            </div>
        </div>
    )
}

export default OrdenInfo
