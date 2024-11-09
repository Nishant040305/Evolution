import axios from 'axios';
import server from '../server.json'; 
class AuthService {
  constructor() {
    this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB; // Set base URL from the imported constant
    this.server = server; // Set server configuration from the imported JSON
  }
  async resendOTP(props, setTimer, setMsg) {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.resend}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) throw new Error('Failed to Send Email');
      
      setTimer(300); // Reset timer to 5 minutes
      setMsg("OTP resent successfully.");
    } catch (e) {
      setMsg("Failed to resend OTP. Please try again.");
      console.error(e);
    }
  }

  async verifyOTP(props, setMsg, navigate) {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.otpVerification}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) throw new Error('Invalid OTP');
      
      if (props.work === 1) {
        props.Update(5);
        props.PASS({
          AUTHENTICATION: response.data.AUTH,
          PASSWORD: "",
          CPASSWORD: ""
        });
      } else {
        window.location.reload(true);
        
      }
      setMsg("OTP verified successfully.");
    } catch (e) {
      setMsg("Invalid OTP. Please try again.");
      console.error(e);
    }
  }

  async forgotPassword(props) {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.forget}`, { EMAIL: props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) {
        props.setMsg(response.data.message)
        throw new Error('Failed to Send Email')
      };
      props.Update(4);
      props.AUTH({
        AUTHENTICATION: response.data.AUTH,
        OTP: ""
      });
    } catch (e) {
      props.setMsg(e.response.data.message)
      console.error(e);
    }
  }

  async confirmPasswordChange(props) {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.confirmPasswordChange}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) throw new Error('Failed to confirm password change');
      else{
        props.setRegister({
          state: true,
          info: response.data.info
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async login(props, setMsg, navigate) {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.login}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
        mode: "cors",
        withCredentials: true,
      });
      if (response.status !== 200) throw new Error('Invalid Credentials');
      
      props.setRegister({
        state: true,
        info: response.data.info
      });
      // const dispatch = useDispatch();
      // dispatch(loginSuccess(response.data.info))
      navigate('/');
      setMsg("You are Logged in!");
    } catch (e) {
      setMsg("Invalid Credentials!!");
      console.error(e);
    }
  }

  async signup(props) {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.signup}`, { ...props.value }, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) throw new Error('Failed to register');
      
      props.Update(2);
      props.AUTH({
        AUTHENTICATION: response.data.AUTH,
        OTP: ""
      });
    //   setMsg("Signup successful, proceed to OTP verification.");
    } catch (e) {
    //   setMsg("Failed to register. Please try again.");
      console.error(e);
    }
  }
  async logout() {
    try {
      const response = await axios.post(`${this.baseURL}${this.server.Auth.logout}`, {}, {
        headers: { 'Accept': 'application/json' },
      });
      if (response.status !== 200) throw new Error('Failed to logout');
      
      window.location.reload(true);
    } catch (e) {
      console.error(e);
    }
  }
}

export default AuthService;
