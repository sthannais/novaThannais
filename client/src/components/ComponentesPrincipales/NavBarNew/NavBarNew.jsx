import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../../redux/autenticacionSlice/thunks';
import { ReactComponent as Monito } from '../../../assets/JORGITO.svg';
import logo from '../../../assets/nova-blanco-2.png';
import DropdownPerfil from './Dropdowns/DropdownPerfil';
import DropdownPersonal from './Dropdowns/DropdownPersonal';
import DropdownRendicion from './Dropdowns/DropdownRendicion';
import DropdownGuia from './Dropdowns/DropDownGuia';
import { MdSwitchAccount } from 'react-icons/md';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FaTruck } from 'react-icons/fa';
import './navBarNew.css';

const NavBarNew = () => {

    const dispatch = useDispatch()

    // const handleLogout = () => {
    //     dispatch(logoutAction(id))
    // }

    const [openPerfil, setOpenPerfil] = useState(false);
    const [openPersonal, setOpenPersonal] = useState(false);
    const [openRendicion, setOpenRendicion] = useState(false);
    const [openGuia, setOpenGuia] = useState(false);

    const [buttonSelected, setButtonSelected] = useState('')

    useEffect(() => {
        if (buttonSelected === 'navItemPerfil') {
            setOpenPersonal(false)
            setOpenRendicion(false)
            setOpenGuia(false)
        } else if (buttonSelected === 'navItemPersonal') {
            setOpenPerfil(false)
            setOpenRendicion(false)
            setOpenGuia(false)
        } else if (buttonSelected === 'navItemRendicion') {
            setOpenPerfil(false)
            setOpenPersonal(false)
            setOpenGuia(false)
        } else if (buttonSelected === 'navItemGuia') {
            setOpenPerfil(false)
            setOpenPersonal(false)
            setOpenRendicion(false)
        }
    }, [buttonSelected])

    return (
        <Navbar>
            <NavItem 
                icon={<FaTruck /> } 
                open={openGuia} 
                setOpen={setOpenGuia} 
                setButtonSelected={setButtonSelected} 
                buttonSelected={buttonSelected}
                id='navItemGuia'
            >
                <DropdownGuia setOpen={setOpenGuia}/>
            </NavItem>

            <NavItem 
                icon={<RiMoneyDollarCircleFill />} 
                open={openRendicion} 
                setOpen={setOpenRendicion} 
                setButtonSelected={setButtonSelected} 
                buttonSelected={buttonSelected}
                id='navItemRendicion'
            >
                <DropdownRendicion setOpen={setOpenRendicion}/>
            </NavItem>
            
            <NavItem 
                icon={<MdSwitchAccount />} 
                open={openPersonal} 
                setOpen={setOpenPersonal} 
                setButtonSelected={setButtonSelected} 
                buttonSelected={buttonSelected}
                id='navItemPersonal'
            >
                <DropdownPersonal setOpen={setOpenPersonal}/>
            </NavItem>

            <NavItem 
                icon={<Monito />} 
                open={openPerfil} 
                setOpen={setOpenPerfil} 
                setButtonSelected={setButtonSelected} 
                buttonSelected={buttonSelected}
                id='navItemPerfil'
            >
                <DropdownPerfil setOpen={setOpenPerfil}/>
            </NavItem>
        </Navbar>
      );
}

    function Navbar(props) {
        return (
        <nav className="navbar">
            <img src={logo} alt="LogoNova" className='logoNova'/>
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
        );
    }
    
    function NavItem({ icon, children, open, setOpen, setButtonSelected, buttonSelected, id }) {

        return (
        <li className="nav-item">
            <Link className="icon-button" onClick={() => {
                setOpen(!open)
                setButtonSelected(id)
            }
            }>
                { icon }
            </Link>
    
            { 
                open && children 
            }
        </li>
        );
    }

export default NavBarNew
