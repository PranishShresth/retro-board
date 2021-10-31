import React from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { Box, Stack, Text } from "@chakra-ui/layout";
import {
  Icon,
  IconButton,
  useDisclosure,
  Menu,
  MenuButton,
  Button,
  MenuGroup,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaEllipsisV } from "react-icons/fa";
import EditItem from "./EditItem";

interface Props {
  content: string;
  item_id: string;
  list_id: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const RetroCard = ({ content, item_id, provided, snapshot }: Props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

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
      padding="10px 12px"
      background={snapshot.isDragging ? "rgba(226, 231, 245, 255)" : "white"}
      display="flex"
      minHeight="60px"
      justifyContent="space-between"
      ref={provided.innerRef}
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
            <MenuItem
              onClick={() => {
                dispatch(itemActions.deleteItem({ item_id }));
                dispatch({
                  type: "DELETE_ITEM_REQUESTED",
                  payload: { item_id },
                });
              }}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Box>
  );
};

export default RetroCard;
