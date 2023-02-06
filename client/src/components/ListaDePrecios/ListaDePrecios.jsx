import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bringAllListaDePrecios, activeListaDePrecios, createListaDePrecios } from '../../redux/novaSlice/thunks'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, Table } from 'reactstrap';
import { MdPriceChange } from 'react-icons/md'
import activa from '../../assetsOficial/activa.svg'
import 'bootstrap/dist/css/bootstrap.css';
import style from './listaDePrecios.module.css'

const ListaDePrecios = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);
    const [precioId, setPrecioId] = useState(null)

    const { todosLosPrecios } = useSelector(state => state.Nova)

    const [nuevaLista, setNuevaLista] = useState({
        name: '',
        precio5kg: '',
        precio11kg: '',
        precio15kg: '',
        precio45kg: ''
    })

    const nuevaListaOnchange = (e) => {
        setNuevaLista({
            ...nuevaLista,
            [e.target.name]: e.target.value
        })
    }

    const nuevaListaOnsubmit = (e) => {
        e.preventDefault()
        dispatch(createListaDePrecios(nuevaLista))
        setNuevaLista({
            name: '',
            precio5kg: '',
            precio11kg: '',
            precio15kg: '',
            precio45kg: ''
        })
        toggle2()
    }

    useEffect (() => {
        dispatch(bringAllListaDePrecios())
    }, [dispatch])

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <MdPriceChange className={style.icono} />
                    <p>Lista de precios</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} className={style.modal}>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(activeListaDePrecios(precioId))
                }}>
                    <ModalHeader toggle={toggle}>Lista de precios</ModalHeader>
                    <ModalBody>
                            <select onChange={(e) => setPrecioId(Number(e.target.value))} className="form-select">
                                <option hidden>Seleccione una lista de precio</option>
                                {todosLosPrecios?.map((precio) => (
                                    <option key={precio.id} value={precio.id}>
                                        {precio.name}
                                        &nbsp;
                                        &nbsp;
                                        {
                                            precio.active === true ? (
                                                <p>Activa✅</p>
                                            ) : null
                                        }
                                    </option>
                                ))}
                            </select>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todosLosPrecios?.map((precio) => (
                                    precio.id === precioId ? (
                                        <>
                                            <tr key={precio.id}>
                                                <td>
                                                    Tarro 5kg
                                                </td>
                                                <td>
                                                    {precio.precio5kg}
                                                </td>
                                            </tr>
                                            <tr key={precio.id}>
                                                <td>
                                                    Tarro 11kg
                                                </td>
                                                <td>
                                                    {precio.precio11kg}
                                                </td>
                                            </tr>
                                            <tr key={precio.id}>
                                                <td>
                                                    Tarro 15kg
                                                </td>
                                                <td>
                                                    {precio.precio15kg}
                                                </td>
                                            </tr>
                                            <tr key={precio.id}>
                                                <td>
                                                    Tarro 45kg
                                                </td>
                                                <td>
                                                    {precio.precio45kg}
                                                </td>
                                            </tr>
                                        </>
                                    ) : null
                                    )
                                )}
                            </tbody>
                        </Table>
                        <Button color='danger' onClick={toggle2}>Crear nuevo precio</Button>{' '}
                        <Button color="primary" type='submit' onClick={toggle}>Cambiar lista</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancelar</Button>
                    </ModalBody>
                </Form>
                <Modal isOpen={modal2} toggle={toggle2} className={style.modal} size="sm">
                    <ModalHeader toggle={toggle2}>Crear nueva lista de precios</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={nuevaListaOnsubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input name="name" type="text" className="form-control" id="name" value={nuevaLista.name} onChange={(e) => nuevaListaOnchange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio5kg" className="form-label">Precio 5kg</label>
                                <input name="precio5kg" type="number" className="form-control" id="precio5kg" value={nuevaLista.precio5kg} onChange={(e) => nuevaListaOnchange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio11kg" className="form-label">Precio 11kg</label>
                                <input name="precio11kg" type="number" className="form-control" id="precio11kg" value={nuevaLista.precio11kg} onChange={(e) => nuevaListaOnchange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio15kg" className="form-label">Precio 15kg</label>
                                <input name="precio15kg" type="number" className="form-control" id="precio15kg" value={nuevaLista.precio15kg} onChange={(e) => nuevaListaOnchange(e)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio45kg" className="form-label">Precio 45kg</label>
                                <input name="precio45kg" type="number" className="form-control" id="precio45kg" value={nuevaLista.precio45kg} onChange={(e) => nuevaListaOnchange(e)}/>
                            </div>
                            <Button color="primary" type='submit'>Crear</Button>{' '}
                            <Button color="secondary" onClick={toggle2}>Cancelar</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Modal>
        </div>
    )
}

export default ListaDePrecios
