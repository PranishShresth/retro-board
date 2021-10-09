import "./App.css";
import RetroDashboard from "./components/RetroDashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RetroDashboard} />
        <Route exact path="/board/:boardId" />
      </Switch>
    </Router>
  );
}

export default App;
