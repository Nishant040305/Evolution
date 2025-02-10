import AuthService from '../../scripts/API.Login';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';

const Signup = (props) => {
  let WEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    props.setValue({
      ...props.value,
      [e.target.name]: e.target.value,
    });
  };
  const mode = useSelector((state) => state.mode.mode);
  const API = new AuthService();
  return (
    <div className="bottom">
      <div className={`container flex flex-col text-left px-2`}>
        <div className={`head-info ${mode ? 'dark-mode' : ''}`}>Email*</div>
        <input
          className="input-detail"
          name="EMAIL"
          value={props.value.EMAIL}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
      </div>
      <div className="flex flex-col px-2 text-left ">
        <div className={`head-info ${mode ? 'dark-mode' : ''}`}>Password*</div>
        <div className="relative">
          <input
            className="input-detail"
            type={showPassword ? 'text' : 'password'}
            name="PASSWORD"
            value={props.value.PASSWORD}
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>
          <button
            type="button"
            className="absolute right-2 top-6 transform -translate-y-1/2 "
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
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
