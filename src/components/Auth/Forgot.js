import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useSound from "use-sound";
import { useSelector } from "react-redux";
import {motion} from "framer-motion";
const Forgot = () => {
  const [state, setState] = useState({
    email: "",
  });
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleGetCodeBtnClick = (e) => {
    console.log("Forgot");
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
            <label>Email:</label>
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
          <button
            onClick={handleGetCodeBtnClick}
            type="button"
            className="sign-btn"
          >
            Get code
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Forgot;
