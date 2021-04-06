import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { Input } from "semantic-ui-react";
import { useEffect, useState } from "react";
import avatar1 from "../../shared/media/image/ingame_Img_user_01.png";
import avatar2 from "../../shared/media/image/ingame_Img_user_02.png";
import avatar3 from "../../shared/media/image/ingame_Img_user_03.png";
import avatar4 from "../../shared/media/image/ingame_Img_user_04.png";
import avatar5 from "../../shared/media/image/ingame_Img_user_05.png";
import avatar6 from "../../shared/media/image/ingame_Img_user_06.png";
import {
  addNotificationMessage,
  updateUser,
  updateUserPassword,
  createRoom,
  joinRoom,
} from "../../actions";
import { Modal } from "semantic-ui-react";
import { motion } from "framer-motion";
import axios from "../../shared/axios/axios";
import socket from "../../shared/socket/socket"
const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
const BackLobby = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  return (
    <div
      className="back-lobby"
      onClick={() => {
        sound && playBtnClickAudio();
        history.push("/lobby");
      }}
    >
      <div className="back-lobby-icon"></div>
    </div>
  );
};

const Rooms = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const dispatch = useDispatch();
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const user = useSelector((state) => state.user);
  // const room = useSelector((state) => state.room);
  const { id, username, email, gender, avatar, wins } = user;

  const [state, setState] = useState({
    searchKey: "",
  });
  const handleOnChangeSearchBox = (e) => {
    setState({ ...state, searchKey: e.target.value });
  };
  const [modal, setModal] = useState({
    infoUser: false,
    setAvatar: false,
  });
  const [rooms, setRooms] = useState([]);
  const [currentDataUser, setCurrentDataUser] = useState({
    username,
    email,
    gender,
    avatar,
  });
  const [changePasswordInfo, setChangePasswordInfo] = useState({
    openForm: false,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
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

  const handleSubmitInfoChange = () => {
    const { email, gender, avatar } = currentDataUser;
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
    if (email.length < 0) {
      dispatch(addNotificationMessage("Please fill info!", true));
    } else if (!validEmail) {
      dispatch(addNotificationMessage("Email not valid!", true));
    } else {
      dispatch(updateUser({ email, gender, avatar }));
    }
  };
  const handleInputPasswordChange = (e) => {
    setChangePasswordInfo({
      ...changePasswordInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitPassordChange = () => {
    const { oldPassword, newPassword, confirmNewPassword } = changePasswordInfo;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      dispatch(addNotificationMessage("Please fill info!", true));
    } else if (newPassword.length < 8) {
      dispatch(
        addNotificationMessage(
          "New password should be more than 8 characters!",
          true
        )
      );
    } else if (newPassword !== confirmNewPassword) {
      dispatch(addNotificationMessage("Confirm password not correct", true));
    } else {
      dispatch(updateUserPassword({ oldPassword, newPassword }));
    }
  };
  const handleCreateRoom = () => {
    dispatch(createRoom());
  };
  useEffect(() => {
    const { searchKey } = state;
    const data = JSON.stringify({
      rid: searchKey,
    });
    axios
      .post("/findroom", data)
      .then((res) => {
        const data = res.data;
        setRooms(data);
      })
      .catch((error) => {
        dispatch(addNotificationMessage(error.message, true));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchKey]);
  return (
    <div className="rooms">
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
                  border: "3px solid #f7ae39",
                }}
              ></div>
            </div>
            <div>
              {changePasswordInfo.openForm ? (
                <>
                  <div>
                    Old Password:{" "}
                    <input
                      className="input-modal"
                      name="oldPassword"
                      type="password"
                      onChange={handleInputPasswordChange}
                      value={changePasswordInfo.oldPassword}
                    />
                  </div>
                  <div>
                    New Password:{" "}
                    <input
                      className="input-modal"
                      name="newPassword"
                      type="password"
                      onChange={handleInputPasswordChange}
                      value={changePasswordInfo.newPassword}
                    />
                  </div>
                  <div>
                    Old Password:{" "}
                    <input
                      className="input-modal"
                      name="confirmNewPassword"
                      type="password"
                      onChange={handleInputPasswordChange}
                      value={changePasswordInfo.confirmNewPassword}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    Email:{" "}
                    <input
                      className="input-modal"
                      type="email"
                      onChange={(e) => {
                        let value = e.target.value.replace(" ", "");
                        // eslint-disable-next-line no-control-regex
                        const re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
                        value = value.replace(re, "");
                        setCurrentDataUser({
                          ...currentDataUser,
                          email: value,
                        });
                      }}
                      value={currentDataUser.email}
                    />
                  </div>
                  <div
                    onClick={() =>
                      setCurrentDataUser({
                        ...currentDataUser,
                        gender: !currentDataUser.gender,
                      })
                    }
                  >
                    Gender: {currentDataUser.gender ? "Male" : "Female"}
                  </div>
                  <div>Wins: {wins}</div>
                </>
              )}

              <div
                onClick={() =>
                  setChangePasswordInfo({
                    ...changePasswordInfo,
                    openForm: !changePasswordInfo.openForm,
                  })
                }
              >
                {changePasswordInfo.openForm ? "Back" : "Change Password ?"}
              </div>
            </div>
          </div>
          <div className="modal-username-and-id">
            <div>{username}</div>
            <div>ID:{id}</div>
          </div>
        </div>
        <div className="modal-foot">
          <button
            onClick={
              changePasswordInfo.openForm
                ? handleSubmitPassordChange
                : handleSubmitInfoChange
            }
          >
            Submit
          </button>
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
                  currentDataUser.avatar === 1 ? "5px solid #f7ae39" : "none",
              }}
              onClick={() => setAvatar(1)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar2})`,
                border:
                  currentDataUser.avatar === 2 ? "5px solid #f7ae39" : "none",
              }}
              onClick={() => setAvatar(2)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar3})`,
                border:
                  currentDataUser.avatar === 3 ? "5px solid #f7ae39" : "none",
              }}
              onClick={() => setAvatar(3)}
            ></div>
          </div>{" "}
          <div className="avatar-container">
            <div
              style={{
                backgroundImage: `url(${avatar4})`,
                border:
                  currentDataUser.avatar === 4 ? "5px solid #f7ae39" : "none",
              }}
              onClick={() => setAvatar(4)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar5})`,
                border:
                  currentDataUser.avatar === 5 ? "5px solid #f7ae39" : "none",
              }}
              onClick={() => setAvatar(5)}
            ></div>
            <div
              style={{
                backgroundImage: `url(${avatar6})`,
                border:
                  currentDataUser.avatar === 6 ? "5px solid #f7ae39" : "none",
              }}
              onClick={() => setAvatar(6)}
            ></div>
          </div>
        </div>
        <div className="modal-foot">
          <button onClick={handleSubmitInfoChange}>Submit</button>
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
      <BackLobby />
      <div className="rooms-control">
        <div className="find-box">
          <Input
            size="big"
            icon="search"
            value={state.searchKey}
            placeholder="Find room..."
            onChange={handleOnChangeSearchBox}
          ></Input>
        </div>
        <button className="create-box" onClick={handleCreateRoom}>
          Create
        </button>
        <button className="quickplay-box">Quick Play</button>
      </div>
      <div className="rooms-main">
        <div className="row rooms-title">
          <div>Room ID</div>
          <div>Status</div>
          <div>Number player</div>
        </div>
        <div className="rooms-container">
          {rooms &&
            rooms.map((room) => (
              <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                }}
                key={room.roomId}
              >
                <div
                  className="row rooms-item"
                  onClick={() => {
                    dispatch(joinRoom(room.roomId));
                  }}
                >
                  <div>{room.roomId}</div>
                  <div>{room.status ? "Playing..." : "Waiting..."}</div>
                  <div>{room.totalUser}/4 players</div>
                </div>
              </motion.div>
            ))}
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
    </div>
  );
};
export default Rooms;
