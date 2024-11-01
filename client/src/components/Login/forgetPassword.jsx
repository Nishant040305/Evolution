import React from 'react'
import AuthService from '../../scripts/API.Login';
const ForgetPassword = (props) => {
    const handleChange=(e)=>{
        props.setValue(e.target.value);
    }
    const API = new AuthService();

  return (
    <div className='bottom'>
    <div className={`container flex flex-col text-left px-16`}>
    <div className='text-white head-info '>Email*</div>
   <input className='input-detail'name="EMAIL" value={props.value} onChange={(e)=>{handleChange(e)}}></input>
   <button className='enterdetail btn' onClick={()=>{API.forgotPassword(props)}}>Enter</button>
   </div>
   </div>
  )
}

export default ForgetPassword
