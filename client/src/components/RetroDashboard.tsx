import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSelector } from "../utils/selectors";
import RetroHeader from "./RetroHeader";
import RetroModal from "./Modal";
import { Button, Form } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useForm } from "./hooks/useForm";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import BoardCard from "./BoardCard";
import styled from "styled-components";

const BoardsContainer = styled(Container)`
  padding-top: 50px;
`;

const RetroDashBoard = React.memo(() => {
  const dispatch = useDispatch();
  const { formValues, handleChange } = useForm({
    title: "",
    theme: "",
  });
  const boards = useSelector(boardSelector);

  useEffect(() => {
    dispatch({ type: "FETCH_BOARDS_REQUESTED" });
    console.log("re run effect");
  }, []);

  const handleCreateBoard = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      dispatch({ type: "CREATE_BOARD_REQUESTED", payload: formValues });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RetroHeader />
      <BoardsContainer>
        <Grid columns={3}>
          {boards.map((board) => {
            return (
              <Grid.Column width={4} key={board._id}>
                <BoardCard
                  to={`/board/card-example-link-card`}
                  header={board.title}
                  meta="Friend"
                  description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
                />
              </Grid.Column>
            );
          })}
          <Grid.Column width={4}>
            <RetroModal
              modalTitle="Board Creation"
              triggerName="Create a Board"
            >
              <Form onSubmit={handleCreateBoard}>
                <Form.Field>
                  <label>Board Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    placeholder="Board Title"
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Board Theme</label>
                  <input
                    type="color"
                    name="theme"
                    value={formValues.theme}
                    placeholder="Board Theme"
                    onChange={handleChange}
                  />
                </Form.Field>

                <Button color="instagram" type="submit">
                  Create Board
                </Button>
              </Form>
            </RetroModal>
          </Grid.Column>
        </Grid>
      </BoardsContainer>
    </>
  );
});

export default RetroDashBoard;
