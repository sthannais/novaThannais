import React from "react";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginThunk } from "../../../../redux/autenticacionSlice/thunks";
import style from "./login.module.css";
import wave from "../../../../assetsOficial/imgLogin/wave.svg";
import nova from "../../../../assetsOficial/imgLogin/nova.svg";
import jorgito from "../../../../assetsOficial/imgLogin/Jorgito.svg";
import Particles from "./Particles/Particles.jsx";
import CierreDeSesion from "../CierreDeSesion/CierreDeSesion.jsx";


const Login = () => {

    const width = window.innerWidth;
    
    const { status } = useSelector((state) => state.Autenticacion.autBack);
    const { error } = useSelector((state) => state.Autenticacion.autBack);
    const channel = new BroadcastChannel('auth');
    localStorage.setItem('channel', JSON.stringify(channel));

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(fetchLoginThunk(email, password))
        setEmail('')
        setPassword('')
        e.target.reset()
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const isDisabled = useMemo(() => status === 'checking', [status])

  return (
    <div className={style.container}>
      <div id="waveContainer">
        <img className={style.wave} src={wave} alt="wave" />
        <img className={style.nova} src={nova} alt="nova" />
      </div>

      <Particles />
      <img className={style.jorgito} src={jorgito} alt="jorgito" />
      <p className={style.title}>Inicio de sesión</p>
      <form className={style.formInput} onSubmit={handleLogin} id='formulario'>
        <div className={style.inputDiv}>
          <div className={style.i}>
            <i class="fas fa-user"></i>
          </div>
          <input
            id="Usuario"
            type="text"
            className={style.input}
            placeholder="Email"
            required
            onChange={handleEmail}
          />
        </div>
        <div className={style.inputDiv}>
          <div className={style.i2}> 
            <i class="fas fa-lock"></i>
          </div>
          <input
            id="Contraseña"
            type="password"
            className={style.input}
            placeholder="Contraseña"
            required
            onChange={handlePassword}
          />
        </div>
        {error && <p className={style.errorTexto}>{error}</p>}
        <button className={style.enter} type="submit" disabled={isDisabled}>
            Entrar
        </button>
      </form>
      <CierreDeSesion className={style.cierreSesion}/>
      <div className={style.inputContainer}>          
      </div>
    </div>
  );
};

export default Login;
