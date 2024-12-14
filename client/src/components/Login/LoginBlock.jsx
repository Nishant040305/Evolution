import React, { useState } from "react";
import "../../style/loginBlock.css";
import Signup from "./signup";
import Login from "./login";
import OTPVerification from "./OTPverification";
import ForgetPassword from "./forgetPassword";
import ConfirmPassword from "./ConfirmPassword";

const LoginBlock = ({ setRegister }) => {
  const [signupLog, setSL] = useState(0); // 0: Login, 1: Signup, 2: OTP Verification, 3: Forget Password, 4: OTP for Password Reset, 5: Confirm Password
  const [userInfo, setUserInfo] = useState({ EMAIL: "", PASSWORD: "" });
  const [OTP, setOTP] = useState({ AUTHENTICATION: "", OTP: "" });
  const [PASS, setPASS] = useState({
    AUTHENTICATION: "",
    PASSWORD: "",
    CPASSWORD: "",
  });
  const [FOREMAIL, setEMAIL] = useState("");

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
    <div className="loginBlock">
      <div className="text-white heading">{getHeading()}</div>
      <div className="text-white subheading">{getSubheading()}</div>

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
      <div className="login-changeinfo">
        {signupLog === 1 || signupLog === 2 ? (
          <div className="text-white" onClick={() => setSL(0)}>
            Already have an account?
          </div>
        ) : (
          <div className="loged">
            {signupLog !== 3 && (
              <div className="mr-10 text-white" onClick={() => setSL(3)}>
                Forgot password?
              </div>
            )}
            <div className="text-white" onClick={() => setSL(1)}>
              Create an account
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row px-5 orsection">
        <hr className="text-white line" /> OR <hr className="text-white line" />
      </div>

      {/* Social login buttons */}
      <div className="special-login">
        <button
          className="google-signin-button"
          onClick={() => {
            window.open(
              "http://localhost:4000/api/auth/google/callback",
              "_self"
            );
          }}
        >
          <img
            src="https://banner2.cleanpng.com/20240111/qtv/transparent-google-logo-colorful-google-logo-with-bold-green-1710929465092.webp"
            alt="Google logo"
          />
          <span>Sign in with Google</span>
        </button>
        <button
          className="github-signin-button"
          onClick={() => {
            window.open("http://localhost:4000/api/auth/github", "_self");
          }}
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub logo"
          />
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default LoginBlock;
