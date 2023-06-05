import React from 'react'
import style from './login.module.css'
import wave from '../../../../assetsOficial/imgLogin/wave.svg'
import avatar from '../../../../assetsOficial/imgLogin/avatar.svg'
import bg from '../../../../assetsOficial/imgLogin/bg.svg'

const Login = () => {
  return (
    <div className={style.container}>
        <img className={style.wave} src={wave}/>
        
        {/* <div className={style.img}>
            <img src={bg}/>
        </div>
        <div className={style.loginContent}>
            <form >
                <img src={avatar}/>
                <h2 className={style.title}>Welcome</h2>
                <div className={style.inputDivOne}>
                <div className={style.i}>
                        <i className="fas fa-user"></i>
                </div>
                <div className={style.div}>
                        <h5>Username</h5>
                        <input type="text" class={style.input}/>
                </div>
                </div>
                <div className={style.inputDivPass}>
                <div className={style.i}> 
                        <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                        <h5>Password</h5>
                        <input type="password" className="input"/>
                </div>
                </div>
                <a href="#">Forgot Password?</a>
                <input type="submit" className="btn" value="Login"/>
            </form>
        </div> */}
    </div>
  )
}

export default Login
