import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form }  from 'reactstrap';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { handleKeydown } from '../../../../../helpers/KeyDown';
import { modifyPersonal, getPersonalId } from '../../../../../redux/novaSlice/thunks';
import Select from 'react-select';
import style from './modificarPersonal.module.css';
import 'bootstrap/dist/css/bootstrap.css';

const ModificarPersonal = () => {

    const { novaPersonals, novaPersonalById } = useSelector(state => state.Nova);
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleNested = () => setNestedModal(!nestedModal);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
    const [idPersonal, setIdPersonal] = useState(0);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [lastPassword, setLastPassword] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'lastname':
                setLastname(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'lastPassword':
                setLastPassword(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        dispatch(getPersonalId(idPersonal));
    }, [idPersonal])

    useEffect(() => {
        setName(novaPersonalById?.name);
        setLastname(novaPersonalById?.lastname);
        setEmail(novaPersonalById?.email);
    }, [novaPersonalById])

    useEffect(() => {
        if (idPersonal !== 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [idPersonal]) 

    const personalOptions = novaPersonals.map(personal => {
        return {
            value: personal.id,
            label: personal.name + ' ' + personal.lastname
        }
    });


    return (
        <div>
            <button onClick={toggle} className={style.boton}>
                <BsFillPersonLinesFill className={style.ico} />
                &nbsp;
                Modificar personal
            </button>
            <Modal isOpen={modal} toggle={toggle} onKeyDown={handleKeydown}>
                <ModalHeader toggle={toggle} className={style.modalHeader}>Modificar personal</ModalHeader>
                <ModalBody className={style.modalBody}>
                    <Form className={style.form}>
                        <FormGroup>
                            <Select
                                options={personalOptions}
                                onChange={e => setIdPersonal(e.value)}
                                placeholder="Seleccionar personal"
                                className={style.select}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="Nombre" 
                                className={style.input}
                                onChange={handleChange}
                                autoComplete="off"
                                value={name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="lastname" 
                                id="lastname" 
                                placeholder="Apellido" 
                                className={style.input}
                                onChange={handleChange}
                                autoComplete="off"
                                value={lastname}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text" 
                                name="email" 
                                id="email" 
                                placeholder="Email" 
                                className={style.input} 
                                onChange={handleChange}
                                autoComplete="off"
                                value={email}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="password" 
                                name="lastPassword" 
                                id="lastPassword" 
                                placeholder="Contraseña anterior" 
                                className={style.input} 
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Contraseña nueva" 
                                className={style.input} 
                                onChange={handleChange}
                                autoComplete="off"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className={style.modalFooter}>
                    <Button color="primary" className={style.button} disabled={disabled} onClick={toggleNested}>Modificar</Button>{' '}
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={setNestedModal ? toggle : undefined}>
                        <ModalHeader>¿Estas seguro de modificar la información de esta persona?</ModalHeader>
                        <ModalFooter>
                            <Button color="primary" onClick={
                                (e) => {
                                    e.preventDefault();
                                    dispatch(modifyPersonal(idPersonal, { name, lastname, email, lastPassword, password }));
                                    toggleNested();
                                    setIdPersonal(0);
                                    setName('');
                                    setLastname('');
                                    setEmail('');
                                    setLastPassword('');
                                    setPassword('');   
                                }}
                                >Aceptar</Button>{' '}
                            <Button color="secondary" onClick={toggleNested}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Button color="secondary" className={style.button} onClick={
                        () => {
                            toggle();
                            setIdPersonal(0);
                            setName('');
                            setLastname('');
                            setEmail('');
                            setLastPassword('');
                            setPassword('');
                        }
                    }>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModificarPersonal
