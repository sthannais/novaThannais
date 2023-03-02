import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import style from './changeLog.module.css'
import { handleKeydown } from '../../helpers/KeyDown';

const ChangeLog = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-32%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "580px",
    };

    return (
        <div>
            <button className={style.changelog} onClick={
                () => {
                    toggle();
                }
            } >Ver. 1.0.3
            </button>
            <Modal isOpen={modal} toggle={toggle} style={modalStyles} size="md" backdrop="static" onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle}>Cambios recientes</ModalHeader>
                <ModalBody>
                    <h5>Ver. 1.0.4</h5>
                    <em style={{ color: 'red' }}>27/02/2023</em>
                    <ul className={style.newli}>
                        <li>Se empezo a desarrollar funcionalidades que permiten personalizar documentos excel al exportarlos</li>
                        <li>Se corrigio bug al momento de cancelar una cuadratura, se perdia la referencia del faltante</li>
                    </ul>
                    <h5>Ver. 1.0.3</h5>
                    <em style={{ color: 'red' }}>27/02/2023</em>
                    <ul className={style.newli}>
                        <li>Se corrigio bug al momento de crear un cuadrante, cuando se dejaba el campo en blanco creaba el cuadrante en vacio.</li>
                        <li>Se corrigio bug al momento de crear una patente, cuando se dejaba el campo en blanco creaba la patente en vacio.</li>
                        <li>Se corrigio cuando se cuadren una orden en pantallas diferentes, que la segunda vez que se intente no se pueda cuadrar</li>
                    </ul>
                    <h5>Ver. 1.0.2</h5>
                    <em style={{ color: 'red' }}>24/02/2023</em>
                    <ul className={style.newli}>
                        <li>Se corrigio bug al momento de traer por fechas las rendiciones, en la pantalla de rendicion general.</li>
                        <li>Se reestructuro componente de rendicion de personal(ahora se puede buscar por rango de fecha y las fechas aparecen en orden descendente)</li>
                        <li>Se añadio el poder introducir los gastos de una orden al momento de cuadrarla, con su respectivo monto y descripcion</li>
                        <li>Se habilito un boton para poder observar los gastos de una orden en la pantalla de rendicion de ventas, solo si la orden tiene gastos</li>
                        <li>Se deshabilito el poder subir valores con flechas y rueda de raton al momento de recargar o descargar una orden</li>
                        <li>Se cambiaron los colores de los botones al momento de eliminar, modificar, recargar o abonar una orden</li>
                        <li>Se agrego barra de busquedad en la pantalla de rendicion de ventas para buscar una orden por nombre de chofer o Peoneta</li>
                    </ul>
                    <h5>Ver. 1.0.1</h5>
                    <em style={{ color: 'red' }}>23/02/2023</em>
                    <ul className={style.newli}>
                        <li>Se corrigio bug al momento de cuadrar, que no mostraba el faltante real.</li>
                        <li>Se agregó la funcionalidad de tabular hacia abajo en la cuadratura de los vales.</li>
                        <li>Se implemento barra de busqueda al momento de descargar una orden para buscar por nombre de chofer</li>
                        <li>Se implemento boton de anticipos si la orden tiene anticipos en la pantalla de rendicion de ventas</li>
                        <li>Se agrego nombre y apellido de chofer y peoneta al momento de cuadrar una orden</li>
                        <li>Se agrego cambiar el personal de una orden en la cuadratura, tanto chofer como peoneta se pueden cambiar ahora</li>
                    </ul>
                    <h5>Ver. 1.0.0</h5> 
                    <em style={{ color: 'red' }}>22/02/2023</em>
                    <ul className={style.newli}>
                        <li>Se agregó separación numerica al momento de cuadrar una orden.</li>
                        <li>Se agregó la funcionalidad Chofer/Peoneta al momento de crear un usuario nuevo.</li>
                        <li>Todos los choferes y peonetas ahora tienen roles mixtos (Chofer/Peoneta).</li>
                        <li>Se agregó la funcionalidad de eliminar una recarga al entrar al detalle de una guia de reparto.</li>
                        <li>Se estilizaron los estilos para que cada pantalla tenga las mismas dimensiones en cada tipo de pantalla.</li>
                        <li>Se agregó la funcionalidad activar y desactivar patentes.</li>
                        <li>Se corrigio bug en historial de anticipos que enseñaba anticipos anteriores al seleccionar cualquier fecha</li>
                        <li>Se corrigio bug en rendicion de personal</li>
                        <li>Se corrigio bug de boton Eliminar cuando ya la orden esta descargada</li>
                        <li>Se corrigio bug que no validaba los llenos de 11kg al momento de descargar</li>
                    </ul>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ChangeLog
