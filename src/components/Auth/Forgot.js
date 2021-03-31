import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loading from "../shared/Loading";
import { addNotificationMessage } from "../../actions";
import axios from "../../shared/axios/axios";

const Forgot = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    username: "",
    key: "",
    password: "",
    confirmPassword: "",
    code:""
  });
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleGetCodeFormSubmit = (e) => {
    e.preventDefault();
    const { username } = state;
    if (username.length < 1)
      dispatch(
        addNotificationMessage(
          "Please fill info!",
          true
        )
      );
    else {
      // axios.post()
      dispatch(addNotificationMessage("Code sent to your email", false));
      setLoading(true);
      setLoading(false);
    }
  };
  const handleChangePasswordFormSubmit = (e) => {
    e.preventDefault();
    const {username, password, confirmPassword, code} = state;
    setLoading(true);
    if(username.length < 1 || password.length < 1 || confirmPassword.length < 1 || code.length < 1) dispatch(addNotificationMessage("Please fill info!", true));
    else if (password !== confirmPassword) dispatch(addNotificationMessage("Confirm password not correct!", true));
    else if (password < 8)  dispatch(addNotificationMessage("Username, Password should be more than 8 characters!", true));
    setLoading(false);
  };
  return (
    <motion.div
      className="container"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
      }}
    >
      <div className="sign-container">
        {loading ? (
          <Loading />
        ) : state.key === "" ? (
          <form onSubmit={handleGetCodeFormSubmit}>
            <span
              className="back-main-switch"
              onClick={() => {
                sound && playBtnClickAudio();
                history.push("/auth");
              }}
            >
              X
            </span>
            <div>
              <label>Username:</label>
              <input
                name="username"
                type="text"
                onChange={handleInputChange}
                value={state.username}
              ></input>
            </div>
            <div className="direct">
              <div className="forgot-password">
                <Link to="/auth/signup">Dont have account?</Link>
              </div>
            </div>
            <button type="submit" className="sign-btn">
              Get code
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePasswordFormSubmit}>
            <span
              className="back-main-switch"
              onClick={() => {
                sound && playBtnClickAudio();
                history.push("/auth");
              }}
            >
              X
            </span>
            <div>
              <label>Username:</label>
              <input
                name="username"
                type="text"
                onChange={handleInputChange}
                value={state.username}
              ></input>
            </div>
            <div>
              <label>Password:</label>
              <input
                name="password"
                type="password"
                onChange={handleInputChange}
                value={state.password}
              ></input>
            </div>
            <div>
              <label>Confirm Password:</label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleInputChange}
                value={state.confirmPassword}
              ></input>
            </div>
            <div>
              <label>Code:</label>
              <input
                name="code"
                type="text"
                onChange={handleInputChange}
                value={state.code}
              ></input>
            </div>
            <div className="direct">
              <div className="forgot-password">
                <Link to="/auth/signup">Dont have account?</Link>
              </div>
            </div>
            <button type="submit" className="sign-btn">
              Change Password
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Forgot;
