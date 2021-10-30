import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import EditItem from "./EditItem";

interface Props {
  content: string;
  item_id: string;
  list_id: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
}

const RetroCard = ({ content, item_id, provided, list_id }: Props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (isOpen) {
    return <EditItem content={content} isOpen={isOpen} onClose={onClose} />;
  }
  return (
    <Box
      padding="10px 12px"
      background="white"
      display="flex"
      justifyContent="space-between"
      ref={provided.innerRef}
      transition="background 100ms linear"
      _hover={{
        background: "gray.200",
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Text overflowWrap="anywhere">{content}</Text>
      <Stack direction="row">
        <Icon as={FaPencilAlt} cursor="pointer" onClick={onOpen} />
        <Icon
          cursor="pointer"
          as={FaTrash}
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
