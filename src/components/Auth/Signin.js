import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import { motion } from "framer-motion";
const Signin = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    rememberPassword: false,
  });
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignInBtnClick = (e) => {
    e.preventDefault();
    sound && playBtnClickAudio();
    console.log("Signin");
    history.push("/lobby");
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
        <form>
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
          <div className="check-remember-and-forgot-password">
            <div
              className="check-remember"
              onClick={() =>
                setState({
                  ...state,
                  rememberPassword: !state.rememberPassword,
                })
              }
            >
              <input
                type="checkbox"
                name="rememberPassword"
                checked={state.rememberPassword}
                onChange={(e) =>
                  setState({ ...state, rememberPassword: e.target.checked })
                }
              />
              <div
                onChange={() => {
                  sound && playBtnClickAudio();
                  setState({
                    ...state,
                    rememberPassword: !state.rememberPassword,
                  });
                }}
              >
                Remember me
              </div>
            </div>
            <div className="forgot-password">
              <Link to="/auth/forgot">Forgot password?</Link>
            </div>
            <div className="forgot-password">
              <Link to="/auth/signup">Dont have account?</Link>
            </div>
          </div>
          <button
            onClick={handleSignInBtnClick}
            type="button"
            className="sign-btn"
          >
            Sign In
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Signin;
