import Swal from 'sweetalert2';
import { login, logout, setError } from './autenticacionSlice';
import axios from 'axios';


export const fetchLoginThunk = (email, password) => {
    return async (dispatch) => {
        try {
            const resp = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const body = await resp.json();
            if(body.ok) {
                localStorage.setItem('usuario', JSON.stringify(body));
                dispatch(login(body));
                //redirecciona a home
                window.location.href = '/home';
            } else {
                Swal.fire('Error', body.msg, 'error');
                dispatch(setError(body.msg));
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const logoutAction = (id) => async (dispatch) => {
    try {
        await axios.post(`/auth/logout`, {id});
        dispatch(logout());
        localStorage.removeItem('usuario');
        window.location.href = '/';
        return
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

export const logoutAction2 = (id) => async (dispatch) => {
    try {
        await axios.post(`/auth/logout`, {id});
        dispatch(logout());
        return
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.message}`,
        });
    }
};

