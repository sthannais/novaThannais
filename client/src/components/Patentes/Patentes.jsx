import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, Label, Input } from 'reactstrap';
import { createPatente } from '../../redux/novaSlice/thunks';
import { handleKeydown } from '../../helpers/KeyDown';
import patentes from '../../assetsOficial/patente.svg'
import 'bootstrap/dist/css/bootstrap.css';
import style from './patentes.module.css'

const Patentes = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [patente, setPatente] = useState({
        name: ''
    })

    const handleChange = (e) => {
        setPatente({
            ...patente,
            name: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createPatente(patente))
        setPatente({
            name: ''
        })
        toggle();
    }

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <img src={patentes} alt="patentes" className={style.icon}/>
                    <p>Crear patente</p>
                </button> 
            </div>
            <Modal isOpen={modal} toggle={toggle} onKeyDown={handleKeydown} size="sm">
                <ModalHeader toggle={toggle} >Crear patente</ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody>
                        <div className={style.form}>
                            <Label>Numero de patente</Label>
                            <Input type="text" name="name" onChange={handleChange} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit'>Crear patente</Button>
                        <Button color="secondary" onClick={toggle}>Cerrar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default Patentes
