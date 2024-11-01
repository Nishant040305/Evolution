import React from 'react'
import axios from "axios";
import server from "../../server.json";

const ConfirmPassword = (props) => {
    let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;

    const handleChange=(e)=>{
        props.setValue({
            ...props.value,
            [e.target.name]:e.target.value
        })
    }
    const  ConfirmPass =async()=> {
        try {
            const response = await axios.post(`${WEB}${server.Auth.confirmPasswordChange}`, {...props.value}, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
            } else {
                
            }
        } catch (e) {
            console.error(e);
        }
        
    }

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
       <button className='enterdetail btn' onClick={()=>{ConfirmPass()}}>Confirm</button>
      </div>
  )
}

export default ConfirmPassword
