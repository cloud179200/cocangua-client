import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Signup = () => {
  const [state, setState] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    email: ""
  });
  const history = useHistory();
  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignInBtnClick = (e) => {
    console.log("Signup");
  };
  return (
    <div className="sign-container">
      <form>
        <span
          className="back-main-switch"
          onClick={() => history.push("/auth")}
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
          <label>Display Name:</label>
          <input
            name="displayName"
            type="text"
            onChange={handleInputChange}
            value={state.displayName}
          ></input>
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
        <div className="already-have-account">
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
  );
};

export default Signup;
