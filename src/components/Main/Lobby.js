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
import avatar1 from "../../shared/media/image/ingame_Img_user_01.png";
import avatar2 from "../../shared/media/image/ingame_Img_user_02.png";
import avatar3 from "../../shared/media/image/ingame_Img_user_03.png";
import avatar4 from "../../shared/media/image/ingame_Img_user_04.png";
import avatar5 from "../../shared/media/image/ingame_Img_user_05.png";
import avatar6 from "../../shared/media/image/ingame_Img_user_06.png";
import { Grid } from "semantic-ui-react";
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
  const [currentDataUser, setCurrentDataUser] = useState({
    username,
    email,
    gender,
    avatar,
  });
  const [modalLoading, setModalLoading] = useState(false);

  const getAvatarPic = () => {
    switch (currentDataUser.avatar) {
      case 1:
        return avatar1;
      case 2:
        return avatar2;
      case 3:
        return avatar3;
      case 4:
        return avatar4;
      case 5:
        return avatar5;
      case 6:
        return avatar6;
      default:
        break;
    }
  };

  const setAvatar = (ava) => {
    setCurrentDataUser({ ...currentDataUser, avatar: ava });
  };

  const handleSubmitInfoChange = () => {};
  const handleSubmitAvatarChange = () => {};
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
              <div
                style={{
                  backgroundImage: `url(${getAvatarPic()})`,
                }}
              ></div>
            </div>
            <div>
              <div>Email: {email}</div>
              <div>Gender: {gender ? "Male" : "Female"}</div>
              <div>Wins: {wins}</div>
            </div>
          </div>
          <div className="modal-username-and-id">
            <div>{username}</div>
            <div>ID:{id}</div>
          </div>
        </div>
        <div className="modal-foot">
          <button onClick={handleSubmitInfoChange}>Submit</button>
        </div>
      </Modal>
      <Modal open={modal.setAvatar} className="modal change-avatar">
        <span
          className="back-main-switch"
          onClick={() => {
            sound && playBtnClickAudio();
            setModal({
              ...modal,
              infoUser: !modal.infoUser,
              setAvatar: !modal.setAvatar,
            });
          }}
        >
          X
        </span>
        <div className="modal-head">Change your avatar</div>
        <div className="modal-body">
          <div className="avatar-container">
            <div
              name="1"
              style={{
                backgroundImage: `url(${avatar1})`,
                border:
                  currentDataUser.avatar === 1 ? "3px solid black" : "none",
              }}
              onClick={() => setAvatar(1)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar2})`,
                border:
                  currentDataUser.avatar === 2 ? "3px solid black" : "none",
              }}
              onClick={() => setAvatar(2)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar3})`,
                border:
                  currentDataUser.avatar === 3 ? "3px solid black" : "none",
              }}
              onClick={() => setAvatar(3)}
            ></div>
          </div>{" "}
          <div className="avatar-container">
            <div
              style={{
                backgroundImage: `url(${avatar4})`,
                border:
                  currentDataUser.avatar === 4 ? "3px solid black" : "none",
              }}
              onClick={() => setAvatar(4)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar5})`,
                border:
                  currentDataUser.avatar === 5 ? "3px solid black" : "none",
              }}
              onClick={() => setAvatar(5)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar6})`,
                border:
                  currentDataUser.avatar === 6 ? "3px solid black" : "none",
              }}
              onClick={() => setAvatar(6)}
            ></div>
          </div>
        </div>
        <div className="modal-foot">
          <button onClick={handleSubmitAvatarChange}>Submit</button>
        </div>
      </Modal>
      <div className="main-head">
        <div
          className="name-box"
          onClick={() => {
            sound && playBtnClickAudio();
            setModal({ ...modal, infoUser: !modal.infoUser });
          }}
        >
          <div className="main-avatar">
            <div
              style={{
                backgroundImage: `url(${getAvatarPic()})`,
              }}
            ></div>
          </div>
          <div className="main-username-id">
            <div>{username}</div>
            <div>ID:{id}</div>
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
