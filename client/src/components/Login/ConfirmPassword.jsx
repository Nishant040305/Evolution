import React from 'react'
import AuthService from '../../scripts/API.Login'
const ConfirmPassword = (props) => {
    const handleChange=(e)=>{
        props.setValue({
            ...props.value,
            [e.target.name]:e.target.value
        })
    }
    const API = new AuthService();

  return (
    <div className='bottom'>
        <div className={`container flex flex-col text-left px-16`}>
        <div className='text-white head-info '>New Password*</div>
       <input className='input-detail'name="PASSWORD" value={props.value.PASSWORD} onChange={(e)=>{handleChange(e)}}></input>
       </div>
       <div className=' flex flex-col text-left px-16'>
        <div className='text-white head-info'>Confirm Password*</div>
       <input className='input-detail' name="CPASSWORD" value={props.value.CPASSWORD} onChange={(e)=>{handleChange(e)}}></input>
       </div>
       <button className='enterdetail btn' onClick={()=>{
        API.confirmPasswordChange(props);
       }}>Confirm</button>
      </div>
  )
}

export default ConfirmPassword
