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
interface Props {
  content: string;
  item_id: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const RetroCard = memo(({ content, item_id, provided, snapshot }: Props) => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteItem = useCallback(() => {
    dispatch(itemActions.deleteItem({ item_id }));
    dispatch({
      type: "DELETE_ITEM_REQUESTED",
      payload: { item_id },
    });
    socket?.emit(SE.DELETE_ITEM, { item_id });
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
    <Box
      padding="5px 12px"
      background={snapshot.isDragging ? "rgba(226, 231, 245, 255)" : "white"}
      display="flex"
      justifyContent="space-between"
      ref={provided.innerRef}
      alignItems="center"
      transition="background 100ms linear"
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
    </Box>
  );
});

export default RetroCard;
