import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardsSelector, loadingSelector } from "../utils/selectors";
import RetroModal from "./Modal";
import { Button, Form } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { useForm } from "./hooks/useForm";

import { Grid } from "semantic-ui-react";
import BoardCard from "./BoardCard";
import styled from "styled-components";
import { boardActions } from "../reducers/boardReducer";
import Loading from "./Loader";

const BoardsContainer = styled(Container)`
  padding-top: 50px;
`;

const RetroDashBoard = React.memo(() => {
  const dispatch = useDispatch();
  const { formValues, handleChange } = useForm({
    title: "",
    theme: "",
  });
  const boards = useSelector(boardsSelector);
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch({ type: "FETCH_BOARDS_REQUESTED" });
  }, []);

  const handleCreateBoard = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();

      dispatch({ type: "CREATE_BOARD_REQUESTED", payload: formValues });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <BoardsContainer>
        <Grid>
          {boards.map((board) => {
            return (
              <Grid.Column mobile={16} tablet={8} computer={4} key={board._id}>
                <BoardCard to={`/board/${board._id}`} header={board.title} />
              </Grid.Column>
            );
          })}
          <Grid.Column mobile={16} tablet={8} computer={4}>
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
