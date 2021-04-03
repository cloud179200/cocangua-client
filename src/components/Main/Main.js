import { Switch, Route, Redirect} from "react-router-dom";
import "./Main.css";
import Lobby from "./Lobby";
import Rooms from "./Rooms";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationMessage } from "../../actions";

const Main = () => {
  const user = useSelector((state) => state.user);
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
