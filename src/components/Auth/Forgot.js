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
    code: "",
    onFormGetCode: true,
  });
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    let value = e.target.value.replace(" ", "");
    // eslint-disable-next-line no-control-regex
    const re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
    value = value.replace(re, "");
    setState({ ...state, [e.target.name]: value });
  };
  const handleGetCodeFormSubmit = (e) => {
    e.preventDefault();
    const { username } = state;
    if (username.length < 1)
      dispatch(addNotificationMessage("Please fill info!", true));
    else {
      setLoading(true);
      const data = JSON.stringify({ username: username });
      axios
        .post("/resetPasswordRequest", data)
        .then((res) => {
          const { status, message } = res.data;
          setLoading(false);
          setState({ ...state, onFormGetCode: !state.onFormGetCode });
          if (status === "success") {
            dispatch(addNotificationMessage("Code sent to your email", false));
          }
          status === "error" && dispatch(addNotificationMessage(message, true));
        })
        .catch((err) => {
          setLoading(false);
          dispatch(addNotificationMessage(err.message, true));
        });
    }
  };
  const handleChangePasswordFormSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, code } = state;
    if (
      username.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1 ||
      code.length < 1
    )
      dispatch(addNotificationMessage("Please fill info!", true));
    else if (password !== confirmPassword)
      dispatch(addNotificationMessage("Confirm password not correct!", true));
    else if (password < 8)
      dispatch(
        addNotificationMessage(
          "Password should be more than 8 characters!",
          true
        )
      );
    else {
      setLoading(true);

      const data = JSON.stringify({
        username: username,
        password: password,
        key: code,
      });
      axios
        .post("/resetPasswordConfirm", data)
        .then((res) => {
          setLoading(false);
          const { status, message } = res.data;
          if (status === "success") {
            dispatch(addNotificationMessage(message, false));
            history.push("/auth/signin");
          }
          status === "error" && dispatch(addNotificationMessage(message, true));
        })
        .catch((err) => {
          setLoading(false);
          dispatch(addNotificationMessage(err.message, true));
        });
    }
  };

  useState(() => {
    
    return () => {
      setLoading(null);
      setState(null);
    };
  }, []);
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
        ) : state.onFormGetCode ? (
          <form onSubmit={handleGetCodeFormSubmit}>
            <span
              className="back-main-switch"
              onClick={() => {
                sound && playBtnClickAudio();
                state.onFormGetCode
                  ? history.push("/auth")
                  : setState({ ...state, onFormGetCode: !state.onFormGetCode });
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
                onChange={() => {}}
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
