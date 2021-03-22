import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useSound from "use-sound";
import {useSelector} from "react-redux"
import { motion } from "framer-motion";

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
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignInBtnClick = (e) => {
    sound && playBtnClickAudio();
    console.log("Signup");
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
            <label for="male">Male</label>
            <input
              type="radio"
              name="gender"
              checked={state.gender}
              onChange={handleRadioBtnClick}
            />
            <label for="male">Female</label>
            <input type="radio" name="gender" onChange={handleRadioBtnClick} />
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
    </div></motion.div>
  );
};

export default Signup;
