import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Introduce from "./components/Introduce/Introduce";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App" style={{width:"100%", height:"auto"}}>
        <Switch>
          <Route path="/hello" component={Introduce} />
          <Route path="/auth" component={Auth} />
          <Route path="*" component={() => <Redirect to="/hello"/>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
