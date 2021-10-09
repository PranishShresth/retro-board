import RetroHeader from "./components/RetroHeader";
import RetroBoard from "./components/RetroBoard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSelector } from "./utils/selectors";
import { Board } from "./interfaces";

function App() {
  const dispatch = useDispatch();
  const boards = useSelector(boardSelector);
  useEffect(() => {
    dispatch({ type: "FETCH_BOARDS_REQUESTED" });
  }, [dispatch]);

  console.log(boards);
  return (
    <div className="App">
      <RetroHeader />
      <RetroBoard />
    </div>
  );
}

export default App;
