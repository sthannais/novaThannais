import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as Monito } from '../../../../assets/JORGITO.svg';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import { GoVersions } from 'react-icons/go';
import ChangeLog from '../../../ComponentesAuxiliares/ChangeLog/ChangeLog';
import { ReactComponent as CaretIcon } from '../../../../assetsOficial/icons/caret.svg';
import { ReactComponent as CogIcon } from '../../../../assetsOficial/icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../../../assetsOficial/icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../../../assetsOficial/icons/arrow.svg';
import { CSSTransition } from 'react-transition-group';
import '../navBarNew.css';

function DropdownPerfil() {

    const { rolId, name, lastname } = useSelector((state) => state.Autenticacion.autBack)
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <Link className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </Link>
        );
    }

    return (
    <div className="dropdown" style={{ height: menuHeight + 28 }} ref={dropdownRef}>

        <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                <DropdownItem
                    leftIcon={<Monito />}
                    rightIcon={<CaretIcon />}
                    goToMenu="profile"
                >
                    Mi Perfil
                </DropdownItem>
                <DropdownItem
                    leftIcon={<MdPublishedWithChanges />}
                    rightIcon={<ChevronIcon />}
                    goToMenu="changelog">
                    Changelog
                </DropdownItem>
                <DropdownItem
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}
                    goToMenu="configuracion">
                    Configuracion
                </DropdownItem>
            </div>
        </CSSTransition>

        <CSSTransition
            in={activeMenu === 'profile'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h2>Mi Perfil</h2>
                </DropdownItem>
                <DropdownItem leftIcon={<Monito />}>
                    {
                        name + ' ' + lastname
                    }
                </DropdownItem>
                <DropdownItem leftIcon={<IoPersonCircleOutline />}>
                    {
                        rolId === 1 ? 'Administrador' : 'Usuario'
                    }
                </DropdownItem>
            </div>
        </CSSTransition>
        
        
        <CSSTransition
            in={activeMenu === 'changelog'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
        >
        <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                <h2> Ver. 1.5.0</h2>
            </DropdownItem>
            <DropdownItem leftIcon={ <GoVersions /> }>
                <ChangeLog />
            </DropdownItem>
        </div>
        </CSSTransition>

        <CSSTransition
            in={activeMenu === 'configuracion'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                    <h2>Configuracion</h2>
                </DropdownItem>
            </div>
        </CSSTransition>

        
    </div>
    );
}

export default DropdownPerfil
