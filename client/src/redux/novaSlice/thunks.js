import axios from 'axios';
import Swal from 'sweetalert2';
import { 
        getPersonal, 
        getOrdenes,
        getOrdenById, 
        getPersonalById, 
        getPatentes, 
        getAllPatentes,
        getCuadrantes,
        getChoferes,
        getAyudantes,
        ordenesDisponibles,
        Rendidas,
        RendidasDisponibles,
        clearOrdenById,
        getCuadratura,
        getOrdenesAyudanteById,
        getOrdenesChoferById,
        getOrdenesChofer,
        getOrdenesAyudante,
        getCodigoDeModificar,
        limpiarCodigo,
        setPorAutorizar,
        setAutorizado,
        setNoAutorizado,
        getListaDePrecios,
        getAllFaltantes, 
        getAdministradores,
        getTodosLosPrecios,
        changeLoading,
        getAllCuadrantes,
        getInventarioVales,
        getRegistroCambiosVales,
        getValesPorFecha,
        getUltimosVales,
        getRegistroDescargaVales,
        getValesDigitalesRegalados,
        getOrdenesByPersonalAndDate,
        getPreInventarioValesDigitales,
        getPreInventarioValesFisicos,
        getPreInventarioValesRegalados,
        getChoferesYAyudantes
    } from './novaSlice';

export const getAllOrdenes = (date) => async (dispatch) => {

    const { token } = JSON.parse(localStorage.getItem('usuario'));

    try {
        const response = await fetch(`${process.env.REACT_APP_API}/orden/date/${date}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        const data = await response.json();
        if(data.msg === 'usuario no esta online'){
            localStorage.removeItem('usuario');
            localStorage.removeItem('channel');
            window.location.href = '/';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.msg}`,
            });
            return
        }
        dispatch(getOrdenes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const getPersonals = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/personal`);
        const data = await response.json();
        dispatch(getPersonal(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
}

export const getPersonalId = (idPersonal) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/personal/${idPersonal}`);
        const data = await response.json();
        dispatch(getPersonalById(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
}

export const createPersonal = async (personal) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/personal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personal)
        });
        Swal.fire({
            title: 'Personal creado',
            text: 'El personal se ha creado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href=/listaDePersonal>OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    }
};

export const bringOrdenById = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/orden/${id}`);
        const data = await response.json();
        dispatch(getOrdenById(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const createOrden = (orden) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orden)
        });
        dispatch(getAllOrdenes(orden.fecha))
        dispatch(bringPatentes());
        dispatch(bringCuadrantesActive());
        dispatch(bringChoferes());
        dispatch(bringAyudantes());
        dispatch(bringListaDePreciosActive());
        dispatch(switchLoading());
        Swal.fire({
            title: 'Orden creada',
            text: 'La orden se ha creado correctamente',
            icon: 'success',
            showConfirmButton: true,
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    }
};

export const updateOrdenQuantity =  (id, quantity, fecha) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        });
        dispatch(getAllOrdenes(fecha));
        Swal.fire({
            title: 'Orden actualizada',
            text: 'La orden se ha actualizado correctamente',
            icon: 'success',
            showConfirmButton: true,
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const modifyRecargaOrdenQuantity =  (idOrden, idRecarga, quantity, fecha) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden/changeRecharge/${idOrden}/${idRecarga}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        });
        Swal.fire({
            title: 'Orden actualizada',
            text: 'La orden se ha actualizado correctamente',
            icon: 'success'
        });
        dispatch(getAllOrdenes(fecha));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const modifyRecargaOrdenQuantity2 =  (idOrden, idRecarga, quantity, ordenId) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden/changeRecharge/${idOrden}/${idRecarga}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        });
        Swal.fire({
            title: 'Orden actualizada',
            text: 'La orden se ha actualizado correctamente',
            icon: 'success'
        });
        dispatch(bringOrdenById(ordenId));
        dispatch(limpiarCodigo());
        dispatch(setNoAutorizado());
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const modifyLlenos = (ordenId, quantity) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden/changeLlenos/${ordenId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        });
        Swal.fire({
            title: 'Orden actualizada',
            text: 'La orden se ha actualizado correctamente',
            icon: 'success'
        });
        dispatch(bringOrdenById(ordenId))
        dispatch(limpiarCodigo());
        dispatch(setNoAutorizado());
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const desactiveRecarga = (idOrden, idRecarga, fecha) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden/desactiveRecarga/${idOrden}/${idRecarga}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        Swal.fire({
            title: 'Recarga desactivada',
            text: 'La recarga se ha desactivado correctamente',
            icon: 'success'
        });
        dispatch(getAllOrdenes(fecha));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const finalizeOrden = (id, quantity, fecha) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/orden/finalize/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        });
        dispatch(getAllOrdenes(fecha));
        dispatch(bringPatentes());
        dispatch(bringChoferes());
        dispatch(bringAyudantes());
        dispatch(switchLoading());
        Swal.fire({
            title: 'Orden finalizada',
            text: 'La orden se ha finalizado correctamente.',
            icon: 'success',
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const cuadrarOrden = async (id, quantity) => {

    try {
        await fetch(`${process.env.REACT_APP_API}/orden/cuadrar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        })
        Swal.fire({
            title: 'Orden cuadrada',
            text: 'La orden se ha cuadrado correctamente',
            icon: 'success',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/rendicionVentas">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const cuadrarOrdenAuxiliar = async (id, quantity) => {

    try {
        await fetch(`${process.env.REACT_APP_API}/orden/cuadrarAux/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantity)
        })
        Swal.fire({
            title: 'Orden cuadrada',
            text: 'La orden se ha cuadrado correctamente',
            icon: 'success',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/rendicionVentas">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const bringAllPatentes = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/patente/all`);
        const data = await response.json();
        dispatch(getAllPatentes(data));

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringPatentes = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/patente`);
        const data = await response.json();
        dispatch(getPatentes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const activePatente = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/patente/habilitar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringPatentes());
        dispatch(bringAllPatentes());
        Swal.fire({
            icon: 'success',
            title: 'Patente activada',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
};

export const desactivePatente = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/patente/deshabilitar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringPatentes());
        dispatch(bringAllPatentes());
        Swal.fire({
            icon: 'success',
            title: 'Patente desactivada',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
};

export const createPatente = (name) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/patente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });
        dispatch(bringPatentes());
        Swal.fire({
            icon: 'success',
            title: 'Patente creada',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const bringCuadrantesActive = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/cuadrante/active`);
        const data = await response.json();
        dispatch(getCuadrantes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringAllCuadrantes = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/cuadrante`);
        const data = await response.json();
        dispatch(getAllCuadrantes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const createCuadrante = (name) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/cuadrante`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        });
        dispatch(bringAllCuadrantes());
        Swal.fire({
            title: 'Cuadrante creado',
            text: 'El cuadrante se ha creado correctamente',
            icon: 'success',
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    }
};

export const activeCuadrante = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/cuadrante/active/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringAllCuadrantes());
        dispatch(bringCuadrantesActive());  
        Swal.fire({
            title: 'Cuadrante activado',
            text: 'El cuadrante se ha activado correctamente',
            icon: 'success',
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    }
};

export const desactiveCuadrante = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/cuadrante/desactive/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringAllCuadrantes());
        dispatch(bringCuadrantesActive());
        Swal.fire({
            title: 'Cuadrante desactivado',
            text: 'El cuadrante se ha desactivado correctamente',
            icon: 'success',
        });
    }
    catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    }
};

export const bringChoferes = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/chofer/names`);
        const data = await response.json();
        dispatch(getChoferes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringAyudantes = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/ayudante/names`);
        const data = await response.json();
        dispatch(getAyudantes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringChoferesYAyudantes = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/personal/choferes/ayudantes`);
        const data = await response.json();
        dispatch(getChoferesYAyudantes(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};


export const ordenesActivas = () => async (dispatch) => {
    try {
        dispatch(ordenesDisponibles());
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const ordenesRendicion = (date) => async (dispatch) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('usuario'));

        const response = await fetch(`${process.env.REACT_APP_API}/orden/date/estado/${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        });
        const data = await response.json();
        if(data.msg === 'usuario no esta online'){
            localStorage.removeItem('usuario');
            localStorage.removeItem('channel');
            window.location.href = '/';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.msg}`,
            });
            return
        }
        dispatch(Rendidas(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const ordenesRendicionBetween = (date1, date2) => async (dispatch) => {
    try {
        //fetch
        const response = await fetch(`${process.env.REACT_APP_API}/orden/date/estado/${date1}/${date2}`);
        const data = await response.json();
        dispatch(RendidasDisponibles(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};



export const cleanOrden = () => async (dispatch) => {
    try {
        dispatch(clearOrdenById());
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const updateAbono = (id, abono, fecha) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/metodoPago/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(abono)
        });
        dispatch(getAllOrdenes(fecha));
        Swal.fire({
            title: 'Abono actualizado',
            text: 'El abono se ha actualizado correctamente',
            icon: 'success',
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const bringCuadratura = (date1, date2) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/metodoPago/${date1}/${date2}`);
        const data = await response.json();
        dispatch(getCuadratura(data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringCuadratura2 = (fechaInicio, fechaFin, administradorId) => async (dispatch) => {
    try {
        const response = await axios.get(`/metodoPago/administrador/${administradorId}/${fechaInicio}/${fechaFin}`);
        dispatch(getCuadratura(response.data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
}

export const bringOrdenesChoferById = (id, fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/orden/chofer/${id}/${fechaInicio}/${fechaFin}`);
        const data = await response.json();
        dispatch(getOrdenesChoferById(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringOrdenesAyudanteById = (id, fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/orden/ayudante/${id}/${fechaInicio}/${fechaFin}`);
        const data = await response.json();
        dispatch(getOrdenesAyudanteById(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringOrdenesChofer = (fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/personal/chofer/faltantes/${fechaInicio}/${fechaFin}`);
        const data = await response.json();
        dispatch(getOrdenesChofer(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringOrdenesAyudante = (fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/personal/ayudante/faltantes/${fechaInicio}/${fechaFin}`);
        const data = await response.json();
        dispatch(getOrdenesAyudante(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringCodigoParaModificar = (info) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/orden/sendEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        const data = await response.json();
        dispatch(getCodigoDeModificar(data));
        dispatch(setPorAutorizar());
    } catch (error) {
        console.log(error.message);
    };
}

export const setAutorizacion = () => async (dispatch) => {
    try {
        dispatch(setAutorizado());
    } catch (error) {
        console.log(error.message);
    };
}

export const setNoAutorizacion = () => async (dispatch) => {
    try {
        dispatch(setNoAutorizado());
    } catch (error) {
        console.log(error.message);
    };
};

export const limpiarCodigos = () => async (dispatch) => {
    try {
        dispatch(limpiarCodigo());
    } catch (error) {
        console.log(error.message);
    };
};

export const bringListaDePreciosActive = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/listaDePrecios/active`);
        const data = await response.json();
        dispatch(getListaDePrecios(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringAllFaltantes = (fechaInicio, fechaFin, administradorId) => async (dispatch) => {

    const { token } = JSON.parse(localStorage.getItem('usuario'));

    try {
        const response = await fetch(`${process.env.REACT_APP_API}/personal/faltantes/${administradorId}/${fechaInicio}/${fechaFin}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        const data = await response.json();
        if(data.msg === 'usuario no esta online'){
            localStorage.removeItem('usuario');
            localStorage.removeItem('channel');
            window.location.href = '/';
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${data.msg}`,
            });
            return
        }
        dispatch(getAllFaltantes(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringAllAdministradores = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/admin`);
        const data = await response.json();
        dispatch(getAdministradores(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringAllListaDePrecios = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/listaDePrecios`);
        const data = await response.json();
        dispatch(getTodosLosPrecios(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const activeListaDePrecios = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/listaDePrecios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringListaDePreciosActive());
        dispatch(bringAllListaDePrecios());
        Swal.fire({
            icon: 'success',
            title: 'Lista de precios activada',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const createListaDePrecios = (nuevaLista) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/listaDePrecios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaLista)
        });
        dispatch(bringAllListaDePrecios());
        Swal.fire({
            icon: 'success',
            title: 'Lista de precios creada',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const switchLoading = () => async (dispatch) => {
    try {
        dispatch(changeLoading());
    } catch (error) {
        console.error(error.message);
    }
}

export const changeChofer = (idOrden, idChofer, fecha, guideValidator) => async (dispatch) => {

    try {
        await fetch(`${process.env.REACT_APP_API}/orden/cambiarChoferOPeonetaDeOrden/${idOrden}/${idChofer}`, {
            method: 'PUT',
            body: JSON.stringify({ guideValidator }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringOrdenById(idOrden));
        dispatch(ordenesRendicion(fecha));
        if (guideValidator) {
            dispatch(getAllOrdenes(fecha));
            dispatch(bringChoferes());
            dispatch(bringAyudantes());
        }
        Swal.fire({
            icon: 'success',
            title: 'Chofer cambiado',
            showConfirmButton: false,
            timer: 1500
        });
    }
    catch (error) {
        console.error(error.message);
    }
};

export const changePeoneta = (idOrden, idPeoneta, fecha, guideValidator) => async (dispatch) => {

    try {
        await fetch(`${process.env.REACT_APP_API}/orden/cambiarAyudanteOPeonetaDeOrden/${idOrden}/${idPeoneta}`, {
            method: 'PUT',
            body: JSON.stringify({ guideValidator }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        dispatch(bringOrdenById(idOrden));
        dispatch(ordenesRendicion(fecha));
        if (guideValidator) {
            dispatch(getAllOrdenes(fecha));
            dispatch(bringChoferes());
            dispatch(bringAyudantes());
        }
        Swal.fire({
            icon: 'success',
            title: 'Peoneta cambiada',
            showConfirmButton: false,
            timer: 1500
        });
    }
    catch (error) {
        console.error(error.message);
    }
};

export const modifyPersonal = (id, personal) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/personal/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personal)
        });
        dispatch(getPersonals());
        Swal.fire({
            icon: 'success',
            title: 'Personal modificado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

// Inventario Vales //

export const brinInventarioVales = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/inventarioVales`);
        const data = await response.json();
        dispatch(getInventarioVales(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const contabilidadVales = (contabilidad) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/inventarioVales/modificar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contabilidad)
        });
        dispatch(brinInventarioVales());
        Swal.fire({
            icon: 'success',
            title: 'Contabilidad de vales',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const getAllRegistroCambioVales = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/inventarioVales/registroVales`);
        const data = await response.json();
        dispatch(getRegistroCambiosVales(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringValesPorFecha = (fecha) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/metodoPago/ultimosVales/${fecha}`);
        const data = await response.json();
        dispatch(getValesPorFecha(data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringUltimosVales = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/metodoPago/ultimosValesDeAyer`);
        const data = await response.json();
        dispatch(getUltimosVales(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringRegistroDeDescargaVales = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/inventarioVales/registro`);
        const data = await response.json();
        dispatch(getRegistroDescargaVales(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const descargarVales = (descarga) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/inventarioVales/descargar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(descarga)
        });
        dispatch(brinInventarioVales());
        dispatch(bringRegistroDeDescargaVales());
        Swal.fire({
            icon: 'success',
            title: 'Vales descargados',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const bringValesDigitalesRegalados = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/inventarioValesRegalados`);
        const data = await response.json();
        dispatch(getValesDigitalesRegalados(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const editarValesDigitalesRegalados = (vales) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/inventarioValesRegalados`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vales)
        });
        dispatch(bringValesDigitalesRegalados());
        Swal.fire({
            icon: 'success',
            title: 'Vales digitales regalados',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const descargarExcelOrdenesPorFecha = async (date1, date2) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/metodoPago/ordenesEstructuradas/${date1}/${date2}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `Ordenes-${date1}-${date2 ? date2 : ""}.xlsx`;
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error.message);
    }
}

export const descargarExcelVentaDeTarros = async (date1, date2) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/metodoPago/tarrosChoferesYPeonetas/${date1}/${date2}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `Venta-Tarros-${date1}-${date2 ? date2 : ""}.xlsx`;
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error.message);
    }
}


export const bringOrdenesByPersonalAndDate = (choferId, ayudanteId, date1, date2) => async (dispatch) => {
    try {
        
        //fetch
        const response = await fetch(`${process.env.REACT_APP_API}/orden/personal/${choferId}/${ayudanteId}/${date1}/${date2}`);
        const data = await response.json();
        dispatch(getOrdenesByPersonalAndDate(data));
        /*if (data.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Sin ordenes',
                text: 'Este empleado no tiene ordenes en esas fechas',
            });
        }*/
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringPreInventarioValesFisicos = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/preInventarioVales/pre-inventario-vales-fisicos`);
        const data = await response.json();
        dispatch(getPreInventarioValesFisicos(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringPreInventarioValesDigitales = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/preInventarioVales/pre-inventario-vales-digitales`);
        const data = await response.json();
        dispatch(getPreInventarioValesDigitales(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringPreInventarioValesDigitalesRegalados = () => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/preInventarioVales/pre-inventario-vales-regalados`);
        const data = await response.json();
        dispatch(getPreInventarioValesRegalados(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const finalizarPreInventarioFisico = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/finalizar-pre-inventario-vales-fisicos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(bringPreInventarioValesFisicos());
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario finalizado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const finalizarPreInventarioDigitales = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/finalizar-pre-inventario-vales-digitales/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(bringPreInventarioValesDigitales());
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario finalizado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const finalizarPreInventarioDigitalesRegalados = (id) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/finalizar-pre-inventario-vales-regalados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(bringPreInventarioValesDigitalesRegalados());
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario finalizado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const modifyPreInventarioValesFisicos = (id, cantidad) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/modificar-pre-inventario-vales-fisicos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cantidad)
        });
        dispatch(bringPreInventarioValesFisicos());
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario modificado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const modifyPreInventarioValesDigitales = (id, cantidad) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/modificar-pre-inventario-vales-digitales/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cantidad)
        });
        dispatch(bringPreInventarioValesDigitales());
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario modificado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const modifyPreInventarioValesDigitalesRegalados = (id, cantidad) => async (dispatch) => {
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/modificar-pre-inventario-vales-regalados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cantidad)
        });
        dispatch(bringPreInventarioValesDigitalesRegalados());
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario modificado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const aceptarPreInventarioValesFisicos = (id, idResponsable) => async (dispatch) => {

    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/aceptar-pre-inventario-vales-fisicos/${id}/${idResponsable}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(bringPreInventarioValesFisicos());
        dispatch(brinInventarioVales());
        dispatch(bringValesDigitalesRegalados())
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario aceptado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const aceptarPreInventarioValesDigitales = (id, idResponsable) => async (dispatch) => {
    
    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/aceptar-pre-inventario-vales-digitales/${id}/${idResponsable}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(bringPreInventarioValesDigitales());
        dispatch(brinInventarioVales());
        dispatch(bringValesDigitalesRegalados())
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario aceptado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}

export const aceptarPreInventarioValesDigitalesRegalados = (id, idResponsable) => async (dispatch) => {

    try {
        await fetch(`${process.env.REACT_APP_API}/preInventarioVales/aceptar-pre-inventario-vales-regalados/${id}/${idResponsable}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch(bringPreInventarioValesDigitalesRegalados());
        dispatch(brinInventarioVales());
        dispatch(bringValesDigitalesRegalados())
        Swal.fire({
            icon: 'success',
            title: 'Pre inventario aceptado',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.error(error.message);
    }
}







