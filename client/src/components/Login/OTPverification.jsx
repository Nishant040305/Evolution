import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../scripts/API.Login';
import { useSelector } from 'react-redux';

const OTPVerification = (props) => {
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [msg, setMsg] = useState('');
  const [isResendVisible, setIsResendVisible] = useState(false);
  const otpInputs = useRef([]);
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode.mode);

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

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    props.setValue((prev) => {
      const newOtp = prev.OTP.split('');
      newOtp[index] = value;
      return { ...prev, OTP: newOtp.join('') };
    });
    if (value && index < 5) otpInputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      props.setValue((prev) => {
        const newOtp = prev.OTP.split('');
        newOtp[index] = '';
        return { ...prev, OTP: newOtp.join('') };
      });
      if (index > 0) otpInputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (pasteData.length === 6) {
      props.setValue({ ...props.value, OTP: pasteData });
      pasteData.split('').forEach((char, index) => {
        otpInputs.current[index].value = char;
      });
    }
  };

  const API = new AuthService();

  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-2`}>
        <div className={`head-info ${mode ? 'dark-mode' : ''}`}>OTP</div>
        {!isResendVisible && (
          <span className={`timer ${mode ? 'text-white' : 'text-gray-800'}`}>
            Resend in {formatTime()}
          </span>
        )}
        <div className="flex gap-2 justify-center mt-2" onPaste={handlePaste}>
          {Array(6)
            .fill('')
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-10 h-10 text-center border border-gray-400 rounded-md"
                ref={(el) => (otpInputs.current[index] = el)}
                value={props.value.OTP[index] || ''}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-row mt-3">
        {isResendVisible && (
          <button
            className="enterdetail btn m-2"
            onClick={() => {
              API.resendOTP(props, setTimer, setMsg);
            }}
          >
            Resend
          </button>
        )}
        <button
          className="enterdetail btn m-2"
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
