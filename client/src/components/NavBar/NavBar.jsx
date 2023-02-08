import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/autenticacionSlice/thunks';
import style from './navBar.module.css';
import monito from '../../assets/JORGITO.svg';
import logo from '../../assets/nova-blanco-2.png';

const NavBar = () => {

    const dispatch = useDispatch()
    const { id, rolId, name, lastname, email } = useSelector((state) => state.Autenticacion.autBack)

    const handleLogout = () => {
        dispatch(logoutAction(id))
    }

    const [buttonSelected, setButtonSelected] = useState('')

    return (
        <div className={style.navBarContainer} id="navbar">
                <img src={monito} alt="monito" className={style.styleMonito} />

            {rolId && rolId === 1 ? (

                email == 'irmaperez.gea@gmail.com'  ? (
                    <div>
                    <p className={style.completeName}>{name + " " + lastname}</p>
                    <p className={style.rolStyle}>Administrador</p>

                    <div className={style.grid1}>
                        <Link to="/home" >
                            <button
                            className={
                                buttonSelected === 'home' ? style.guideStyleSelected : style.guideStyle
                            } onClick={() => setButtonSelected('home')}>
                                Lista de Personal
                            </button>  
                        </Link>
                        <Link to="/rendicion">
                            <button onClick={
                                () => setButtonSelected('rendicion')
                            } className={
                                buttonSelected === 'rendicion' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Rendición Gastos
                            </button>
                        </Link>
                        <Link to="/rendicionGeneral">
                            <button onClick={
                                () => setButtonSelected('rendicionGeneral')
                            } className={
                                buttonSelected === 'rendicionGeneral' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Rendición General
                            </button>
                        </Link>
                        <Link to="/historialAnticipos">
                            <button onClick={
                                () => setButtonSelected('historialAnticipos')
                            } className={
                                buttonSelected === 'historialAnticipos' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Historial Anticipos
                            </button>
                        </Link>
                        <button className={style.guideStyle} onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
                ) : email === "maicol.nieto@jorgegas.cl" || "jorgetalento@outlook.es" || "benjaminsotoro@gmail.com" ? (
                    <div>
                    <p className={style.completeName}>{name + " " + lastname}</p>
                    <p className={style.rolStyle}>Administrador</p>

                    <div className={style.grid1}>
                        <Link to="/home" >
                            <button
                            className={
                                buttonSelected === 'home' ? style.guideStyleSelected : style.guideStyle
                            } onClick={() => setButtonSelected('home')}>
                                Lista de Personal
                            </button>  
                        </Link>
                        <Link to="/guide">
                            <button onClick={
                                () => setButtonSelected('guide')
                            } className={
                                buttonSelected === 'guide' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Guia de Reparto
                            </button>
                        </Link>
                        <Link to="/rendicion">
                            <button onClick={
                                () => setButtonSelected('rendicion')
                            } className={
                                buttonSelected === 'rendicion' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Rendición Gastos
                            </button>
                        </Link>
                        <Link to="/rendicionGeneral">
                            <button onClick={
                                () => setButtonSelected('rendicionGeneral')
                            } className={
                                buttonSelected === 'rendicionGeneral' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Rendición General
                            </button>
                        </Link>
                        <Link to="/historialAnticipos">
                            <button onClick={
                                () => setButtonSelected('historialAnticipos')
                            } className={
                                buttonSelected === 'historialAnticipos' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Historial Anticipos
                            </button>
                        </Link>
                        {/* <Link to="/metricas">
                            <button onClick={
                                () => setButtonSelected('metricas')
                            } className={
                                buttonSelected === 'metricas' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Metricas
                            </button>
                        </Link> */}
                        <button className={style.guideStyle} onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
                ) :(
                    <div>
                    <p className={style.completeName}>{name + " " + lastname}</p>
                    <p className={style.rolStyle}>Administrador</p>

                    <div className={style.grid1}>
                        <Link to="/home" >
                            <button
                            className={
                                buttonSelected === 'home' ? style.guideStyleSelected : style.guideStyle
                            } onClick={() => setButtonSelected('home')}>
                                Lista de Personal
                            </button>  
                        </Link>
                        <Link to="/guide">
                            <button onClick={
                                () => setButtonSelected('guide')
                            } className={
                                buttonSelected === 'guide' ? style.guideStyleSelected : style.guideStyle
                            }>
                                Guia de Reparto
                            </button>
                        </Link>
                        <button className={style.guideStyle} onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
                )):
                (
                    <p className={style.completeName}> no tienes acceso </p>
                )}
                <img src={logo} alt="logo" className={style.logo} />
        </div>
    )
}

export default NavBar
