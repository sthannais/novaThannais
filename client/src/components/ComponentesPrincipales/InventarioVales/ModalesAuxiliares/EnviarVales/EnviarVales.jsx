import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MdSendToMobile } from 'react-icons/md'
import moment from 'moment';
import 'moment-timezone';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup }  from 'reactstrap';
import { descargarVales } from '../../../../../redux/novaSlice/thunks';
import style from './enviarVales.module.css';

const EnviarVales = () => {

    const dispatch = useDispatch();
    const toggle = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const soloFecha = moment(new Date()).tz('America/Santiago').format('YYYY-MM-DD');
    const soloHora = moment(new Date()).tz('America/Santiago').format('HH:mm:ss');

    const [nuevoEnvio, setNuevoEnvio] = useState({
        fecha: soloFecha,
        hora: soloHora,
        numeroGuia: 0,
        numeroFactura: 0,
        nombreEntrega: '',
        nombreRecibe: '',
        vale5kgFisico: '',
        vale11kgFisico: '',
        vale15kgFisico: '',
        vale45kgFisico: '',
        vale5kgDigital: '',
        vale11kgDigital: '',
        vale15kgDigital: '',
        vale45kgDigital: '',
    });

    const cleanState = () => {
        setNuevoEnvio({
            fecha: soloFecha,
            hora: soloHora,
            numeroGuia: 0,
            numeroFactura: 0,
            nombreEntrega: '',
            nombreRecibe: '',
            vale5kgFisico: '',
            vale11kgFisico: '',
            vale15kgFisico: '',
            vale45kgFisico: '',
            vale5kgDigital: '',
            vale11kgDigital: '',
            vale15kgDigital: '',
            vale45kgDigital: '',
        })
    }

    const handleChange = (e) => {
        setNuevoEnvio({
            ...nuevoEnvio,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(descargarVales(nuevoEnvio));
        cleanState();
        toggle();
    }

    useEffect(() => {
        if(
            nuevoEnvio.numeroGuia !== 0 &&
            nuevoEnvio.numeroFactura !== 0 &&
            nuevoEnvio.nombreEntrega !== '' &&
            nuevoEnvio.nombreRecibe !== '' &&
            nuevoEnvio.vale5kgFisico !== '' &&
            nuevoEnvio.vale11kgFisico !== '' &&
            nuevoEnvio.vale15kgFisico !== '' &&
            nuevoEnvio.vale45kgFisico !== '' &&
            nuevoEnvio.vale5kgDigital !== '' &&
            nuevoEnvio.vale11kgDigital !== '' &&
            nuevoEnvio.vale15kgDigital !== '' &&
            nuevoEnvio.vale45kgDigital !== ''
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [nuevoEnvio])

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <MdSendToMobile className={style.icono}/>
                    <p>Salida de vales</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} size='sm'>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggle}>Salida de vales</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input 
                                type="number" 
                                name="numeroGuia" 
                                id="numeroGuia" 
                                placeholder="Numero de guia"
                                className={style.inputsitos} 
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="number"
                                name="numeroFactura"
                                id="numeroFactura"
                                placeholder="Numero de factura"
                                className={style.inputsitos}
                                onChange={handleChange} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="text"
                                name="nombreEntrega"
                                id="nombreEntrega"
                                placeholder="Nombre de quien entrega"
                                className={style.inputsitos}
                                onChange={handleChange}
                                autoComplete='off' 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="text"
                                name="nombreRecibe"
                                id="nombreRecibe"
                                placeholder="Nombre de quien recibe"
                                className={style.inputsitos}
                                onChange={handleChange}
                                autoComplete='off' 
                            />
                        </FormGroup>
                        <div className={style.containerVales}>
                            <p style={{
                                fontWeight: 'bold',
                                fontFamily: 'Roboto',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                marginTop: '0.5rem',
                            }}>
                                Vales a salir
                            </p>
                            <div className={style.gridOne} >
                                <div className={style.grid2}>
                                    <p style={{fontWeight: "bold", fontSize: "18px"}}>Fisicos</p>
                                    <div>
                                        <p>5kg</p>
                                        <Input
                                            type="number"
                                            name="vale5kgFisico"
                                            id="vale5kgFisico"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                        <p>11kg</p>
                                        <Input
                                            type="number"
                                            name="vale11kgFisico"
                                            id="vale11kgFisico"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                        <p>15kg</p>
                                        <Input
                                            type="number"
                                            name="vale15kgFisico"
                                            id="vale15kgFisico"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                    <p>45kg</p>
                                        <Input
                                            type="number"
                                            name="vale45kgFisico"
                                            id="vale45kgFisico"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div className={style.gridx}>
                                    <p style={{fontWeight: "bold", fontSize: "18px"}}>Digitales</p>
                                    <div>
                                        <p>5kg</p>
                                        <Input
                                            type="number"
                                            name="vale5kgDigital"
                                            id="vale5kgDigital"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                        <p>11kg</p>
                                        <Input
                                            type="number"
                                            name="vale11kgDigital"
                                            id="vale11kgDigital"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                        <p>15kg</p>
                                        <Input
                                            type="number"
                                            name="vale15kgDigital"
                                            id="vale15kgDigital"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                    <div>
                                    <p>45kg</p>
                                        <Input
                                            type="number"
                                            name="vale45kgDigital"
                                            id="vale45kgDigital"
                                            className={style.inputs3}
                                            onChange={handleChange}
                                            min={0}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit' disabled={disabled}>Enviar</Button>
                        <Button color="secondary" onClick={
                            () => {
                                toggle();
                                cleanState();
                            }
                        }>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default EnviarVales
