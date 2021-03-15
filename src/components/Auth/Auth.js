import { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import BackgroundImage from "../../shared/media/image/background.jpg";
import "./Auth.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
const Auth = (props) => {
  const history = useHistory();
  const MainSwitch = () => {
    return (
      <div className="main-switch">
        <div s>VIP PRO online game website</div>
        <button onClick={() => history.push("/auth/signin")}>Sign In</button>
        <button onClick={() => history.push("/auth/signup")}>Sign Up</button>
      </div>
    );
  };

  useEffect(() => {}, []);
  return (
    <div
      className="auth"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="auth-title">Seahourse Chess</div>
        <Switch>
          <Route path="/auth/signin" component={Signin} />
          <Route path="/auth/signup" component={Signup} />
          <Route path="/" component={MainSwitch} />
          <Route path="*" component={() => <Redirect to="/auth" />} />
        </Switch>
      
      <div className="copyright">Copyright © 2021</div>
      <MessengerCustomerChat
        pageId="101530238693742"
        appId="3881449045268897"
      />
    </div>
  );
};

export default Auth;
