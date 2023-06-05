import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./loginNova.css";
import Monito from "../../../assets/JORGITO.svg";
import Nova from "../../../assets/logoFinalNova.svg";
import { fetchLoginThunk } from "../../../redux/autenticacionSlice/thunks";
import CierreDeSesion from "./CierreDeSesion/CierreDeSesion";

const LoginPage = () => {
  const width = window.innerWidth;
  const { status } = useSelector((state) => state.Autenticacion.autBack);
  const { error } = useSelector((state) => state.Autenticacion.autBack);
  const channel = new BroadcastChannel("auth");
  localStorage.setItem("channel", JSON.stringify(channel));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchLoginThunk(email, password));
    setEmail("");
    setPassword("");
    e.target.reset();
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const isDisabled = useMemo(() => status === "checking", [status]);

  return (
    <>
      <div className="containerMaster"></div>
      <div>
        <img className="nova" src={Nova} alt="Nova" />
      </div>
      <div className="input-container">
        <form onSubmit={handleLogin} id="formulario">
          <img className="monito" src={Monito} alt="Monito" />
          <h1 className="texto-1">Iniciar sesión</h1>
          <div className="div">
            <p className="email">Email</p>
            {!email && <i className="iconoMail fa-regular fa-envelope"></i>}
            <input className="cajita-1" type="text" onChange={handleEmail} />
          </div>
          <div className="div">
            <p className="contraseña">Contraseña</p>
            {!password && <i class="iconoContraseña fa-solid fa-lock"></i>}
            <input
              className="cajita-2"
              type="password"
              onChange={handlePassword}
            />
          </div>
          {error && <p className="error-texto">{error}</p>}
          <button className="boton-1" type="submit" disabled={isDisabled}>
            Entrar
          </button>
        </form>
        <CierreDeSesion className={"texto-auxiliar"} />
      </div>
    </>
  );
};

export default LoginPage;
