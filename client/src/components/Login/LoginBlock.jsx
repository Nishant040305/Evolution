import { useState } from "react";
import "../../style/loginBlock.css";
import Signup from "./signup";
import Login from "./login";
import OTPVerification from "./OTPverification";
import ForgetPassword from "./forgetPassword";
import ConfirmPassword from "./ConfirmPassword";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkLight } from "../../Store/darkLightMode";
import icon from "../../constants/icon.json";

const LoginBlock = ({ setRegister }) => {
  const [signupLog, setSL] = useState(0); // 0: Login, 1: Signup, 2: OTP Verification, 3: Forget Password, 4: OTP for Password Reset, 5: Confirm Password
  const [userInfo, setUserInfo] = useState({ EMAIL: "", PASSWORD: "" });
  const [OTP, setOTP] = useState({ AUTHENTICATION: "", OTP: "" });
  const [PASS, setPASS] = useState({
    AUTHENTICATION: "",
    PASSWORD: "",
    CPASSWORD: "",
    EMAIL: "",
  });
  const [FOREMAIL, setEMAIL] = useState("");
  const mode = useSelector((state) => state.mode.mode);
  // const dispatch = useDispatch();

  const Update = (step) => {
    setSL(step);
  };

  const getHeading = () => {
    switch (signupLog) {
      case 1:
        return "Sign In";
      case 2:
        return "OTP Verification";
      case 3:
        return "Password Recovery";
      case 4:
        return "OTP Verification";
      case 5:
        return "Confirm New Password";
      default:
        return "Log In";
    }
  };

  const getSubheading = () => {
    switch (signupLog) {
      case 0:
        return "Enter your email and password to log in.";
      case 1:
        return "Fill in your details to create a new account.";
      case 2:
      case 4:
        return "Enter the 6-digit OTP sent to your email.";
      case 3:
        return "Enter your email to receive password reset instructions.";
      case 5:
        return "Set your new password.";
      default:
        return "";
    }
  };

  return (
    <div className={`loginBlock ${mode ? "dark-mode" : ""}`}>
      {/* Platform heading */}
      <div
        className={`platform-heading ${
          mode ? "dark-mode" : ""
        } relative flex flex-row items-center gap-2`}
      >
        <img src="favicon.ico" alt="logo" className="w-8 h-8" />
        <span
          className="text-xl font-bold absolute left-9 top-1"
          style={{ fontFamily: "unset" }}
        >
          Evolution
        </span>
      </div>

      {/* Main heading and subheading */}
      <div className="heading">{getHeading()}</div>
      <div className="subheading">{getSubheading()}</div>

      {/* Render based on current state */}
      {signupLog === 1 ? (
        <Signup
          value={userInfo}
          setValue={setUserInfo}
          Update={setSL}
          AUTH={setOTP}
        />
      ) : signupLog === 0 ? (
        <Login
          value={userInfo}
          setValue={setUserInfo}
          Update={setSL}
          setRegister={setRegister}
        />
      ) : signupLog === 2 ? (
        <OTPVerification
          value={OTP}
          setValue={setOTP}
          Update={setSL}
          setRegister={setRegister}
        />
      ) : signupLog === 3 ? (
        <ForgetPassword
          value={FOREMAIL}
          setValue={setEMAIL}
          AUTH={setOTP}
          Update={setSL}
        />
      ) : signupLog === 4 ? (
        <OTPVerification
          value={OTP}
          setValue={setOTP}
          Update={setSL}
          PASS={setPASS}
          work={1}
        />
      ) : signupLog === 5 ? (
        <ConfirmPassword value={PASS} setValue={setPASS} />
      ) : (
        <Login value={userInfo} setValue={setUserInfo} Update={setSL} />
      )}

      {/* Toggle links based on login or signup state */}
      <div className={`login-changeinfo ${mode ? "dark-mode" : ""}`}>
        {signupLog === 1 || signupLog === 2 ? (
          <>
            <span className="left">Already have an account?</span>
            <span onClick={() => Update(0)} className="link-page right">
              Login
            </span>
          </>
        ) : (
          <>
            <span>Create an account</span>
            <span onClick={() => Update(1)} className="link-page">
              Sign Up
            </span>

            {signupLog !== 3 && (
              <>
                <span>Forgot password?</span>
                <span onClick={() => Update(3)} className="link-page">
                  Reset Password
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* OR section */}
      <div className={`flex flex-row px-5 orsection ${mode ? "dark-mode" : ""}`}>
        <hr className="line" /> OR <hr className="line" />
      </div>

      {/* Social login buttons */}
      <div className="special-login">
        <button
          className="google-signin-button"
          onClick={() => {
            window.open(
              `${import.meta.env.VITE_REACT_APP_BACKWEB}${import.meta.env.VITE_REACT_APP_GOOGLE}`,
              '_self'
            );
          }}
        >
          <img src={icon.google} alt="Google logo" />
          <span>Sign in with Google</span>
        </button>
        <button
          className="github-signin-button"
          onClick={() => {
            window.open(`${import.meta.env.VITE_REACT_APP_BACKWEB}${import.meta.env.VITE_REACT_APP_GITHUB}`, '_self');
          }}
        >
          <img src={icon.github} alt="GitHub logo" />
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default LoginBlock;
