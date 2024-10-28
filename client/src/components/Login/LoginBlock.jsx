import React,{useState} from 'react'
import '../../style/loginBlock.css'
const LoginBlock = () => {
    const [signupLog,setSL] = useState(false);
  return (
    <div className='loginBlock'>
      <div className='heading text-white'>
        {signupLog==true?"Sign Up":"Log In"}
      </div>
      <div className="subheading text-white">
                {signupLog 
                    ? "Enter your credentials, email, and password to create an account."
                    : "Enter your email and password to log in to your account."}
            </div>

      <div className='bottom'>
        <div className={`container flex flex-col text-left ${signupLog?"p-16":"px-16"}`}>
        <div className='text-white head-info '>Email*</div>
       <input className='input-detail'></input>
       </div>
       {!signupLog?
       <div className=' flex flex-col text-left px-16 py-2'>
        <div className='text-white head-info'>Password*</div>
       <input className='input-detail'></input>
       </div>:<></>}
       <button className='enterdetail btn'>Enter</button>
      </div>
      <div className='login-changeinfo'>
        {signupLog?<div className='text-white' onClick={()=>{setSL(1-signupLog)}}>already have account?</div>:<div className=' loged '>
        <div className='text-white mr-10'>forget password?</div>
        <div className='text-white' onClick={()=>{setSL(1-signupLog)}}>Create Account?</div></div>}
      </div>
      <div className='flex flex-row orsection px-5'>
      <hr className='text-white line'></hr>OR<hr className='text-white line'></hr>
      </div>
      <div className='special-login'>
      <button class="google-signin-button">
          <img src="https://banner2.cleanpng.com/20240111/qtv/transparent-google-logo-colorful-google-logo-with-bold-green-1710929465092.webp" alt="Google logo" />
          <span>Sign in with google</span>
      </button>
      <button class="github-signin-button">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" />
          <span>Sign in with GitHub</span>
      </button>

      </div>
    </div>
  )
}

export default LoginBlock
