import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import { Input, Button } from "semantic-ui-react";
import { useState } from "react";

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
  const [state, setState] = useState({
    searchKey: "",
    tab: 1,
  });
  const handleOnChangeSearchBox = (e) => {
    setState({ ...state, searchKey: e.target.value });
  };

  return (
    <div className="rooms">
      <div className="main-head">
        <div className="name-box">
          <div className="main-avatar"></div>
          <div className="main-username">DancePhug waifu</div>
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
        <div className="create-box">
          <Button color="teal">Create</Button>
        </div>
        <div className="quickplay-box">
          <Button color="green">Quick Play</Button>
        </div>
      </div>
      <div className="rooms-main">
        <div className="title-row">
          <div>Room ID</div>
          <div>Room Name</div>
          <div>Number player</div>
        </div>
        <div className="item-row">
          <div>123456</div>
          <div>testing</div>
          <div>4/4 players</div>
        </div>
        <div className="item-row">
          <div>123456</div>
          <div>testing</div>
          <div>4/4 players</div>
        </div>
        <div className="item-row">
          <div>123456</div>
          <div>testing</div>
          <div>4/4 players</div>
        </div>
        <div className="item-row">
          <div>123456</div>
          <div>testing</div>
          <div>4/4 players</div>
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
