import { Switch, Route, Redirect } from "react-router-dom";
import "./Main.css";
import Lobby from "./Lobby";
import Rooms from "./Rooms";


const Main = () => {
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
