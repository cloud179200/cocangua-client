import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FriendsBox from "./FriendsBox";
import useSound from "use-sound";
import backgroundImage from "../../shared/media/image/background_main.png";
import backgroundSettingImage from "../../shared/media/image/background_setting.png";
import SettingIcon from "../../shared/media/image/setting.png";
import SoundIcon from "../../shared/media/image/sound.png";
import MusicIcon from "../../shared/media/image/music.png";
import ButtonGreenImage from "../../shared/media/image/button_green.png";
import ButtonPinkImage from "../../shared/media/image/button_pink.png";
import WaifuImage from "../../shared/media/image/waifu.png";
import backgroundNameBox from "../../shared/media/image/namebox.png";
import backgroundFacebook from "../../shared/media/image/background_facebook.png";
import backgroundMainControl from "../../shared/media/image/background_main_control.png";


import "./Main.css";
import { switchMusic, switchSound } from "../../actions/index";

const MainSetting = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const dispatch = useDispatch();
  const { music, sound, btnClickAudio } = audioControl;
  const history = useHistory();

  return (
    <div
      className="main-setting-container"
      style={{
        backgroundImage: `url(${backgroundSettingImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="main-setting"
        style={{
          backgroundImage: `url(${SettingIcon})`,
        }}
      >
        {" "}
        <div className="main-menu-setting">
          {" "}
          <div className="main-menu-setting-container">
            <button
              className="main-menu-setting-item-btn"
              style={{
                backgroundImage: `url(${SoundIcon})`,
                border: `${!sound ? "3px solid black" : "3px solid #f6d2e1"}`,
              }}
              onClick={(e) => dispatch(switchSound)}
            >
              {!sound && <div className="off"></div>}
            </button>
            <button
              className="main-menu-setting-item-btn"
              style={{
                backgroundImage: `url(${MusicIcon})`,
                border: `${!music ? "3px solid black" : "3px solid #f6d2e1"}`,
              }}
              onClick={(e) => dispatch(switchMusic)}
            >
              {!music && <div className="off"></div>}
            </button>
          </div>
          <div className="main-menu-setting-container">
            <button
              className="main-menu-setting-item-btn"
              style={{ flexBasis: "100%" }}
              onClick={() => history.push("/auth")}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Main = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const dispatch = useDispatch();
  const { music, sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  return (
    <div
      className="main"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="main-head">
        <div
          className="name-box"
          style={{
            backgroundImage: `url(${backgroundNameBox})`,
          }}
        >
          <div className="main-avatar"></div>
          <div className="main-username">DancePhug waifu</div>
        </div>
        <div className="main-title">Seahorse WebGame</div>
      </div>
      <MainSetting />
      <div className="main-body">
        <FriendsBox />
        <div
          className="waifu"
          style={{ backgroundImage: `url(${WaifuImage})` }}
        ></div>
        <div className="main-control"  style={{
            backgroundImage: `url(${backgroundMainControl})`,
          }}>
          <div
            className="main-control-item"
            style={{ backgroundImage: `url(${ButtonGreenImage})` }}
          >Play</div>
          <div
            className="main-control-item"
            style={{ backgroundImage: `url(${ButtonPinkImage})` }}
          >Find game</div>
        </div>
      </div>
      <div className="main-foot">
        <div className="copyright">
          Copyright © 2021 | Design by Nguyen Minh An
        </div>
        <div
          className="visit-fanpage"
          style={{
            backgroundImage: `url(${backgroundFacebook})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Main;
