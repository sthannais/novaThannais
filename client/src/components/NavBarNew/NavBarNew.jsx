import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/autenticacionSlice/thunks';
import style from './navBarNew.module.css';
import monito from '../../assets/JORGITO.svg';
import logo from '../../assets/nova-blanco-2.png';
import ChangeLog from '../ChangeLog/ChangeLog';


const NavBarNew = () => {

    const dispatch = useDispatch()
    const { id, rolId, name, lastname, email } = useSelector((state) => state.Autenticacion.autBack)

    const handleLogout = () => {
        dispatch(logoutAction(id))
    }

    const [buttonSelected, setButtonSelected] = useState('')

    const navBarRef = useRef(null);

    return (
        <div>
            <>
                {/* <div className={style.navBarContainer} id="navbar" ref={navBarRef}>
                    <img src={monito} alt="monito" className={style.styleMonito} />
                    { 
                    rolId && rolId === 1 ? (
                    email === 'irmaperez.gea@gmail.com'  ? (
                        <div className={style.grid1}>
                            <p className={style.access}>¡No tienes acceso!</p>
                            <button className={style.guideStyle} onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </div>
                    ) : email === "maicol.nieto@jorgegas.cl" || 
                        email === "jorgetalento@outlook.es" || 
                        email === "benjaminsotoro@gmail.com" ||
                        email === "sergio.flores@jorgegas.cl" ||
                        email === "constanza.velasco@jorgegas.cl" || 
                        email === "jeniffer.moreno@jorgegas.cl" ||
                        email === "linda.donaire@jorgegas.cl" || 
                        email === "jhoskartoro@gmail.com" ||
                        email === "francisca.rodrigez@jorgegas.cl" ||
                        email === "constanza@gmail.com"  
                        ? (
                            <div>
                                <p className={style.completeName}>{name + " " + lastname}</p>
                                <p className={style.rolStyle}>{
                                    email === "benjaminsotoro@gmail.com" ? "Modo Dios" : "Administrador"
                                }</p>

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
                                            Rendición de ventas
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
                                    {
                                        email === "benjaminsotoro@gmail.com" ? (
                                            <Link to="/inventarioVales">
                                                <button onClick={
                                                    () => setButtonSelected('inventarioVales')
                                                } className={
                                                    buttonSelected === 'inventarioVales' ? style.guideStyleSelected : style.guideStyle
                                                }>
                                                    Vales
                                                </button>
                                            </Link>
                                        ) : null
                                    }
                                    <button className={style.guideStyle} onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        ) : (
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
                                    <Link to="/rendicionGeneral">
                                        <button onClick={
                                            () => setButtonSelected('rendicionGeneral')
                                        } className={
                                            buttonSelected === 'rendicionGeneral' ? style.guideStyleSelected : style.guideStyle
                                        }>
                                            Rendición General
                                        </button>
                                    </Link>
                                    <button className={style.guideStyle} onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        )):
                    (
                        <div className={style.grid1}>
                            <p className={style.access}>¡No tienes acceso!</p>
                            <button className={style.guideStyle} onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                    <img src={logo} alt="logo" className={style.logo} />
                    <ChangeLog />
                </div> */}
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown link
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item">Action</a>
                            <a class="dropdown-item">Another action</a>
                            <a class="dropdown-item">Something else here</a>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
            </>
        </div>
    )
}

export default NavBarNew
