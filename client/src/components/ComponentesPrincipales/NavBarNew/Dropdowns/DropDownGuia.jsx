import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { MdSupervisorAccount } from 'react-icons/md';
import '../navBarNew.css';

function DropdownGuia({ setOpen }) {

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
            <Link 
                to={ props.children === 'Lista de Personal' ? '/listaDePersonal' : '/rendicionPersonal'} 
                className="menu-item" 
                onClick={() => {
                    props.goToMenu && setActiveMenu(props.goToMenu)
                    setOpen(false)
                }}
            >
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
                    leftIcon={<MdSupervisorAccount />}
                >
                    Guias de Reparto
                </DropdownItem>
                <DropdownItem
                    leftIcon={<RiAccountPinCircleFill />}
                >
                    Historial de Anticipos 
                </DropdownItem>
            </div>
        </CSSTransition>
        
    </div>
    );
}

export default DropdownGuia