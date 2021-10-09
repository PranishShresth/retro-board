import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSelector } from "../utils/selectors";
import RetroHeader from "./RetroHeader";
import RetroModal from "./Modal";
import { Button, Form } from "semantic-ui-react";
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
        <RetroModal modalTitle="Board Creation" triggerName="Create a Board">
          <Form>
            <Form.Field>
              <label>Board Title</label>
              <input type="text" placeholder="Board Title" />
            </Form.Field>
            <Form.Field>
              <label>Board Theme</label>
              <input type="color" placeholder="Board Theme" />
            </Form.Field>

            <Button color="instagram" type="submit">
              Create Board
            </Button>
          </Form>
        </RetroModal>
      </Container>
    </div>
  );
};

export default RetroDashBoard;
