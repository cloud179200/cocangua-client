import { useEffect, useState } from "react";
import "./Game.css";
import Square from "./Square";
import dice1 from "../../shared/media/image/dice1.png";
import dice2 from "../../shared/media/image/dice2.png";
import dice3 from "../../shared/media/image/dice3.png";
import dice4 from "../../shared/media/image/dice4.png";
import dice5 from "../../shared/media/image/dice5.png";
import dice6 from "../../shared/media/image/dice6.png";
import avatar1 from "../../shared/media/image/ingame_Img_user_01.png";
import avatar2 from "../../shared/media/image/ingame_Img_user_02.png";
import avatar3 from "../../shared/media/image/ingame_Img_user_03.png";
import avatar4 from "../../shared/media/image/ingame_Img_user_04.png";
import avatar5 from "../../shared/media/image/ingame_Img_user_05.png";
import avatar6 from "../../shared/media/image/ingame_Img_user_06.png";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import BoardSetting from "./BoardSetting";
import { useHistory } from "react-router";
import { joinRoom, subscribeToRoom } from "../../shared/socket/socket";

const Board = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const places = useSelector((state) => state.placesHorse);
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const [dice, setDice] = useState({
    dice_1: 0,
    dice_2: 0,
  });
  const [control, setControl] = useState({
    currentPlace: null,
    rolling: false,
    chatBox: false,
  });

  //!board control
  const result = {
    red: {
      owner: "username",
      stable: 2,
    },
    blue: {
      owner: "username",
      stable: 2,
    },
    green: {
      owner: "username",
      stable: 2,
    },
    yellow: {
      owner: "username",
      stable: 2,
    },
    addressOrder: [
      {
        order: "pink-1",
        next: "pink-2",
        currentHave: null,
      },
      {
        order: "pink-2",
        next: "pink-3",
        currentHave: null,
      },
      {
        order: "pink-3",
        next: "pink-4",
        currentHave: null,
      },
      {
        order: "pink-4",
        next: "pink-5",
        currentHave: null,
      },
      {
        order: "pink-5",
        next: "pink-6",
        currentHave: null,
      },
      {
        order: "pink-6",
        next: "pink-7",
        currentHave: null,
      },
      {
        order: "pink-7",
        next: "pink-8",
        currentHave: null,
      },
      {
        order: "pink-8",
        next: "pink-9",
        currentHave: null,
      },
      {
        order: "pink-10",
        next: "pink-11",
        currentHave: null,
      },
      {
        order: "pink-11",
        next: "pink-12",
        currentHave: null,
      },
      {
        order: "pink-12",
        next: "pink-13",
        currentHave: null,
      },
      {
        order: "pink-13",
        next: "pink-14",
        currentHave: null,
      },
      {
        order: "pink-14",
        next: "pink-15",
        currentHave: null,
      },
      {
        order: "pink-9",
        next: "green-10",
        currentHave: null,
      },
      {
        order: "green-1",
        next: "green-2",
        currentHave: null,
      },
      {
        order: "green-2",
        next: "green-3",
        currentHave: null,
      },
      {
        order: "green-3",
        next: "green-4",
        currentHave: null,
      },
      {
        order: "green-4",
        next: "green-5",
        currentHave: null,
      },
      {
        order: "green-5",
        next: "green-6",
        currentHave: null,
      },
      {
        order: "green-6",
        next: "green-7",
        currentHave: null,
      },
      {
        order: "green-7",
        next: "green-8",
        currentHave: null,
      },
      {
        order: "green-8",
        next: "green-9",
        currentHave: null,
      },
      {
        order: "green-10",
        next: "green-11",
        currentHave: null,
      },
      {
        order: "green-11",
        next: "green-12",
        currentHave: null,
      },
      {
        order: "green-12",
        next: "green-13",
        currentHave: null,
      },
      {
        order: "green-13",
        next: "green-14",
        currentHave: null,
      },
      {
        order: "green-14",
        next: "green-15",
        currentHave: null,
      },
      {
        order: "green-9",
        next: "yellow-10",
        currentHave: null,
      },
      {
        order: "yellow-1",
        next: "yellow-2",
        currentHave: null,
      },
      {
        order: "yellow-2",
        next: "yellow-3",
        currentHave: null,
      },
      {
        order: "yellow-3",
        next: "yellow-4",
        currentHave: null,
      },
      {
        order: "yellow-4",
        next: "yellow-5",
        currentHave: null,
      },
      {
        order: "yellow-5",
        next: "yellow-6",
        currentHave: null,
      },
      {
        order: "yellow-6",
        next: "yellow-7",
        currentHave: null,
      },
      {
        order: "yellow-7",
        next: "yellow-8",
        currentHave: null,
      },
      {
        order: "yellow-8",
        next: "yellow-9",
        currentHave: null,
      },
      {
        order: "yellow-10",
        next: "yellow-11",
        currentHave: null,
      },
      {
        order: "yellow-11",
        next: "yellow-12",
        currentHave: null,
      },
      {
        order: "yellow-12",
        next: "yellow-13",
        currentHave: null,
      },
      {
        order: "yellow-13",
        next: "yellow-14",
        currentHave: null,
      },
      {
        order: "yellow-14",
        next: "yellow-15",
        currentHave: null,
      },
      {
        order: "yellow-9",
        next: "blue-10",
        currentHave: null,
      },
      {
        order: "blue-1",
        next: "blue-2",
        currentHave: null,
      },
      {
        order: "blue-2",
        next: "blue-3",
        currentHave: null,
      },
      {
        order: "blue-3",
        next: "blue-4",
        currentHave: null,
      },
      {
        order: "blue-4",
        next: "blue-5",
        currentHave: null,
      },
      {
        order: "blue-5",
        next: "blue-6",
        currentHave: null,
      },
      {
        order: "blue-6",
        next: "blue-7",
        currentHave: null,
      },
      {
        order: "blue-7",
        next: "blue-8",
        currentHave: null,
      },
      {
        order: "blue-8",
        next: "blue-9",
        currentHave: null,
      },
      {
        order: "blue-10",
        next: "blue-11",
        currentHave: null,
      },
      {
        order: "blue-11",
        next: "blue-12",
        currentHave: null,
      },
      {
        order: "blue-12",
        next: "blue-13",
        currentHave: null,
      },
      {
        order: "blue-13",
        next: "blue-14",
        currentHave: null,
      },
      {
        order: "blue-14",
        next: "blue-15",
        currentHave: null,
      },
      {
        order: "blue-9",
        next: "pink-10",
        currentHave: null,
      },
    ],
  };
  // console.log(result);
  const getDicePic = (number) => {
    // eslint-disable-next-line default-case
    switch (number) {
      case 1:
        return dice1;
      case 2:
        return dice2;
      case 3:
        return dice3;
      case 4:
        return dice4;
      case 5:
        return dice5;
      case 6:
        return dice6;
    }
  };
  const handleRollClick = () => {
    setControl({ ...control, rolling: !control.rolling });
    const rollingTimer = setTimeout(() => {
      const dice_1 = Math.floor(Math.random() * 6) + 1;
      const dice_2 = Math.floor(Math.random() * 6) + 1;
      setDice({
        dice_1: dice_1,
        dice_2: dice_2,
      });

      setControl({ ...control, rolling: !control.rolling });
      clearTimeout(rollingTimer);
    }, 1000);
  };
  const getAvatarPic = (avatarData) => {
    switch (avatarData) {
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

  //horseMoving
  const MovingHorse = (MoveStep, currentOrder) => {
    if (places && MoveStep > 0) {
      if (Object.keys(places).length === 56) {
        let addressData = result.addressOrder.filter(
          (address) => address.order === currentOrder
        );
        const chessColor = addressData[0].currentHave;
        let next = addressData[0].next;
        let currentPlaceData = {
          order: currentOrder,
          next,
          rect: Object.entries(places).filter(
            ([key, value]) => key === currentOrder
          )[0][1],
        };
        for (let i = 1; i < MoveStep + 2; i++) {
          let { bottom, right } = currentPlaceData.rect;
          console.log(currentPlaceData.rect);
          const timerHorseMove = setTimeout(() => {
            setControl({ ...control, currentPlace: { bottom, right } });
          }, i * 500);
          addressData = result.addressOrder.filter(
            // eslint-disable-next-line no-loop-func
            (address) => address.order === next
          );
          next = addressData[0].next;
          currentPlaceData = {
            order: addressData[0].order,
            next,
            rect: Object.entries(places).filter(
              // eslint-disable-next-line no-loop-func
              ([key, value]) => key === addressData[0].order
            )[0][1],
          };
        }
      }
    }
  };

  useEffect(() => {
    subscribeToRoom((err, data) => {
      console.log(data)
    });
    if (!user) {
      history.push("/auth/signin");
    }
    if (!room) {
      history.push("/lobby/join");
    }
    room && joinRoom(room.id);
  }, [room, places, dice]);

  return (
    <>
      {control.currentPlace && (
        <div
          className="horse"
          style={{
            top: `${control.currentPlace.bottom - 95}px`,
            left: `${control.right - 80}px`,
          }}
        ></div>
      )}
      <div className="board-wrapper">
        <div className="board">
          <div className="pink block-container">
            <div className="booth-container">
              <Square order="pink-10" type="booth" color="pink" />
              <Square order="pink-11" type="booth" color="pink" />
              <Square order="pink-12" type="booth" color="pink" />
              <Square order="pink-13" type="booth" color="pink" />
              <Square order="pink-14" type="booth" color="pink" />
            </div>
            <div className="normal-1-5-container">
              <Square
                order="pink-1"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-2"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-3"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-4"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-5"
                type="normal"
                color="pink"
                wrapper={true}
              />
            </div>
            <div className="normal-6-9-container">
              <Square
                order="pink-6"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-7"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-8"
                type="normal"
                color="pink"
                wrapper={true}
              />
              <Square
                order="pink-9"
                type="normal"
                color="pink"
                wrapper={true}
              />
            </div>
          </div>
          <div className="blue block-container">
            <div className="booth-container">
              <Square order="blue-10" type="booth" color="blue" horse={true} />
              <Square order="blue-11" type="booth" color="blue" />
              <Square order="blue-12" type="booth" color="blue" />
              <Square order="blue-13" type="booth" color="blue" />
              <Square order="blue-14" type="booth" color="blue" />
            </div>
            <div className="normal-1-5-container">
              <Square
                order="blue-1"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-2"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-3"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-4"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-5"
                type="normal"
                color="blue"
                wrapper={true}
              />
            </div>
            <div className="normal-6-9-container">
              <Square
                order="blue-6"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-7"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-8"
                type="normal"
                color="blue"
                wrapper={true}
              />
              <Square
                order="blue-9"
                type="normal"
                color="blue"
                wrapper={true}
              />
            </div>
          </div>
          <div className="green block-container">
            <div className="booth-container">
              <Square order="green-10" type="booth" color="green" />
              <Square order="green-11" type="booth" color="green" />
              <Square order="green-12" type="booth" color="green" />
              <Square order="green-13" type="booth" color="green" />
              <Square order="green-14" type="booth" color="green" />
            </div>
            <div className="normal-1-5-container">
              <Square
                order="green-1"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-2"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-3"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-4"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-5"
                type="normal"
                color="green"
                wrapper={true}
              />
            </div>
            <div className="normal-6-9-container">
              <Square
                order="green-6"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-7"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-8"
                type="normal"
                color="green"
                wrapper={true}
              />
              <Square
                order="green-9"
                type="normal"
                color="green"
                wrapper={true}
              />
            </div>
          </div>
          <div className="yellow block-container">
            <div className="booth-container">
              <Square order="yellow-10" type="booth" color="yellow" />
              <Square order="yellow-11" type="booth" color="yellow" />
              <Square order="yeallow-12" type="booth" color="yellow" />
              <Square order="yellow-13" type="booth" color="yellow" />
              <Square order="yellow-14" type="booth" color="yellow" />
            </div>
            <div className="normal-1-5-container">
              <Square
                order="yellow-1"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-2"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-3"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-4"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-5"
                type="normal"
                color="yellow"
                wrapper={true}
              />
            </div>
            <div className="normal-6-9-container">
              <Square
                order="yellow-6"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-7"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-8"
                type="normal"
                color="yellow"
                wrapper={true}
              />
              <Square
                order="yellow-9"
                type="normal"
                color="yellow"
                wrapper={true}
              />
            </div>
          </div>
        </div>
        {control.rolling ? (
          <div className="dice-rolling"></div>
        ) : (
          <>
            <div
              className="dice-1"
              style={{ backgroundImage: `url(${getDicePic(dice.dice_1)})` }}
            ></div>
            <div
              className="dice-2"
              style={{ backgroundImage: `url(${getDicePic(dice.dice_2)})` }}
            ></div>
          </>
        )}

        <div className="roll-btn" onClick={handleRollClick}></div>
        {(room && room.users.user1) && (
          <div className="user user-1">
            <div
              className="board-avatar"
              style={{
                backgroundImage: `url(${getAvatarPic(room.users.user1.avatar)})`,
              }}
            ></div>
            <div className="username-and-win">
              <div>{room.users.user1.username}</div>
              <div>{room.users.user1.id}</div>
            </div>
          </div>
        )}
        {(room && room.users.user2) && (
          <div className="user user-2">
            <div
              className="board-avatar"
              style={{
                backgroundImage: `url(${getAvatarPic(room.users.user2.avatar)})`,
              }}
            ></div>
            <div className="username-and-win">
              <div>{room.users.user2.username}</div>
              <div>{room.users.user2.id}</div>
            </div>
          </div>
        )}
        {(room && room.users.user3) && (
          <div className="user user-3">
            <div
              className="board-avatar"
              style={{
                backgroundImage: `url(${getAvatarPic(room.users.user3.avatar)})`,
              }}
            ></div>
            <div className="username-and-win">
              <div>{room.users.user3.username}</div>
              <div>{room.users.user3.id}</div>
            </div>
          </div>
        )}
        {(room && room.users.user0) && (
          <div className="user user-4">
            <div
              className="board-avatar"
              style={{
                backgroundImage: `url(${getAvatarPic(room.users.user0.avatar)})`,
              }}
            ></div>
            <div className="username-and-win">
              <div>{room.users.user0.username}</div>
              <div>{room.users.user0.id}</div>
            </div>
          </div>
        )}
        {control.chatBox ? (
          <ChatBox
            chatBoxId="hehe"
            onClick={() => {
              sound && playBtnClickAudio();
              setControl({ ...control, chatBox: !control.chatBox });
            }}
          />
        ) : (
          <div
            className="board-control-btn-wrapper board-chat-box"
            onClick={() =>
              setControl({ ...control, chatBox: !control.chatBox })
            }
          >
            <div className="board-chat-box-in"></div>
          </div>
        )}

        <BoardSetting />
      </div>
    </>
  );
};
export default Board;
