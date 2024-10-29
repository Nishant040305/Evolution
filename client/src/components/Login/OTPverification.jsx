import React, { useEffect, useState } from 'react';
import axios from "axios";
import server from "../../server.json";

const OTPVerification = (props) => {
  let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [msg, setMsg] = useState('');
  const [isResendVisible, setIsResendVisible] = useState(false);

  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
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

  const Resend = async () => {
    console.log("hey")
    try {
      const response = await axios.post(`${WEB}${server.Test.resend}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) {
        throw new Error('Failed to Send Email');
      } else {
        setTimer(300); // Reset timer to 5 minutes
        setMsg("OTP resent successfully.");
      }
    } catch (e) {
      setMsg("Failed to resend OTP. Please try again.");
      console.error(e);
    }
  };

  const Verified = async () => {
    try {
      const response = await axios.post(`${WEB}${server.Test.otpVerification}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) {
        throw new Error('Invalid OTP');
      } else {
        if(props.work==1){
          props.Update(5);
          props.PASS({
              AUTHENTICATION:response.data.AUTHENTICATION,
              PASSWORD:"",
              CPASSWORD:""
            
          })
        }
        setMsg("OTP verified successfully.");
      }
    } catch (e) {
      setMsg("Invalid OTP. Please try again.");
      console.error(e);
    }
  };

  return (
    <div className='bottom'>
      <div className={`container flex flex-col text-left px-16`}>
        <div className='text-white head-info'>OTP</div>
        {isResendVisible?<></>:<span className="timer text-white">Resend in {formatTime()}</span>}
        <input
          className='input-detail'
          name="OTP"
          value={props.value.OTP}
          placeholder="6-digit Code"
          onChange={(e) => { handleChange(e); }}
        />
      </div>
      <div className='flex flex-row'>
        {isResendVisible ? (
          <button className='enterdetail btn' onClick={()=>{Resend()}}>Resend</button>
        ) : (
          <></>
        )}
        <button className='enterdetail btn' onClick={()=>{Verified()}}>Enter</button>
      </div>
      {msg && <div className='msg text-red-500 mt-2 text-2xl'>{msg}</div>}
    </div>
  );
};

export default OTPVerification;
