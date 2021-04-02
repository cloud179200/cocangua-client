import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Introduce from "./components/Introduce/Introduce";
import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import introAudio from "./shared/media/audio/intro.mp3";
import Main from "./components/Main/Main";
import { useEffect } from "react";
import { addNotificationMessage, loadUser, removeUser } from "./actions";
import NotificationMessage from "./shared/notificationMessenger/NotificationMessenger";
import {io} from "socket.io-client";
const App = () => {
  const { music } = useSelector((state) => state.audioControl);
  const { messages } = useSelector((state) => state.notificationMessage);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const socket = io.connect("http://localhost:8080");
  // console.log(socket);

  const messagesRender = [...messages].map((message) => (
    <NotificationMessage
      key={message.id}
      idMessage={message.id}
      content={message.content}
      error={message.error}
    />
  ));

  useEffect(() => {
    const token = localStorage.getItem("token_seahorsechessapp");
    if (token) {
      !user && dispatch(loadUser());
      if (user) {
        dispatch(addNotificationMessage("Signin success", false));
        return <Redirect to="/lobby" />;
      }
    } else {
      dispatch(removeUser());
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App" style={{ width: "100%", height: "100vh" }}>
        <Switch>
          <Route path="/hello" component={Introduce} />
          <Route path="/auth" component={Auth} />
          <Route path="/lobby" component={Main} />
          <Route path="*" component={() => <Redirect to="/hello" />} />
        </Switch>
      </div>

      <ReactHowler
        src={introAudio}
        volume={0.2}
        onLoadError={() => console.log("error")}
        onPlay={() => {
          console.log("play music");
        }}
        playing={true}
        mute={music ? false : true}
        loop={true}
      />
      <div className="notification-messages">{messagesRender}</div>
    </BrowserRouter>
  );
};

export default App;
