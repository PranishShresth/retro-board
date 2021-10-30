import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardsSelector, loadingSelector } from "../utils/selectors";
import { useForm } from "./hooks/useForm";

import { Grid, Stack } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input, InputGroup, Button, useToast, Box } from "@chakra-ui/react";
import BoardCard from "./BoardCard";
import styled from "styled-components";
import NewModal from "./Modal";
import Loading from "./Loader";

const BoardsContainer = styled.div`
  padding-top: 50px;
  width: 95%;
  margin: 0 auto;
`;

const RetroDashBoard = React.memo(() => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const boards = useSelector(boardsSelector);
  const loading = useSelector(loadingSelector);
  const { formValues, handleChange } = useForm({
    board_title: "",
  });

  useEffect(() => {
    dispatch({ type: "FETCH_BOARDS_REQUESTED" });
  }, [dispatch]);

  const handleCreateBoard = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      if (formValues.board_title.length < 1) {
        return;
      }
      dispatch({ type: "CREATE_BOARD_REQUESTED", payload: formValues });
      toast({
        title: "Board Created",
        description: "We've created your board for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
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
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          justifyContent="center"
          gap={6}
        >
          {boards.map((board) => {
            return (
              <BoardCard
                to={`/board/${board._id}`}
                header={board.board_title}
                boardId={board._id}
              />
            );
          })}
          <Box>
            <NewModal
              modalTitle="Create Board"
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              triggerName="Create new Board"
            >
              <form onSubmit={handleCreateBoard}>
                <Stack spacing={3}>
                  <InputGroup>
                    <Input
                      type="text"
                      name="board_title"
                      value={formValues.board_title}
                      placeholder="Board Title"
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <div>
                    <Button type="submit">Create Board</Button>
                  </div>
                </Stack>
              </form>
            </NewModal>
          </Box>
        </Grid>
      </BoardsContainer>
    </>
  );
});

export default RetroDashBoard;
