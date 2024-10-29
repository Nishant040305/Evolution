import React from 'react'
import axios from "axios";
import server from "../../server.json";
const Signup = (props) => {
    let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;

    const handleChange=(e)=>{
        props.setValue({
            ...props.value,
            [e.target.name]:e.target.value
        })
    }
    const  Signup =async()=> {
        try {
            const response = await axios.post(`${WEB}${server.Test.signup}`, {...props.value}, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
            } else {
                props.Update(2);
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
        <div className={`container flex flex-col text-left px-16`}>
        <div className='text-white head-info '>Email*</div>
       <input className='input-detail'name="EMAIL" value={props.value.EMAIL} onChange={(e)=>{handleChange(e)}}></input>
       </div>
       <div className=' flex flex-col text-left px-16 '>
        <div className='text-white head-info'>Password*</div>
       <input className='input-detail' name="PASSWORD" value={props.value.PASSWORD} onChange={(e)=>{handleChange(e)}}></input>
       </div>
       <button className='enterdetail btn' onClick={()=>{Signup()}}>Signup</button>
      </div>
  )
}

export default Signup
