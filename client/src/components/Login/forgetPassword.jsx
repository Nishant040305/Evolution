import React from 'react'
import server from '../../server.json';
import axios from "axios"
const ForgetPassword = (props) => {
    let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;

    const handleChange=(e)=>{
        props.setValue(e.target.value);
    }
    const forgetPass=async()=>{
        try {
            const response = await axios.post(`${WEB}${server.Test.forget}`, {EMAIL:props.value}, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
            } else {
                props.Update(4);
                props.AUTH({
                    AUTHENTICATION:response.data.AUTH,
                    OTP:""
                }
                );
            }
        } catch (e) {
            console.error(e);
        }
        
    }

  return (
    <div className='bottom'>
    <div className={`container flex flex-col text-left px-16 py-5`}>
    <div className='text-white head-info '>Email*</div>
   <input className='input-detail'name="EMAIL" value={props.value} onChange={(e)=>{handleChange(e)}}></input>
   <button className='enterdetail btn' onClick={()=>{forgetPass()}}>Enter</button>
   </div>
   </div>
  )
}

export default ForgetPassword
