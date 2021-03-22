import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import useSound from "use-sound";
import backgroundImage from "../../shared/media/image/background_main.png";
import "./Main.css";

const Main = () => {
  const audioControl = useSelector((state) => state.audioControl);
  const { sound, btnClickAudio } = audioControl;
  const [playBtnClickAudio] = useSound(btnClickAudio);
  const history = useHistory();
  return <div className="main" style={{backgroundImage: `url(${backgroundImage})`}}>WaitingRoom</div>;
};

export default Main;
