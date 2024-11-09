import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../scripts/API.Login";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Store/userSlice";
const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API = new AuthService();
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };
  const setRegister = (info) => {
    dispatch(loginSuccess(info));
  };
  return (
    <div className="bottom">
      <div className={` flex flex-col text-left px-16`}>
        <div className="text-white head-info ">Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={props.value.EMAIL}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
      </div>
      <div className="flex flex-col px-16 text-left ">
        <div className="text-white head-info">Password*</div>
        <input
          className="input-detail"
          name="PASSWORD"
          value={props.value.PASSWORD}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
      </div>
      <button
        className="enterdetail btn"
        onClick={() => {
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
