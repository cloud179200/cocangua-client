import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { loadUser, addNotificationMessage } from "../../actions";
import axios from "../../shared/axios/axios";
import { motion } from "framer-motion";
import Loading from "../shared/Loading";

const Signin = (props) => {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    username: "",
    password: "",
    rememberPassword: false,
  });
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignInFormSubmit = (e) => {
    e.preventDefault();
    sound && playBtnClickAudio();
    const { username, password } = state;
    const usernameVerify = username.trim();
    const data = JSON.stringify({
      username: usernameVerify,
      password: password,
    });
    if (usernameVerify.length < 1 || password.length < 1)
      dispatch(addNotificationMessage("Please fill info!", true));
    else {
      setLoading(true);
      axios
        .post("/api/signin", data)
        .then((res) => {
          const { token, status, message } = res.data;
          if (token) {
            localStorage.setItem("token_seahorsechessapp", token);
            dispatch(loadUser());
            dispatch(addNotificationMessage("Successfully signin", false));
            setLoading(false);
          }
          if (status === "error") {
            setLoading(false);
            dispatch(addNotificationMessage(message, true));
          }
        })
        .catch((err) => {
          setLoading(false);
          dispatch(addNotificationMessage(err.message, true));
        });
    }
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
        ) : (
          <form onSubmit={handleSignInFormSubmit}>
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
              <div className="forgot-password">
                <Link to="/auth/forgot">Forgot password?</Link>
              </div>
              <div className="forgot-password">
                <Link to="/auth/signup">Dont have account?</Link>
              </div>
            </div>
            <button
              onClick={handleSignInFormSubmit}
              type="submit"
              className="sign-btn"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Signin;
