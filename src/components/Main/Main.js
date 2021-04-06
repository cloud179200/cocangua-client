import { Switch, Route, Redirect } from "react-router-dom";
import "./Main.css";
import Lobby from "./Lobby";
import Rooms from "./Rooms";
import { useSelector } from "react-redux";

const Main = () => {
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  if (!user) {
    return <Redirect to="/auth/signin" />;
  }
  if (user && room) {
    return <Redirect to="/board" />;
  }
  return (
    <div className="main">
      <Switch>
        <Route path="/lobby/join" component={Rooms} />
        <Route path="/" component={Lobby} />
        <Route path="*" component={() => <Redirect to="/lobby" />} />
      </Switch>
    </div>
  );
};

export default Main;
