import React from "react";
import axios from "axios";
import server from "../../server.json";
import AuthService from "../../scripts/API.Login";
const Signup = (props) => {
  let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;

  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };
  const API = new AuthService();
  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-16`}>
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
          API.signup(props);
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
