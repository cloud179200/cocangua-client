import { Redirect, Route, Switch, useHistory } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Forgot from "./Forgot";
import BackgroundImage from "../../shared/media/image/background.jpg";
import SettingIcon from "../../shared/media/image/setting.png";
import PowerIcon from "../../shared/media/image/power.png";
import MusicIcon from "../../shared/media/image/music.png";
import SoundIcon from "../../shared/media/image/sound.png";
import PlayIcon from "../../shared/media/image/play.png";
import "./Auth.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { useSelector, useDispatch } from "react-redux";
import { switchSound, switchMusic } from "../../actions";
import useSound from "use-sound";
import { useEffect } from "react";
const Auth = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const { music, sound, btnClickAudio } = audioControl;

  const [playBtnClickAudio] = useSound(btnClickAudio);

  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <div
      className="auth"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="auth-title">Seahorse Chess</div>
      <Switch>
        <Route path="/auth/signin" component={Signin} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/forgot" component={Forgot} />
        <Route
          path="/"
          render={() => (
            <div className="main-switch">
              <div>VIP PRO online game website</div>
              <button
                onClick={() => {
                  sound && playBtnClickAudio();
                  history.push("/auth/signin");
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  sound && playBtnClickAudio();
                  history.push("/auth/signup");
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        />
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
              border: `${!sound ? "3px solid black" : "3px solid #f6d2e1"}`,
            }}
            onClick={(e) => dispatch(switchSound)}
          >
            {!sound && <div className="off"></div>}
          </button>
          <button
            className="menu-setting-item-btn"
            style={{
              backgroundImage: `url(${MusicIcon})`,
              border: `${!music ? "3px solid black" : "3px solid #f6d2e1"}`,
            }}
            onClick={(e) => dispatch(switchMusic)}
          >
            {!music && <div className="off"></div>}
          </button>
        </div>
      </div>
      <div
        className="control-container power"
        style={{ backgroundImage: `url(${PowerIcon})` }}
        onClick={() => {
          sound && playBtnClickAudio();
        }}
      ></div>
      <div
        className="control-container play"
        style={{ backgroundImage: `url(${PlayIcon})` }}
        onClick={() => {
          sound && playBtnClickAudio();
          history.push("/hello");
        }}
      ></div>
      if(history){" "}
      {history.location.pathname && (
        <MessengerCustomerChat
          pageId="101530238693742"
          appId="3881449045268897"
        />
      )}
    </div>
  );
};

export default Auth;
