import React,{useState} from 'react'
import axios from "axios";
import server from "../../server.json";

const Login = (props) => {
    let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;

    const [msg, setMsg] = useState('');

    const handleChange=(e)=>{
        props.setValue({
            ...props.value,
            [e.target.name]:e.target.value
        })
    }
    const  login =async()=> {
        try {
            const response = await axios.post(`${WEB}${server.Test.login}`, {...props.value}, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Invalid Credentials');
                setMsg("Invalid Credentials!!")

            } else {
               //Loged in User
               setMsg("You are Logged in!!")
            }
        } catch (e) {
            setMsg("Invalid Credentials!!")
            console.error(e);
        }
        
    }
  return (
    <div className='bottom'>
        <div className={` flex flex-col text-left px-16`}>
        <div className='text-white head-info '>Email*</div>
       <input className='input-detail'name="EMAIL" value={props.value.EMAIL} onChange={(e)=>{handleChange(e)}}></input>
       </div>
       <div className=' flex flex-col text-left px-16'>
        <div className='text-white head-info'>Password*</div>
       <input className='input-detail' name="PASSWORD" value={props.value.PASSWORD} onChange={(e)=>{handleChange(e)}}></input>
       </div>
       <button className='enterdetail btn' onClick={()=>{login()}}>Login</button>
       {msg && <div className='msg text-red-500 mt-2 text-2xl'>{msg}</div>}
      </div>
  )
}

export default Login
