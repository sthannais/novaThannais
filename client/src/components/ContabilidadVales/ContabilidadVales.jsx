import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Form, Label, Table }  from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { contabilidadVales } from '../../redux/novaSlice/thunks';
import { IoChatbubbleEllipsesOutline, IoChatbubbleEllipses } from 'react-icons/io5';
import { IoTicketSharp } from 'react-icons/io5';
import moment from 'moment';
import 'moment-timezone';
import style from './contabilidadVales.module.css';

const ContabilidadVales = () => {

    const dispatch = useDispatch();
    const { inventarioVales } = useSelector((state) => state.Nova);
    const soloFecha = moment(new Date()).tz('America/Santiago').format('YYYY-MM-DD');
    const soloHora = moment(new Date()).tz('America/Santiago').format('HH:mm:ss');
    const [activarComentario, setActivarComentario] = useState("");

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [vales, setVales] = useState({
        fisico5kg: '',
        fisico11kg: '',
        fisico15kg: '',
        fisico45kg: '',
        digital5kg: '',
        digital11kg: '',
        digital15kg: '',
        digital45kg: '',
    });

    const [diferencia, setDiferencia] = useState({
        dif5kgFisico: '',
        dif11kgFisico: '',
        dif15kgFisico: '',
        dif45kgFisico: '',
        dif5kgDigital: '',
        dif11kgDigital: '',
        dif15kgDigital: '',
        dif45kgDigital: '',
    });

    const [comentario, setComentario] = useState({
        comFisico5kg: '',
        comFisico11kg: '',
        comFisico15kg: '',
        comFisico45kg: '',
        comDigital5kg: '',
        comDigital11kg: '',
        comDigital15kg: '',
        comDigital45kg: '',
    });

    useEffect(() => {
        setDiferencia({
            dif5kgFisico: (Number(vales.fisico5kg) - Number(inventarioVales[0]?.fisico5kg)) < 0 ? (Number(vales.fisico5kg) - Number(inventarioVales[0]?.fisico5kg)) * -1 : (Number(vales.fisico5kg) - Number(inventarioVales[0]?.fisico5kg)),
            dif11kgFisico: (Number(vales.fisico11kg) - Number(inventarioVales[0]?.fisico11kg)) < 0 ? (Number(vales.fisico11kg) - Number(inventarioVales[0]?.fisico11kg)) * -1 : (Number(vales.fisico11kg) - Number(inventarioVales[0]?.fisico11kg)),
            dif15kgFisico: (Number(vales.fisico15kg) - Number(inventarioVales[0]?.fisico15kg)) < 0 ? (Number(vales.fisico15kg) - Number(inventarioVales[0]?.fisico15kg)) * -1 : (Number(vales.fisico15kg) - Number(inventarioVales[0]?.fisico15kg)),
            dif45kgFisico: (Number(vales.fisico45kg) - Number(inventarioVales[0]?.fisico45kg)) < 0 ? (Number(vales.fisico45kg) - Number(inventarioVales[0]?.fisico45kg)) * -1 : (Number(vales.fisico45kg) - Number(inventarioVales[0]?.fisico45kg)),
            dif5kgDigital: (Number(vales.digital5kg) - Number(inventarioVales[0]?.digital5kg)) < 0 ? (Number(vales.digital5kg) - Number(inventarioVales[0]?.digital5kg)) * -1 : (Number(vales.digital5kg) - Number(inventarioVales[0]?.digital5kg)),
            dif11kgDigital: (Number(vales.digital11kg) - Number(inventarioVales[0]?.digital11kg)) < 0 ? (Number(vales.digital11kg) - Number(inventarioVales[0]?.digital11kg)) * -1 : (Number(vales.digital11kg) - Number(inventarioVales[0]?.digital11kg)),
            dif15kgDigital: (Number(vales.digital15kg) - Number(inventarioVales[0]?.digital15kg)) < 0 ? (Number(vales.digital15kg) - Number(inventarioVales[0]?.digital15kg)) * -1 : (Number(vales.digital15kg) - Number(inventarioVales[0]?.digital15kg)),
            dif45kgDigital: (Number(vales.digital45kg) - Number(inventarioVales[0]?.digital45kg)) < 0 ? (Number(vales.digital45kg) - Number(inventarioVales[0]?.digital45kg)) * -1 : (Number(vales.digital45kg) - Number(inventarioVales[0]?.digital45kg)),
        });
    }, [vales, inventarioVales[0]]);

    const handleInputChange = (e) => {
        setVales({
            ...vales,
            [e.target.name]: e.target.value
        });
    };

    const handleInputChangeDiferencia = (e) => {
        setDiferencia({
            ...diferencia,
            [e.target.name]: e.target.value
        });
    };

    const handleInputChangeComentario = (e) => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        });
    };

    const handleClean = () => {
        setVales({
            fisico5kg: '',
            fisico11kg: '',
            fisico15kg: '',
            fisico45kg: '',
            digital5kg: '',
            digital11kg: '',
            digital15kg: '',
            digital45kg: '',
        });
        setDiferencia({
            dif5kgFisico: '',
            dif11kgFisico: '',
            dif15kgFisico: '',
            dif45kgFisico: '',
            dif5kgDigital: '',
            dif11kgDigital: '',
            dif15kgDigital: '',
            dif45kgDigital: '',
        });
        setComentario({
            comFisico5kg: '',
            comFisico11kg: '',
            comFisico15kg: '',
            comFisico45kg: '',
            comDigital5kg: '',
            comDigital11kg: '',
            comDigital15kg: '',
            comDigital45kg: '',
        });
    };

    const idInventario = 1;

    const handleSumit = (e) => {
        e.preventDefault();
        dispatch(contabilidadVales(idInventario,{
            date: soloFecha,
            hora: soloHora,
            fisico5kg: vales.fisico5kg,
            diferencia5kgFisico: diferencia.dif5kgFisico,
            comentario5kgFisico: comentario.comFisico5kg,
            fisico11kg: vales.fisico11kg,
            diferencia11kgFisico: diferencia.dif11kgFisico,
            comentario11kgFisico: comentario.comFisico11kg,
            fisico15kg: vales.fisico15kg,
            diferencia15kgFisico: diferencia.dif15kgFisico,
            comentario15kgFisico: comentario.comFisico15kg,
            fisico45kg: vales.fisico45kg,
            diferencia45kgFisico: diferencia.dif45kgFisico,
            comentario45kgFisico: comentario.comFisico45kg,
            digital5kg: vales.digital5kg,
            diferencia5kgDigital: diferencia.dif5kgDigital,
            comentario5kgDigital: comentario.comDigital5kg,
            digital11kg: vales.digital11kg,
            diferencia11kgDigital: diferencia.dif11kgDigital,
            comentario11kgDigital: comentario.comDigital11kg,
            digital15kg: vales.digital15kg,
            diferencia15kgDigital: diferencia.dif15kgDigital,
            comentario15kgDigital: comentario.comDigital15kg,
            digital45kg: vales.digital45kg,
            diferencia45kgDigital: diferencia.dif45kgDigital,
            comentario45kgDigital: comentario.comDigital45kg,
        }));
        handleClean();
        toggle();
    };

    const modalStyles = {
        position: 'relative',
        left: '15%',
        top: '3%',
        transform: 'translate(-32%, -2%)',
        fontFamily: 'Roboto, sans-serif',
        "--bs-modal-bg": "#F5F5F5"
    };

    return (
        <div>
            <div className={style.iconContainer2}>
                <button onClick={toggle} className={style.botonsito}>
                    <IoTicketSharp className={style.icono}/>
                    <p>Contabilizar vales</p>
                </button>
            </div>
            <Modal isOpen={modal} toggle={toggle} size="lg" style={modalStyles}>
                <Form onSubmit={handleSumit}> 
                    <ModalHeader toggle={toggle} className={style.modalHeader}>Contabilizar vales</ModalHeader>
                    <ModalBody className={style.modalBody}>
                        <p className={style.title2}>Vales fisicos</p>
                        <div className={style.tableContainer}>
                            <table className="table-sm table table-bordered table-hover responsive">
                                <thead>
                                    <tr>
                                        <th>Vales</th>
                                        <th>Cantidad pasiva</th>
                                        <th>Cantidad Real</th>
                                        <th>Diferencia</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Vale fisico 5kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico5kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="fisico5kg"
                                                value={vales.fisico5kg}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                className={style.inputsito}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif5kgFisico"
                                                value={diferencia.dif5kgFisico}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                                min={0}
                                            />
                                        </td>
                                        {
                                            activarComentario === "comFisico5kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comFisico5kg"
                                                        value={comentario.comFisico5kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comFisico5kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comFisico5kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>Vale fisico 11kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico11kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="fisico11kg"
                                                value={vales.fisico11kg}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                className={style.inputsito}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif11kgFisico"
                                                value={diferencia.dif11kgFisico < 0 ? diferencia.dif11kgFisico * -1 : diferencia.dif11kgFisico}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comFisico11kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comFisico11kg"
                                                        value={comentario.comFisico11kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comFisico11kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comFisico11kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>Vale fisico 15kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico15kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="fisico15kg"
                                                value={vales.fisico15kg}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                className={style.inputsito}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif15kgFisico"
                                                value={diferencia.dif15kgFisico}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comFisico15kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comFisico15kg"
                                                        value={comentario.comFisico15kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comFisico15kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comFisico15kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>Vale fisico 45kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.fisico45kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="fisico45kg"
                                                value={vales.fisico45kg}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                                className={style.inputsito}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif45kgFisico"
                                                value={diferencia.dif45kgFisico}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comFisico45kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comFisico45kg"
                                                        value={comentario.comFisico45kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comFisico45kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comFisico45kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        <p className={style.title3}>Vales digitales</p>
                        <div className={style.tableContainer2}>
                            <table className="table-sm table table-bordered table-hover responsive">
                                <thead>
                                    <tr>
                                        <th>Vales</th>
                                        <th>Cantidad pasiva</th>
                                        <th>Cantidad Real</th>
                                        <th>Diferencia</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Vale digital 5kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.digital5kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="digital5kg"
                                                value={vales.digital5kg}
                                                onChange={handleInputChange}
                                                className={style.inputsito}
                                                autoComplete="off"
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif5kgDigital"
                                                value={diferencia.dif5kgDigital}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comDigital5kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comDigital5kg"
                                                        value={comentario.comDigital5kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comDigital5kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comDigital5kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>Vale digital 11kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.digital11kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="digital11kg"
                                                value={vales.digital11kg}
                                                onChange={handleInputChange}
                                                className={style.inputsito}
                                                autoComplete="off"
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif11kgDigital"
                                                value={diferencia.dif11kgDigital}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comDigital11kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comDigital11kg"
                                                        value={comentario.comDigital11kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comDigital11kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comDigital11kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>Vale digital 15kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.digital15kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="digital15kg"
                                                value={vales.digital15kg}
                                                onChange={handleInputChange}
                                                className={style.inputsito}
                                                autoComplete="off"
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif15kgDigital"
                                                value={diferencia.dif15kgDigital}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comDigital15kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comDigital15kg"
                                                        value={comentario.comDigital15kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comDigital15kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comDigital15kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                    <tr>
                                        <td>Vale digital 45kg</td>
                                        <td>
                                            {
                                                inventarioVales.map((vale) => {
                                                    return <>{vale.digital45kg}</>
                                                })
                                            }
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="digital45kg"
                                                value={vales.digital45kg}
                                                onChange={handleInputChange}
                                                className={style.inputsito}
                                                autoComplete="off"
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                name="dif45kgDigital"
                                                value={diferencia.dif45kgDigital}
                                                onChange={handleInputChangeDiferencia}
                                                autoComplete="off"
                                                className={style.inputsito}
                                                disabled
                                            />
                                        </td>
                                        {
                                            activarComentario === "comDigital45kg" ? (
                                                <td>
                                                    <Input
                                                        type="textarea"
                                                        name="comDigital45kg"
                                                        value={comentario.comDigital45kg}
                                                        onChange={handleInputChangeComentario}
                                                        autoComplete="off"
                                                        className={style.inputsito2}
                                                    />
                                                </td>
                                            ) : (
                                                <td>
                                                    <button onClick={
                                                        () => {
                                                            setActivarComentario("comDigital45kg")
                                                        }
                                                    } className={style.botonsito}>
                                                        {
                                                            comentario.comDigital45kg === "" ? (
                                                                <IoChatbubbleEllipsesOutline className={style.icono2}/>
                                                            ) : (
                                                                <IoChatbubbleEllipses className={style.icono2}/>
                                                            )
                                                        }
                                                    </button>
                                                </td>
                                            )
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    </ModalBody>
                    <ModalFooter className={style.modalFooter}>
                        <Button color="primary" type='submit'>Guardar</Button>{' '}
                        <Button color="secondary" onClick={
                            () => {
                                toggle();
                                handleClean();
                                setActivarComentario("");
                            }
                        }>Cancelar</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default ContabilidadVales
