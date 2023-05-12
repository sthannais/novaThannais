import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../redux/autenticacionSlice/thunks';
import style from './navBar.module.css';
import monito from '../../assets/JORGITO.svg';
import logo from '../../assets/nova-blanco-2.png';
import ChangeLog from '../ChangeLog/ChangeLog';


const NavBar = () => {

    const width = window.innerWidth;
    const dispatch = useDispatch()
    const { id, rolId, name, lastname, email } = useSelector((state) => state.Autenticacion.autBack)

    const handleLogout = () => {
        dispatch(logoutAction(id))
    }

    const [buttonSelected, setButtonSelected] = useState('')

    // Estados para version movil

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [timeToDesplegate, setTimeToDesplegate] = useState(false);

    const isDesktop = width >= 768;
    const toggleMenu = () => {
        if(!isDesktop) {
            if(isMenuOpen === false) {
                setIsMenuOpen(true);
                setTimeout(() => {
                    setTimeToDesplegate(!timeToDesplegate)
                }, 100)
            } else {
                setTimeToDesplegate(!timeToDesplegate)
                setTimeout(() => {
                    setIsMenuOpen(false);
                }, 500)
            }
        }
    };

    const navBarRef = useRef(null);

    // const handleClickOutside = (event) => {
    //     if (navBarRef.current && !navBarRef.current.contains(event.target)) {
    //         setIsMenuOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside, true);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true);
    //     };
    // }, []);

    useEffect(() => {
        if (isDesktop) setIsMenuOpen(false);
    }, [isDesktop]);

    return (
        <div>
            {
                !isDesktop ? (
                <div className={
                    isMenuOpen ? style.closeMenu : style.hamburgerMenu
                } onClick={toggleMenu} id='hamburguesa'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                ) : null
            }
    
            { isMenuOpen || isDesktop ? (
                    <>
                <div className={`${style.navBarContainer} ${isMenuOpen && timeToDesplegate ? style.navBarContainerOpen : ""}`} id="navbar" ref={navBarRef}>
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
                    ) : email === 'rendicion1@jorgegas.cl' || 
                        email === 'rendicion2@jorgegas.cl' ? (
                            <div>
                            <p className={style.completeName}>{name + " " + lastname}</p>
                            <p className={style.rolStyle}>Administrador</p>

                            <div className={style.grid1}>
                                <Link to="/rendicion">
                                    <button onClick={
                                        () => setButtonSelected('rendicion')
                                    } className={
                                        buttonSelected === 'rendicion' ? style.guideStyleSelected : style.guideStyle
                                    }>
                                        Rendición de ventas
                                    </button>
                                </Link>
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
            </div>
            </>
            ) : null}
        </div>
    )
}

export default NavBar
