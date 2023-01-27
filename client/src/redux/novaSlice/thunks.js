import axios from 'axios';
import Swal from 'sweetalert2';
import { 
        getPersonal, 
        getOrdenes,
        getOrdenById, 
        getPersonalById, 
        getPatentes, 
        getCuadrantes,
        getChoferes,
        getAyudantes,
        ordenesDisponibles,
        Rendidas,
        clearOrdenById,
        getCuadratura,
        getOrdenesAyudanteById,
        getOrdenesChoferById,
        getOrdenesChofer,
        getOrdenesAyudante,
        getCodigoDeModificar,
        setPorAutorizar,
        setAutorizado,
        getPrecios,
        getAllFaltantes, 
        getAdministradores
    } from './novaSlice';

export const getAllOrdenes = (date) => async (dispatch) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/orden/date/${date}`);
        const data = await response.json();
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
        const response = await axios.get(`/personal`);
        dispatch(getPersonal(response.data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        });
    }
}

export const getPersonalId = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`/personal/${id}`);
        dispatch(getPersonalById(response.data));
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
        await axios.post(`/personal`, personal);
        Swal.fire({
            title: 'Personal creado',
            text: 'El personal se ha creado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/home">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
        
    }
}

export const bringOrdenByAdminId = (id, date) => async (dispatch) => {
    try {
        const response = await axios.get(`/orden/admin/${id}/${date}`, );
        dispatch(getOrdenes(response.data));
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            title: 'No hay ordenes en este dia',
            showConfirmButton: true,
        });
    }
}


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

export const createOrden = async (orden) => {
    try {
        await axios.post(`/orden`, orden);
        Swal.fire({
            title: 'Orden creada',
            text: 'La orden se ha creado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/guide">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
        
    };
};

export const updateOrdenQuantity = async (id, quantity) => {
    try {
        await axios.put(`/orden/${id}`, quantity);
        Swal.fire({
            title: 'Orden actualizada',
            text: 'La orden se ha actualizado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/guide">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const modifyRecargaOrdenQuantity = async (idOrden, idRecarga , quantity) => {
    try {
        await axios.put(`/orden/changeRecharge/${idOrden}/${idRecarga}`, quantity);
        Swal.fire({
            title: 'Orden actualizada',
            text: 'La orden se ha actualizado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/rendicion">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};

export const finalizeOrden = async (id, quantity) => {
    try {
        await axios.put(`/orden/finalize/${id}`, quantity);
        Swal.fire({
            title: 'Orden finalizada',
            text: 'La orden se ha finalizado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/guide">OK</a>'
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
        await axios.put(`/orden/cuadrar/${id}`, quantity);
        Swal.fire({
            title: 'Orden cuadrada',
            text: 'La orden se ha cuadrado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/rendicion">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
};


export const bringPatentes = () => async (dispatch) => {
    try {
        const response = await axios.get(`/patente`);
        dispatch(getPatentes(response.data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringCuadrantes = () => async (dispatch) => {
    try {
        const response = await axios.get(`/cuadrante`);
        dispatch(getCuadrantes(response.data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const bringChoferes = () => async (dispatch) => {
    try {
        const response = await axios.get(`/chofer/names`);
        dispatch(getChoferes(response.data));
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
        const response = await axios.get(`/ayudante/names`);
        dispatch(getAyudantes(response.data));
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

export const ordenesRendicion = () => async (dispatch) => {
    try {
        dispatch(Rendidas());
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

export const updateAbono = async (id, abono) => {
    try {
        await axios.put(`/metodoPago/${id}`, abono);
        Swal.fire({
            title: 'Abono actualizado',
            text: 'El abono se ha actualizado correctamente',
            icon: 'success',
            showConfirmButton: false,
            footer: '<a class="btn btn-primary" href="/guide">OK</a>'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: `${error.message}`,
            text: 'Something went wrong!',
        });
    };
}

export const bringCuadratura = (date1, date2) => async (dispatch) => {
    try {
        const response = await axios.get(`/metodoPago/${date1}/${date2}`);
        dispatch(getCuadratura(response.data));
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
}

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
        const response = await axios.get(`/orden/chofer/${id}/${fechaInicio}/${fechaFin}`);
        dispatch(getOrdenesChoferById(response.data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringOrdenesAyudanteById = (id, fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await axios.get(`/orden/ayudante/${id}/${fechaInicio}/${fechaFin}`);
        dispatch(getOrdenesAyudanteById(response.data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringOrdenesChofer = (fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await axios.get(`/personal/chofer/faltantes/${fechaInicio}/${fechaFin}`);
        dispatch(getOrdenesChofer(response.data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringOrdenesAyudante = (fechaInicio, fechaFin) => async (dispatch) => {
    try {
        const response = await axios.get(`/personal/ayudante/faltantes/${fechaInicio}/${fechaFin}`);
        dispatch(getOrdenesAyudante(response.data));
    } catch (error) {
        console.error(error.message);
    }
};

export const bringCodigoParaModificar = (info) => async (dispatch) => {
    try {
        const response = await axios.post(`/orden/sendEmail`, info);
        dispatch(getCodigoDeModificar(response.data));
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

export const bringPrecios = () => async (dispatch) => {
    try {
        const response = await axios.get(`/precios`);
        dispatch(getPrecios(response.data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringAllFaltantes = (fechaInicio, fechaFin, administradorId) => async (dispatch) => {
    try {
        const response = await axios.get(`/personal/faltantes/${administradorId}/${fechaInicio}/${fechaFin}`);
        dispatch(getAllFaltantes(response.data));
    } catch (error) {
        console.error(error.message);
    }
}

export const bringAllAdministradores = () => async (dispatch) => {
    try {
        const response = await axios.get(`/admin`);
        dispatch(getAdministradores(response.data));
    } catch (error) {
        console.error(error.message);
    }
}

