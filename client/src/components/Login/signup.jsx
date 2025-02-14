import { useState } from 'react';
import AuthService from '../../scripts/API.Login';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';
import { EmailVerifier, PasswordVerifier } from '../../scripts/Validator';
const Signup = (props) => {
  let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };
  const mode = useSelector((state) => state.mode.mode);
  const API = new AuthService();
  const isEmailValid = EmailVerifier(props.value.EMAIL);
  const isPasswordValid = PasswordVerifier(props.value.PASSWORD);

  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-2`}>
        <div className={`head-info ${mode ? 'dark-mode' : ''}`}>Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={props.value.EMAIL}
          onChange={handleChange}
        ></input>
        {!isEmailValid && props.value.EMAIL.trim().length != 0 && (
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
        {!isPasswordValid && props.value.PASSWORD.trim().length != 0 && (
          <div className="text-red-500">
            Password must be at least 8 characters long, include an uppercase
            letter, a number, and a special character.
          </div>
        )}
      </div>
      <button
        className="enterdetail btn"
        onClick={() => {
          if (!isEmailValid && props.value.EMAIL.trim().length > 0) {
            setMsg('Invalid Email');
            return;
          }
          if (!isPasswordValid) {
            setMsg('Weak Password');
            return;
          }
          API.signup(props);
        }}
      >
        Signup
      </button>
      {msg && (
        <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>
      )}
    </div>
  );
};

export default Signup;
