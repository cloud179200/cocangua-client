import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../shared/axios/axios";
import { addNotificationMessage } from "../../actions";
import { motion } from "framer-motion";
import Loading from "../shared/Loading";

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
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
  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();
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
    if (!username || !password || !email || !confirmPassword) {
      dispatch(addNotificationMessage("Please fill info!", true));
    } else if (usernameVerify.length < 8 || passwordVerify.length < 8)
      dispatch(
        addNotificationMessage(
          "Username, password should be more than 8 characters!",
          true
        )
      );
    else if (password !== confirmPassword)
      dispatch(addNotificationMessage("Confirm password not correct!", true));
    else if (!validEmail)
      dispatch(addNotificationMessage("Email not valid!", true));
    else {
      setLoading(true);
      const data = JSON.stringify({
        username: usernameVerify,
        password: passwordVerify,
        gender: gender,
        email: emailVerify,
      });
      axios
        .post("/api/signup", data)
        .then((res) => {
          setLoading(false);
          const {status, message} = res.data;
          console.log(res.data);
          if(status === "success"){
            dispatch(addNotificationMessage(message, false));
            history.push("/auth/signin")
          }
          status === "error" && dispatch(addNotificationMessage(message, true));
        })
        .catch((err) => {
          setLoading(false);
          dispatch(addNotificationMessage(err, true));
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
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSignUpFormSubmit}>
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
            <button type="submit" className="sign-btn">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Signup;
