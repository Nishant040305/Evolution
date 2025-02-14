import { useState } from 'react';
import AuthService from '../../scripts/API.Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../Store/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import { PasswordVerifier } from '../../scripts/Validator';

const ConfirmPassword = (props) => {
  const dispatch = useDispatch();
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [msg, setMsg] = useState();

  const API = new AuthService();
  const setRegister = (info) => {
    dispatch(loginSuccess(info));
  };

  const mode = useSelector((state) => state.mode.mode);

  const password = props.value.PASSWORD;
  const confirmPassword = props.value.CPASSWORD;

  // Check if passwords match and are strong
  const isPasswordValid = PasswordVerifier(password);
  const isPasswordsMatch = password === confirmPassword;

  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-2`}>
        <label className={`head-info ${mode ? 'dark-mode' : ''}`}>
          New Password*
        </label>
        <div className="relative">
          <input
            className={`input-detail ${
              !PasswordVerifier(password) ? 'border-red-500' : ''
            }`}
            type={showPasswordNew ? 'text' : 'password'}
            name="PASSWORD"
            value={password}
            onChange={(e) => {
              props.setValue({
                ...props.value,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2 "
            onClick={() => setShowPasswordNew((prev) => !prev)}
          >
            {showPasswordNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {!isPasswordValid && props.value.PASSWORD.trim().length > 0 && (
          <div className="msg text-red-500 mt-1 text-sm">
            Password must be at least 8 characters long, include an uppercase
            letter, a number, and a special character.
          </div>
        )}
      </div>

      <div className="flex flex-col text-left px-2">
        <label className={`head-info ${mode ? 'dark-mode' : ''}`}>
          Confirm Password*
        </label>
        <div className="relative">
          <input
            className={`input-detail ${
              !isPasswordsMatch ? 'border-red-500' : ''
            }`}
            type={showPasswordConfirm ? 'text' : 'password'}
            name="CPASSWORD"
            value={confirmPassword}
            onChange={(e) => {
              props.setValue({
                ...props.value,
                [e.target.name]: e.target.value,
              });
            }}
          />
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2 "
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
          >
            {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {!isPasswordsMatch && props.value.CPASSWORD.trim().length > 0 && (
          <div className="msg text-red-500 mt-1 text-sm">
            Passwords do not match.
          </div>
        )}
      </div>

      <button
        className="enterdetail btn"
        onClick={() => {
          if (PasswordVerifier(password)) {
            if (isPasswordsMatch) {
              API.confirmPasswordChange({ ...props, setRegister: setRegister });
            } else {
              setMsg('Passwords do not match');
            }
          } else {
            setMsg('Password is not strong enough');
          }
        }}
      >
        Confirm
      </button>

      {msg && (
        <div className="msg text-red-500 mt-2 text-base text-center">{msg}</div>
      )}
    </div>
  );
};

export default ConfirmPassword;
