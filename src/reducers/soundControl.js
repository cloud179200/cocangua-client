
import btnAudio from "../shared/media/audio/buttonclick.mp3";
import introAudio from "../shared/media/audio/intro.mp3";


const audioControlReducer = (state = {
  music: true,
  sound: true,
  introAudio: introAudio,
  btnClickAudio: btnAudio,
}, action) => {
  switch (action.type) {
    case "switch/music":
      return { ...state, music: !state.music };
    case "switch/sound":
      return { ...state, sound: !state.sound };
    default:
      return state;
  }
};

export default audioControlReducer;
