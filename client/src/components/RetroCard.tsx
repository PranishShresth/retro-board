import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { CardDescription, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { Box, Text } from "@chakra-ui/layout";

const StyledIcon = styled(Icon)`
  cursor: pointer;
`;
interface Props {
  content: string;
  item_id: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
}

const RetroCard = ({ content, item_id, provided }: Props) => {
  const dispatch = useDispatch();
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
      <div>
        <StyledIcon name="pencil"></StyledIcon>
        <StyledIcon
          name="trash"
          onClick={() => {
            dispatch(itemActions.deleteItem({ item_id }));
            dispatch({ type: "DELETE_ITEM_REQUESTED", payload: { item_id } });
          }}
        ></StyledIcon>
      </div>
    </Box>
  );
};

export default RetroCard;
