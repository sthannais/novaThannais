import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bringAllListaDePrecios } from '../../redux/novaSlice/thunks'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form, Table } from 'reactstrap';
import { MdPriceChange } from 'react-icons/md'
import 'bootstrap/dist/css/bootstrap.css';
import style from './listaDePrecios.module.css'

const ListaDePrecios = () => {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [precioId, setPrecioId] = useState(null)

    const { todosLosPrecios } = useSelector(state => state.Nova)

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
                <ModalHeader toggle={toggle}>Lista de precios</ModalHeader>
                <ModalBody>
                    <Form>
                        <select onChange={(e) => setPrecioId(e.target.value)} className="form-select">
                            <option value={null}>Seleccione una lista de precio</option>
                            {todosLosPrecios?.map((precio) => (
                                <option key={precio.id} value={precio.id}>{precio.name}</option>
                            ))}
                        </select>
                    </Form>
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
                                    <tr>
                                        <td>
                                            Tarro 5kg
                                        </td>
                                        <td>
                                            {precio.precio5kg}
                                        </td>
                                    </tr>
                                ) : null
                                )
                            )}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ListaDePrecios
