import React from 'react'
import '../style/LoginMain.css';
import logback from "../assets/logback.jpg";
import LoginBlock from '../components/Login/LoginBlock';
const LoginMain = ({setRegister}) => {
  return (
    <div className='login-page' style={{backgroundImage:`url(${logback})`}}>
        <LoginBlock setRegister={setRegister}></LoginBlock>
    </div>
  )
}

export default LoginMain
