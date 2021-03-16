import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import BackgroundImage from "../../shared/media/image/background.jpg";
import SettingIcon from "../../shared/media/image/setting.png";
import PowerIcon from "../../shared/media/image/power.png";
import MusicIcon from "../../shared/media/image/music.png";
import SoundIcon from "../../shared/media/image/sound.png";

import "./Auth.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
const Auth = (props) => {
  const [state, setState] = useState({
    music: true,
    sound: true,
  });
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
      <div className="auth-title">Seahorse Chess</div>
      <Switch>
        <Route path="/auth/signin" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/" component={MainSwitch} />
        <Route path="*" component={() => <Redirect to="/auth" />} />
      </Switch>

      <div className="copyright">Copyright © 2021</div>
      <div
        className="control-container setting"
        style={{ backgroundImage: `url(${SettingIcon})` }}
      >
        <div className="menu-setting">
          {" "}
          <button
            className="menu-setting-item-btn"
            style={{
              backgroundImage: `url(${SoundIcon})`,
              border: `${
                !state.sound ? "3px solid black" : "3px solid #f6d2e1"
              }`,
            }}
            onClick={(e) => setState({ ...state, sound: !state.sound })}
          >
            {!state.sound && <div className="off"></div>}
          </button>
          <button
            className="menu-setting-item-btn"
            style={{
              backgroundImage: `url(${MusicIcon})`,
              border: `${
                !state.music ? "3px solid black" : "3px solid #f6d2e1"
              }`,
            }}
            onClick={(e) => setState({ ...state, music: !state.music })}
          >
            {!state.music && <div className="off"></div>}
          </button>
        </div>
      </div>
      <div
        className="control-container power"
        style={{ backgroundImage: `url(${PowerIcon})` }}
        onClick={() => history.push("/hello")}
      ></div>

      <MessengerCustomerChat
        pageId="101530238693742"
        appId="3881449045268897"
      />
    </div>
  );
};

export default Auth;
