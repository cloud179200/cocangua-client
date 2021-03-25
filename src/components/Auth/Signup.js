import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { setNotificationMessage } from "../../actions";
const Signup = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    gender: true,
    email: "",
  });
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignInBtnClick = (e) => {
    sound && playBtnClickAudio();
    const { username, password, email, confirmPassword, gender } = state;
    const usernameVerify = username.trim();
    const passwordVerify = password;

    const emailVerify = email.trim();
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      emailVerify
    )
      ? true
      : false;
    if (usernameVerify.length <= 8) {
      dispatch(setNotificationMessage("Username must be over 8 characters!"));
    } else if (passwordVerify.length <= 8) {
      dispatch(setNotificationMessage("Password must be over 8 characters!"));
    } else if (password !== confirmPassword) {
      dispatch(setNotificationMessage("Confirm password incorrect!"));
    } else if (!validEmail) {
      dispatch(setNotificationMessage("Email not valid!"));
    } else {
      const data = JSON.stringify({
        username: usernameVerify,
        gender: gender,
        email: emailVerify,
        password: passwordVerify,
      });

      const config = {
        method: "post",
        url: "http://localhost:4000/api/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          //TODO: get token, store token;
          const { success, error } = response.data;
          if (success) {
            dispatch(setNotificationMessage("Signup success"));

            history.push("/auth/signin");
          } else {
            dispatch(setNotificationMessage(error));
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch(setNotificationMessage(error));
        });
    }
  };
  const handleRadioBtnClick = (e) => {
    sound && playBtnClickAudio();
    setState({ ...state, gender: !state.gender });
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
            <label>Gender: </label>
            <div className="radio-btn-container">
              <label>Male</label>
              <input
                type="radio"
                name="gender"
                checked={state.gender}
                onChange={handleRadioBtnClick}
              />
              <label>Female</label>
              <input
                type="radio"
                name="gender"
                onChange={handleRadioBtnClick}
              />
            </div>
          </div>
          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              onChange={handleInputChange}
              value={state.email}
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
            <label>Confirm password:</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleInputChange}
              value={state.confirmPassword}
            ></input>
          </div>
          <div className="direct">
            <div>
              <Link to="/auth/signin">Already have account?</Link>
            </div>
          </div>
          <button
            onClick={handleSignInBtnClick}
            type="button"
            className="sign-btn"
          >
            Sign Up
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
