import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./Main.css";
import Lobby from "./Lobby";
import Rooms from "./Rooms";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationMessage } from "../../actions";
import { useEffect } from "react";

const Main = () => {
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (room) {
      history.push("/board");
    }
  }, [room]);
  useEffect(() => {
    if (user) {
      dispatch(addNotificationMessage("Signin success", false));
    }
  }, []);
  if (!user) {
    return <Redirect to="/auth/signin" />;
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
