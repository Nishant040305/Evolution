import React,{useState} from 'react'
import AuthService from '../../scripts/API.Login'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../Store/userSlice'
const ConfirmPassword = (props) => {
    const dispatch = useDispatch();
    const handleChange=(e)=>{
        props.setValue({
            ...props.value,
            [e.target.name]:e.target.value
        })
    }
    const [msg,setMsg] = useState();
    const API = new AuthService();
    const setRegister = (info)=>{
        dispatch(loginSuccess(info));
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
       <button className='enterdetail btn' onClick={()=>{
        if(props.value.PASSWORD==props.value.CPASSWORD){
            API.confirmPasswordChange({...props,setRegister:setRegister});
        }else{
            setMsg("Incorrect Password Match");
        }
       }}>Confirm</button>
        {msg && <div className='msg text-red-500 mt-2 text-base text-center'>{msg}</div>}

      </div>
  )
}

export default ConfirmPassword
