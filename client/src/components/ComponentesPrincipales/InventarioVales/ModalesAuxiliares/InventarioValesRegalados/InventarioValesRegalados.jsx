import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { MdOutlineCardGiftcard as TbGiftCard } from 'react-icons/md'
import { editarValesDigitalesRegalados }  from '../../../../../redux/novaSlice/thunks'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label }  from 'reactstrap';
import style from './inventarioValesRegalados.module.css';

const InventarioValesRegalados = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [disabled, setDisabled] = useState(true)

    const [valesRegalados, setValesRegalados] = useState({
        digital5kg: "",
        digital11kg: "",
        digital15kg: "",
        digital45kg: "",
        totalValesDigitales: 0
    })

    const handleInputChange = (e) => {
        setValesRegalados({
            ...valesRegalados,
            [e.target.name]: e.target.value
        })
    }

    const cleanState = () => {
        setValesRegalados({
            digital5kg: "",
            digital11kg: "",
            digital15kg: "",
            digital45kg: "",
            totalValesDigitales: 0
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editarValesDigitalesRegalados(valesRegalados))
        toggle()
        cleanState()
    }

    useEffect(() => {
        setValesRegalados({
            ...valesRegalados,
            totalValesDigitales: Number(valesRegalados.digital5kg) + Number(valesRegalados.digital11kg) + Number(valesRegalados.digital15kg) + Number(valesRegalados.digital45kg)
        })
    }, [valesRegalados.digital5kg, valesRegalados.digital11kg, valesRegalados.digital15kg, valesRegalados.digital45kg])

    useEffect(() => {
        if( valesRegalados.digital5kg !== "" &&
            valesRegalados.digital11kg !== "" &&
            valesRegalados.digital15kg !== "" &&
            valesRegalados.digital45kg !== ""
        ) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [valesRegalados.digital5kg, valesRegalados.digital11kg, valesRegalados.digital15kg, valesRegalados.digital45kg])

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <TbGiftCard className={style.icono}/>
                    <p>Vales regalados</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} size='sm'>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggle}>Vales regalados</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Vales digitales 5kg</Label>
                            <Input type="number" name="digital5kg" placeholder="0" className={style.inputsito} onChange={handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Vales digitales 11kg</Label>
                            <Input type="number" name="digital11kg" placeholder="0" className={style.inputsito} onChange={handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Vales digitales 15kg</Label>
                            <Input type="number" name="digital15kg" placeholder="0" className={style.inputsito} onChange={handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Vales digitales 45kg</Label>
                            <Input type="number" name="digital45kg" placeholder="0" className={style.inputsito} onChange={handleInputChange}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' disabled={disabled}>Guardar</Button>{' '}
                        <Button color="secondary" onClick={
                            () => {
                                toggle()
                                cleanState()
                            }
                        }>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default InventarioValesRegalados
