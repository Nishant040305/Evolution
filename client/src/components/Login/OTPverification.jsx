import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../scripts/API.Login';
import { useSelector } from 'react-redux';
const OTPVerification = (props) => {
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [msg, setMsg] = useState('');
  const [isResendVisible, setIsResendVisible] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };
  const mode = useSelector(state=>state.mode.mode);
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      setIsResendVisible(false);
      return () => clearInterval(countdown);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const API = new AuthService();
  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-2`}>
      <div className={`head-info ${mode ? "dark-mode" : ""}`}>OTP</div>
      {isResendVisible ? (
          <></>
        ) : (
          <span className={`timer ${mode ? "text-white" : "text-gray-800"}`}>
                  Resend in {formatTime()}</span>
        )}
        <input
          className="input-detail"
          name="OTP"
          value={props.value.OTP}
          placeholder="6-digit Code"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <div className="flex flex-row">
        {isResendVisible ? (
          <button
            className="enterdetail btn"
            onClick={() => {
              API.resendOTP(props, setTimer, setMsg);
            }}
          >
            Resend
          </button>
        ) : (
          <></>
        )}
        <button
          className="enterdetail btn"
          onClick={() => {
            API.verifyOTP(props, setMsg, navigate);
          }}
        >
          Enter
        </button>
      </div>
      {msg && (
        <div className="mt-2 text-base text-center text-red-500 msg">{msg}</div>
      )}
    </div>
  );
};

export default OTPVerification;
