import backgroundSettingImage from "../../shared/media/image/background_setting.png";
import SettingIcon from "../../shared/media/image/setting.png";
import SoundIcon from "../../shared/media/image/sound.png";
import MusicIcon from "../../shared/media/image/music.png";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import {  removeRoom, switchMusic, switchSound } from "../../actions";
const BoardSetting = () => {
    const audioControl = useSelector((state) => state.audioControl);
    const dispatch = useDispatch();
    const { music, sound, btnClickAudio } = audioControl;
    const [playBtnClickAudio] = useSound(btnClickAudio);
    return (
      <div
        className="board-setting-container"
        style={{
          backgroundImage: `url(${backgroundSettingImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="board-setting"
          style={{
            backgroundImage: `url(${SettingIcon})`,
          }}
        >
          {" "}
          <div className="board-menu-setting">
            {" "}
            <div className="board-menu-setting-container">
              <button
                className="board-menu-setting-item-btn"
                style={{
                  backgroundImage: `url(${SoundIcon})`,
                  border: `${!sound ? "3px solid black" : "3px solid #f6d2e1"}`,
                }}
                onClick={(e) => {
                  sound && playBtnClickAudio();
                  dispatch(switchSound);
                }}
              >
                {!sound && <div className="off"></div>}
              </button>
              <button
                className="board-menu-setting-item-btn"
                style={{
                  backgroundImage: `url(${MusicIcon})`,
                  border: `${!music ? "3px solid black" : "3px solid #f6d2e1"}`,
                }}
                onClick={(e) => {
                  sound && playBtnClickAudio();
                  dispatch(switchMusic);
                }}
              >
                {!music && <div className="off"></div>}
              </button>
            </div>
            <div className="board-menu-setting-container">
              <button
                className="board-menu-setting-item-btn"
                style={{ flexBasis: "100%" }}
                onClick={() => {
                  dispatch(removeRoom());
                }}
              >
                Exit room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default BoardSetting