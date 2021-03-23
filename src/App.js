import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Introduce from "./components/Introduce/Introduce";
import ReactHowler from "react-howler";
import { useSelector } from "react-redux";
import introAudio from "./shared/media/audio/intro.mp3";
import Main from "./components/Main/Main";
const App = () => {
  const { music } = useSelector((state) => state.audioControl);

  return (
    <BrowserRouter>
      <div className="App" style={{ width: "100%", height: "auto" }}>
        <Switch>
          <Route path="/hello" component={Introduce} />
          <Route path="/auth" component={Auth} />
          <Route path="/lobby" component={Main} />
          <Route path="*" component={() => <Redirect to="/hello" />} />
        </Switch>
        <ReactHowler
          src={introAudio}
          volume={0.2}
          onLoadError={() => console.log("error")}
          onPlay={() => {
            console.log("play");
          }}
          playing={true}
          mute={music ? false : true}
          loop={true}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
