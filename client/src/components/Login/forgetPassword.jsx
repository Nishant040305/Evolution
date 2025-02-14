import React, { useState } from 'react';
import AuthService from '../../scripts/API.Login';
import { useSelector } from 'react-redux';
const ForgetPassword = (props) => {
  const handleChange = (e) => {
    props.setValue(e.target.value);
  };
  const mode = useSelector((state) => state.mode.mode);
  const API = new AuthService();
  const [msg, setMsg] = useState('');
  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-2`}>
        <label className={`head-info ${mode ? 'dark-mode' : ''}`}>Email*</label>
        <input
          className="input-detail"
          name="EMAIL"
          value={props.value}
          onChange={handleChange}
        ></input>
        <button
          className="enterdetail btn"
          onClick={() => {
            API.forgotPassword({ ...props, setMsg: setMsg });
          }}
        >
          Enter
        </button>
        {msg && (
          <div className="mt-2 text-base text-center text-red-500 msg">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
