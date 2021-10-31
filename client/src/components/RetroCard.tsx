import React from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Icon, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
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
      // _hover={{
      //   background: "gray.200",
      // }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Text overflowWrap="anywhere">{content}</Text>
      <Stack direction="row">
        <IconButton
          icon={<FaPencilAlt />}
          onClick={onOpen}
          aria-label="Edit item"
        />
        <IconButton
          aria-label="delete-item"
          icon={<FaTrash />}
          onClick={() => {
            dispatch(itemActions.deleteItem({ item_id }));
            dispatch({ type: "DELETE_ITEM_REQUESTED", payload: { item_id } });
          }}
        />
      </Stack>
    </Box>
  );
};

export default RetroCard;
