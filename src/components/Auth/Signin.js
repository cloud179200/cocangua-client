import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";

const Signin = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    rememberPassword: false,
  });
  const history = useHistory();
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignInBtnClick = (e) => {
    console.log("Signin");
  };
  return (
    <div className="sign-container">

    <form>
      <span className="back-main-switch" onClick={() => history.push("/auth")}>
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
        <div className="check-remember">
          <input
            type="checkbox"
            name="rememberPassword"
            checked={state.rememberPassword}
            onChange={(e) =>
              setState({ ...state, rememberPassword: e.target.checked })
            }
          />
          <div
            onClick={() =>
              setState({
                ...state,
                rememberPassword: !state.rememberPassword,
              })
            }
          >
            Remember me
          </div>
        </div>
        <div className="forgot-password">
          <Link to="/auth/signup">Forgot password?</Link>
        </div>
      </div>
      <button onClick={handleSignInBtnClick} type="button" className="sign-btn">
        Sign In
      </button>
    </form></div>
  );
};

export default Signin;
