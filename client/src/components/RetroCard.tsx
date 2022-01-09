import React, { memo, useCallback, useContext } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { Box, Stack, Text } from "@chakra-ui/layout";
import {
  Icon,
  useDisclosure,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import EditItem from "./EditItem";
import { SocketContext } from "../context/SocketContext";
import * as SE from "../context/socketTypes";
import styled from "styled-components";
interface Props {
  content: string;
  item_id: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 1px 3px 1px;
  transition: background 100ms linear;
  border-radius: 5px;
`;
const RetroCard = memo(({ content, item_id, provided, snapshot }: Props) => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteItem = useCallback(() => {
    const payload = { item_id };
    dispatch(itemActions.deleteItem(payload));
    dispatch({
      type: "DELETE_ITEM_REQUESTED",
      payload,
    });
    socket?.emit(SE.DELETE_ITEM, payload);
  }, [dispatch, item_id, socket]);

  if (isOpen) {
    return (
      <EditItem
        item_id={item_id}
        content={content}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }
  return (
    <StyledBox
      padding="5px 12px"
      background={snapshot.isDragging ? "rgba(226, 231, 245, 255)" : "white"}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Text overflowWrap="anywhere">{content}</Text>
      <Stack direction="row">
        <Menu>
          <MenuButton as={Button} background="none !important">
            <Icon as={FaEllipsisV} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Edit</MenuItem>
            <MenuItem onClick={deleteItem}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </StyledBox>
  );
});

export default RetroCard;
