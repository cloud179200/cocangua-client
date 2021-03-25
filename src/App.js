import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Introduce from "./components/Introduce/Introduce";
import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import introAudio from "./shared/media/audio/intro.mp3";
import Main from "./components/Main/Main";
import { Message } from "semantic-ui-react";
import { useEffect } from "react";
import { setNotificationMessage } from "./actions/index";
import { loadInfoUser } from "./actions";
const App = () => {
  const { music } = useSelector((state) => state.audioControl);
  const { message } = useSelector((state) => state.notificationMessage);
  const { username } = useSelector((state) => state.logged);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const auth_token = localStorage.getItem("auth_token");
    history && console.log(history.location.pathname);
    if (auth_token) {
      dispatch(loadInfoUser());
    } else if (!auth_token) {
      dispatch(loadInfoUser());
      if (username && history.location.pathname.indexOf("/lobby") === -1) {
        history.push("/lobby");
      }
      if (!username && history.location.pathname.indexOf("/lobby") !== -1) {
        history.push("/auth/signin");
      }
    }
    const displayMessage = setTimeout(() => {
      dispatch(setNotificationMessage(""));
    }, 5000);
    return () => {
      clearTimeout(displayMessage);
    };
  }, [message, username]);
  return (
    <BrowserRouter>
      <div className="App" style={{ width: "100%", height: "100vh" }}>
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
        {message !== "" && (
          <Message info>
            <Message.Header>Notification</Message.Header>
            <p>{message}</p>
          </Message>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
