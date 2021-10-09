import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSelector } from "../utils/selectors";
import RetroHeader from "./RetroHeader";
import RetroModal from "./Modal";
import { Container } from "semantic-ui-react";

import styled from "styled-components";

const RetroDashBoard = () => {
  const dispatch = useDispatch();
  const boards = useSelector(boardSelector);
  useEffect(() => {
    // dispatch({ type: "FETCH_BOARDS_REQUESTED" });
  }, [dispatch]);

  return (
    <div>
      <RetroHeader />
      <Container>
        <RetroModal />
      </Container>
    </div>
  );
};

export default RetroDashBoard;
