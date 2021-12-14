import "./App.css";
import RetroHome from "./pages/RetroHome";
import RetroBoard from "./pages/RetroBoard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RetroHome} />
        <Route exact path="/board/:boardId" component={RetroBoard} />
      </Switch>
    </Router>
  );
}

export default App;
