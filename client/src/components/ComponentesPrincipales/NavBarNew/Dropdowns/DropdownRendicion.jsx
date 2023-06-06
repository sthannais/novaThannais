import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { GiPayMoney } from 'react-icons/gi';
import { GiMoneyStack } from 'react-icons/gi';
import '../navBarNew.css';

function DropdownRendicion({ setOpen }) {

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
                to={ props.children === 'Rendición de Ventas' ? '/rendicionVentas' : '/rendicionGeneral' }
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
                    leftIcon={<GiPayMoney />}
                >
                    Rendición de Ventas
                </DropdownItem>
                <DropdownItem
                    leftIcon={<GiMoneyStack />}
                >
                    Rendición General
                </DropdownItem>
            </div>
        </CSSTransition>
        
    </div>
    );
}

export default DropdownRendicion