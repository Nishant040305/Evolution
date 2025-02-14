import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../scripts/API.Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../Store/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import { EmailVerifier } from '../../scripts/Validator';
const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API = new AuthService();
  const [msg, setMsg] = useState('');
  const mode = useSelector((state) => state.mode.mode);
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };
  const setRegister = (info) => {
    dispatch(loginSuccess(info));
  };
  const isEmailValid = EmailVerifier(props.value.EMAIL);
  return (
    <div className="bottom">
      <div className={` flex flex-col text-left px-2`}>
        <div className={`head-info ${mode ? 'dark-mode' : ''}`}>Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={props.value.EMAIL}
          onChange={handleChange}
        ></input>
        {!isEmailValid && props.value.EMAIL.trim().length > 0 && (
          <div className="text-red-500">Invalid Email</div>
        )}
      </div>
      <div className="flex flex-col px-2 text-left ">
        <div className={`head-info ${mode ? 'dark-mode' : ''}`}>Password*</div>
        <div className="relative">
          <input
            className="input-detail"
            type={showPassword ? 'text' : 'password'}
            name="PASSWORD"
            value={props.value.PASSWORD}
            onChange={handleChange}
          ></input>
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2 "
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <button
        className="enterdetail btn"
        onClick={() => {
          if (!isEmailValid && props.value.EMAIL.trim().length > 0) {
            setMsg('Invalid Email');
            return;
          }
          API.login({ ...props, setRegister: setRegister }, setMsg, navigate);
        }}
      >
        Login
      </button>
      {msg && (
        <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>
      )}
    </div>
  );
};

export default Login;
