import { useDispatch, useSelector } from "react-redux";
import FriendsBox from "./FriendsBox";
import useSound from "use-sound";
import backgroundSettingImage from "../../shared/media/image/background_setting.png";
import SettingIcon from "../../shared/media/image/setting.png";
import SoundIcon from "../../shared/media/image/sound.png";
import MusicIcon from "../../shared/media/image/music.png";
import WaifuImage from "../../shared/media/image/waifu.png";
import { removeUser, switchMusic, switchSound } from "../../actions/index";
import { useHistory } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import { useState } from "react";

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
                dispatch(removeUser());
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
  const { id, username, email, gender, avatar, wins } = useSelector(
    (state) => state.user
  );
  const [modal, setModal] = useState({
    infoUser: false,
    setAvatar: false,
  });
  return (
    <>
      <Modal open={modal.infoUser} className="modal info-user">
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
          <div className="modal-avatar-and-info">
            <div
              onClick={() => {
                sound && playBtnClickAudio();
                setModal({
                  ...modal,
                  setAvatar: !modal.setAvatar,
                  infoUser: !modal.infoUser,
                });
              }}
            >
              <div></div>
            </div>
            <div>
              <div>Email: {email}</div>
              <div>Gender: {gender ? "Male" : "Female"}</div>
              <div>Wins: {wins}</div>
            </div>
          </div>
          <div className="modal-username-and-id">
            <div>{username}</div>
            <div>{id}</div>
          </div>
        </div>
        <div className="modal-foot">
          <button>Submit</button>
        </div>
      </Modal>
      <Modal open={modal.setAvatar} className="modal change-avatar">
        <span
          className="back-main-switch"
          onClick={() => {
            sound && playBtnClickAudio();
            setModal({ ...modal, infoUser: !modal.infoUser, setAvatar: !modal.setAvatar });
          }}
        >
          X
        </span>
      </Modal>
      <div className="main-head">
        <div
          className="name-box"
          onClick={() => {
            sound && playBtnClickAudio();
            setModal({ ...modal, infoUser: !modal.infoUser });
          }}
        >
          <div className="main-avatar"></div>
          <div className="main-username-id">
            <div>{username}</div>
            <div>{id}</div>
          </div>
        </div>
        <div className="main-title">Seahorse WebGame</div>
      </div>
      <MainSetting />
      <div className="main-body">
        {/* <FriendsBox /> */}
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
          onClick={() => {
            sound && playBtnClickAudio();
            openInNewTab(
              "https://www.facebook.com/SeaHorse-Game-101530238693742"
            );
          }}
        >
          Visit Fanpage
        </div>
      </div>
    </>
  );
};
export default Lobby;
