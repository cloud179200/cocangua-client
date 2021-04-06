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
import diceRolling from "../../shared/media/image/dicerolling.gif";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import BoardSetting from "./BoardSetting";
import { Redirect } from "react-router";
import { removeRoom } from "../../actions";

const Board = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const places = useSelector((state) => state.placesHorse);
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const [dice, setDice] = useState({
    dice_1: Math.floor(Math.random() * 6) + 1,
    dice_2: Math.floor(Math.random() * 6) + 1,
  });
  const [rolling, setRolling] = useState(false);
  const [chatBox, setChatBox] = useState(false);
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
    setRolling(true);
    const rollingTimer = setTimeout(() => {
      const dice_1 = Math.floor(Math.random() * 6) + 1;
      const dice_2 = Math.floor(Math.random() * 6) + 1;

      setDice({
        dice_1: dice_1,
        dice_2: dice_2,
      });
      setRolling(false);
      clearTimeout(rollingTimer);
    }, 2000);
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

  const MovingHorse = (MovePlace) => {
    if (places) {
      let x = 1;
      MovePlace.forEach((pl) => {
        const { bottom, right, width, height } = places[pl];
        const horsemove = setTimeout(() => {
          setCurrentPlace({ bottom, right, width, height });
          clearTimeout(horsemove);
        }, x * 500);
        x += 1;
      });
    }
  };
  const [currentPlace, setCurrentPlace] = useState(null);
  useEffect(() => {
    if (!user) {
      return <Redirect to="/auth/signin" />;
    }
    if (!room) {
      return <Redirect to="/lobby/join" />;
    }
  }, []);
  useEffect(() => {
    MovingHorse([
      "pink-1",
      "pink-2",
      "pink-3",
      "pink-4",
      "pink-5",
      "pink-6",
      "pink-7",
      "pink-8",
      "pink-9",
      "green-10",
      "green-1",
      "green-2",
      "green-3",
      "green-4",
      "green-5",
      "green-6",
      "green-7",
      "green-8",
      "green-9",
    ]);
  }, [places]);
  return (
    <>
      {currentPlace && (
        <div
          className="horse"
          style={{
            top: `${currentPlace.bottom - 80}px`,
            left: `${currentPlace.right - 80}px`,
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
        {rolling ? (
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
        <div className="user user-1">
          <div
            className="board-avatar"
            style={{ backgroundImage: `url(${getAvatarPic(1)})` }}
          ></div>
          <div className="username-and-win">
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="user user-2">
          <div
            className="board-avatar"
            style={{ backgroundImage: `url(${getAvatarPic(1)})` }}
          ></div>
          <div className="username-and-win">
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="user user-3">
          <div
            className="board-avatar"
            style={{ backgroundImage: `url(${getAvatarPic(1)})` }}
          ></div>
          <div className="username-and-win">
            <div>username</div>
            <div>Win</div>
          </div>
        </div>
        <div className="user user-4">
          <div
            className="board-avatar"
            style={{ backgroundImage: `url(${getAvatarPic(1)})` }}
          ></div>
          <div className="username-and-win">
            <div></div>
            <div></div>
          </div>
        </div>
        {chatBox ? (
          <ChatBox
            chatBoxId="hehe"
            owner={null}
            onClick={() => {
              sound && playBtnClickAudio();
              setChatBox(!chatBox);
            }}
          />
        ) : (
          <div
            className="board-control-btn-wrapper board-chat-box"
            onClick={() => setChatBox(!chatBox)}
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
