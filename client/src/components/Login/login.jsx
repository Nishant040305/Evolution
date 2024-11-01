import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../scripts/API.Login';
const Login = (props) => {
    const navigate = useNavigate();
    const API = new AuthService();
    const [msg, setMsg] = useState('');
    const handleChange=(e)=>{
        props.setValue({
            ...props.value,
            [e.target.name]:e.target.value
        })
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
       <button className='enterdetail btn' onClick={()=>{API.login(props,setMsg,navigate)}}>Login</button>
       {msg && <div className='msg text-red-500 mt-2 text-2xl'>{msg}</div>}
      </div>
  )
}

export default Login
