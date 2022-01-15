import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";
import AlertDialog from "./AlertDialog";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Icon,
  Text,
  Stack,
  InputGroup,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
import { useForm } from "./hooks/useForm";
import { boardActions } from "../reducers/boardReducer";
interface Props {
  to?: string;
  boardId: string;
  header: string;
}

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoardCard = (props: Props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { formValues, handleChange } = useForm({
    board_title: props.header,
  });

  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const handleDeleteBoard = () => {
    dispatch({
      type: "DELETE_BOARD_REQUESTED",
      payload: props.boardId,
    });
    setdeleteModalOpen(false);
  };

  const handleEditBoard = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      if (formValues.board_title.length < 1) {
        return;
      }
      dispatch({
        type: "UPDATE_BOARD_REQUESTED",
        payload: { _id: props.boardId, ...formValues },
      });
      dispatch(
        boardActions.updateBoardDetails({ _id: props.boardId, ...formValues })
      );
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        padding="10px"
        height="60px"
      >
        <Grid>
          <Link to={props.to ?? ""}>
            <Text fontSize="lg" color="#4b5489" fontWeight="700">
              {props.header}
            </Text>
          </Link>
          <Menu>
            <MenuButton background="none !important">
              <Icon as={FaEllipsisV} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>Edit</MenuItem>
              <MenuItem>Archive</MenuItem>
              <MenuItem onClick={() => setdeleteModalOpen(true)}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Grid>
      </Box>

      <Modal
        modalTitle="Edit Board Details"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <form onSubmit={handleEditBoard}>
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
              <Button type="submit">Update board</Button>
            </div>
          </Stack>
        </form>
      </Modal>
      <AlertDialog
        isOpen={deleteModalOpen}
        onClose={() => setdeleteModalOpen(false)}
        onClick={handleDeleteBoard}
        title="Delete Board"
      />
    </>
  );
};

export default BoardCard;
