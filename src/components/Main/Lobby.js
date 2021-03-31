import { useDispatch, useSelector } from "react-redux";
import FriendsBox from "./FriendsBox";
import useSound from "use-sound";
import backgroundSettingImage from "../../shared/media/image/background_setting.png";
import SettingIcon from "../../shared/media/image/setting.png";
import SoundIcon from "../../shared/media/image/sound.png";
import MusicIcon from "../../shared/media/image/music.png";
import WaifuImage from "../../shared/media/image/waifu.png";
import { loadUser, switchMusic, switchSound } from "../../actions/index";
import { useHistory } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import { useRef, useState } from "react";

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const MainSetting = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const dispatch = useDispatch();
  const { music, sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);

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
              onClick={(e) => {
                sound && playBtnClickAudio();
                dispatch(switchSound);
              }}
            >
              {!sound && <div className="off"></div>}
            </button>
            <button
              className="main-menu-setting-item-btn"
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
          <div className="main-menu-setting-container">
            <button
              className="main-menu-setting-item-btn"
              style={{ flexBasis: "100%" }}
              onClick={() => {
                localStorage.removeItem("token_seahorsechessapp");
                dispatch(loadUser());
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Lobby = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  const [modal, setModal] = useState({
    infoUser: false,
  });
  const nameBox = useRef();
  return (
    <>
      <Modal open={!modal.infoUser} className="modal info-user">
        <span
          className="back-main-switch"
          onClick={() => {
            sound && playBtnClickAudio();
            setModal({ ...modal, infoUser: !modal.infoUser });
          }}
        >
          X
        </span>
        <div className="modal-head">Profile</div>
        <div className="modal-body">
          <div>
            <div className="main-body-avatar">
              <div></div>
            </div>
            <div className="modal-body-name-id">name/id</div>
          </div>
          <div>
            <div>Email</div>
            <div>Gender</div>
          </div>
        </div>
        <div className="modal-foot">
          <button></button>
        </div>
      </Modal>
      {/* <Modal
        onClose={() => setModal({ ...modal, in: true })}
        onOpen={() => setModal({ ...modal, infoUser: false })}
        open={modal.infoUser}
        className="modal change-avatar"
      ></Modal> */}
      <div className="main-head">
        <div
          className="name-box"
          onClick={() => {
            setModal({ ...modal, infoUser: !modal.infoUser });
          }}
        >
          <div className="main-avatar" ref={nameBox}></div>
          <div className="main-username-id">
            <div>name</div>
            <div>id</div>
          </div>
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
        <div className="main-control">
          <div
            className="main-control-item"
            onClick={() => {
              sound && playBtnClickAudio();
              history.push("/lobby/join");
            }}
          >
            Play
          </div>
          <div
            className="main-control-item"
            onClick={() => {
              sound && playBtnClickAudio();
              history.push("/lobby/join");
            }}
          >
            Find game
          </div>
        </div>
      </div>
      <div className="main-foot">
        <div className="copyright">
          Copyright © 2021 | Design by Nguyen Minh An
        </div>
        <div
          className="visit-fanpage"
          onClick={() =>
            openInNewTab(
              "https://www.facebook.com/SeaHorse-Game-101530238693742"
            )
          }
        >
          Visit Fanpage
        </div>
      </div>
    </>
  );
};
export default Lobby;
