import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import style from './changeLog.module.css'
import { handleKeydown } from '../../../helpers/KeyDown';

const ChangeLog = () => {

    const width = window.innerWidth;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [verMas, setVerMas] = useState(false);
    const [name, setName] = useState('');

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-32%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-width": "580px",
    };

    const modalStylesMobile = {
        position: 'relative',
        transform: 'translate(0%, 0.5%)',
        "--bs-modal-bg": "#F5F5F5",
        "--bs-modal-margin": "1rem",
        fontFamily: 'Roboto',
        fontSize: '14px',
    };

    return (
        <div>
            <p className={style.changelog} onClick={
                () => {
                    toggle();
                }
            } >Ver actualizaciones
            </p>
            <Modal isOpen={modal} toggle={toggle} style={
                width > 768 ? modalStyles : modalStylesMobile
            } size="md" backdrop="static" onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle}>Cambios recientes</ModalHeader>
                <ModalBody>
                    <h5>Ver. 1.6.0</h5>
                    <em style={{ color: 'red' }}>05/06/2023</em>
                    {
                        verMas && name === 'Ver. 1.6.0' ? (
                            <ul className={style.newli}>
                                <li>Nuevo login fresco, remodernizado y representante de nuevas tecnologias para nova</li>
                                <li>Nueva barra de navegacion optimizado para el crecimiento de nova</li>
                                <li>Filtro en rendicion de personal optimizado</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.6.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.6.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.5.0</h5>
                    <em style={{ color: 'red' }}>25/05/2023</em>
                    {
                        verMas && name === 'Ver. 1.5.0' ? (
                            <ul className={style.newli}>
                                <li>Se agrega pren inventario de vales para controlar la adicion de vales al inventario</li>
                                <li>Se optimiza y se corrigen bugs para componentes de pre inventario de vales</li>
                                <li>Se agrega filtro en componente de rendicion de personal para filtra por nombre de chofer o peoneta y que traiga sus ordenes</li>
                                <li>Se corrigen guias y desfases de todo el mes de mayo</li>
                                <li>Se empieza el desarrollo de la estructura de la base de datos y del servidor de nuevo inventario de descuentos rut</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.5.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.5.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.5.0</h5>
                    <em style={{ color: 'red' }}>04/05/2023</em>
                    {
                        verMas && name === 'Ver. 1.4.0' ? (
                            <ul className={style.newli}>
                                <li>Se corrige suma en Rendicion General en donde no sumaba los vales regalados</li>
                                <li>Se corrige exportacion a excel por fecha para que incluya los vales regalados de las rendiciones</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.4.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.4.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.3.0</h5>
                    <em style={{ color: 'red' }}>27/04/2023</em>
                    {
                        verMas && name === 'Ver. 1.3.0' ? (
                            <ul className={style.newli}>
                                <li>Se habilita boton de cambiar personal en el detalle de la orden mientras esta activa</li>
                                <li>Se le agrega formato moneda a excel de rendicion de personal y rendicion general</li>
                                <li>Se agrega desglose de descuento rut al momento de cuadrar una guia, en 5kg, 11kg, 15kg y 45kg</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.3.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.3.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.2.0</h5>
                    <em style={{ color: 'red' }}>17/04/2023</em>
                    {
                        verMas && name === 'Ver. 1.2.0' ? (
                            <ul className={style.newli}>
                                <li>Se habilita la opcion de cambiar de personal de una orden en la pagina de guia de reparto al darle click a una orden</li>
                                <li>Se mejora el diseño y el responsive de la version mobile</li>
                                <li>Se cambia el campo de numero de maquina de la pantalla de cuadrar, a la pantalla de crear una orden</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.2.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.2.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.1.0</h5>
                    <em style={{ color: 'red' }}>6/04/2023</em>
                    {
                        verMas && name === 'Ver. 1.1.0' ? (
                            <ul className={style.newli}>
                                <li>Se habilita modulo de numero de maquina al momento de cuadrar una orden</li>
                                <li>Modulo para inventario de vales completo(solo para cuenta Benjamin)</li>
                                <li>Se habilita modulo de vales regalados como metodo de pago</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.1.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.1.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.7</h5>
                    <em style={{ color: 'red' }}>21/03/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.7' ? (
                            <ul className={style.newli}>
                                <li>Componente de cambiar informacion del personal habilitado, de igual forma para cambiarle la contraseña</li>
                                <li>Logica de inventario de vales implementada en el backend, se comienza el diseño en el frontend</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.7')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.7' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.6</h5>
                    <em style={{ color: 'red' }}>09/03/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.6' ? (
                            <ul className={style.newli}>
                                <li>Ahora las sesiones tienen una duracion de ocho horas, luego de pasar ocho horas, se cerrara automaticamente la sesion cuando el usuario ingrese y se lo llevara a iniciar sesion de nuevo</li>
                                <li>En la pantalla del login, al darle click a "problemas para iniciar sesion", puedes cerrar las sesiones en dispositivos anteriores y abrir en un nuevo dispositivo</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.6')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.6' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.5</h5>
                    <em style={{ color: 'red' }}>06/03/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.5' ? (
                            <ul className={style.newli}>
                                <li>Se corrige configuracion de precios, la guia se calcula a la lista de precios actual unicamente cuando se descarga la guia</li>
                                <li>Se modifico componente de rendicion de personal para que descargue la tabla de rendicion a Excel y boton para cargar mas guias</li>
                                <li>Se modifica input de seleccion al momento de seleccionar una guia para cuadrarla, que la lista de guias este por orden de numero de orden</li>
                                <li>Se modifica componente de guias de reparto para que enseñe cuantas guias se han creado ese dia</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.5')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.5' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.4</h5>
                    <em style={{ color: 'red' }}>03/03/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.4' ? (
                            <ul className={style.newli}>
                                <li>Se empezo a desarrollar funcionalidades que permiten personalizar documentos excel al exportarlos</li>
                                <li>Se corrigio bug al momento de cancelar una cuadratura, se perdia la referencia del faltante</li>
                                <li>Se hacen mejoras en la instancia de la base de datos paara acelerar y mantener rapidez en las consultas</li>
                                <li>Se corrige bug de error de conexion de base de datos</li>
                                <li>Se corrige bug al momento de cambiar un chofer o peoneta quedaba como si tuviera una orden activa</li>
                                <li>Se corrige bug al momento de descargar una orden que los campos de llenos queden desactivados hasta que se seleccione una orden</li>
                                <li>Se corrige al momento de enviar un correo para modificar una orden, al darle cancelar y volver a entrar ahora permite volver enviar el correo a cualquiera en la lista de usuarios</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.4')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.4' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.3</h5>
                    <em style={{ color: 'red' }}>27/02/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.3' ? (
                            <ul className={style.newli}>
                                <li>Se corrigio bug al momento de crear un cuadrante, cuando se dejaba el campo en blanco creaba el cuadrante en vacio.</li>
                                <li>Se corrigio bug al momento de crear una patente, cuando se dejaba el campo en blanco creaba la patente en vacio.</li>
                                <li>Se corrigio cuando se cuadren una orden en pantallas diferentes, que la segunda vez que se intente no se pueda cuadrar</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.3')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.3' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.2</h5>
                    <em style={{ color: 'red' }}>24/02/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.2' ? (
                            <ul className={style.newli}>
                                <li>Se corrigio bug al momento de traer por fechas las rendiciones, en la pantalla de rendicion general.</li>
                                <li>Se reestructuro componente de rendicion de personal(ahora se puede buscar por rango de fecha y las fechas aparecen en orden descendente)</li>
                                <li>Se añadio el poder introducir los gastos de una orden al momento de cuadrarla, con su respectivo monto y descripcion</li>
                                <li>Se habilito un boton para poder observar los gastos de una orden en la pantalla de rendicion de ventas, solo si la orden tiene gastos</li>
                                <li>Se deshabilito el poder subir valores con flechas y rueda de raton al momento de recargar o descargar una orden</li>
                                <li>Se cambiaron los colores de los botones al momento de eliminar, modificar, recargar o abonar una orden</li>
                                <li>Se agrego barra de busquedad en la pantalla de rendicion de ventas para buscar una orden por nombre de chofer o Peoneta</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.2')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.2' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.1</h5>
                    <em style={{ color: 'red' }}>23/02/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.1' ? (
                            <ul className={style.newli}>
                                <li>Se corrigio bug al momento de cuadrar, que no mostraba el faltante real.</li>
                                <li>Se agregó la funcionalidad de tabular hacia abajo en la cuadratura de los vales.</li>
                                <li>Se implemento barra de busqueda al momento de descargar una orden para buscar por nombre de chofer</li>
                                <li>Se implemento boton de anticipos si la orden tiene anticipos en la pantalla de rendicion de ventas</li>
                                <li>Se agrego nombre y apellido de chofer y peoneta al momento de cuadrar una orden</li>
                                <li>Se agrego cambiar el personal de una orden en la cuadratura, tanto chofer como peoneta se pueden cambiar ahora</li>
                            </ul>
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.1')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.1' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                    <h5>Ver. 1.0.0</h5> 
                    <em style={{ color: 'red' }}>22/02/2023</em>
                    {
                        verMas && name === 'Ver. 1.0.0' ? (
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
                        ) : null
                    }
                    <br />
                    <button onClick={
                        () => {
                            setVerMas(!verMas);
                            setName('Ver. 1.0.0')
                        }
                    } className={style.verMas}>
                        { verMas && name === 'Ver. 1.0.0' ? 'Ver menos...' : 'Ver mas...'}
                    </button>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ChangeLog
