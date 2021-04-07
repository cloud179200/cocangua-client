import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Introduce from "./components/Introduce/Introduce";
import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import introAudio from "./shared/media/audio/intro.mp3";
import Main from "./components/Main/Main";
import { useEffect, useState } from "react";
import { loadUser, removeUser } from "./actions";
import NotificationMessage from "./shared/notificationMessenger/NotificationMessenger";
import PageLoading from "./components/shared/PageLoading";
import Board from "./components/Game/Board";
import { disconnectSocket, initiateSocket } from "./shared/socket/socket";
import Admin from "./components/Admin/Admin";
const App = () => {
  const { music } = useSelector((state) => state.audioControl);
  const { messages } = useSelector((state) => state.notificationMessage);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);
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
    const timeLoadingPage = setTimeout(() => {
      setPageLoading(false);
      if (token) {
        !user && dispatch(loadUser());
        if (user) {
          if(user.username === "admin") return <Redirect to="admin" />
          initiateSocket();
          return <Redirect to="/lobby" />;
        }
      } else {
        dispatch(removeUser());
      }
    }, 2000);
    return () => {
      !localStorage.getItem("token_seahorsechessapp") && disconnectSocket();
      clearTimeout(timeLoadingPage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <BrowserRouter>
      {pageLoading ? (
        <PageLoading />
      ) : (
        <>
          <div className="App" style={{ width: "100%", height: "100vh" }}>
            <Switch>
              <Route path="/hello" component={Introduce} />
              <Route path="/auth" component={Auth} />
              <Route path="/lobby" component={Main} />
              <Route path="/board" component={Board} />
              <Route path="/admin" component={Admin} />
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
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
