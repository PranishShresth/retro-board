import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { CardDescription, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";

const StyledCard = styled.div`
  padding: 8px;
  min-height: 32px;
  background: white;
  display: flex;
`;

const CardContent = styled(CardDescription)`
  font-size: 15px;
  flex: 1;
`;

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
    <StyledCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <CardContent>{content}</CardContent>
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
    </StyledCard>
  );
};

export default RetroCard;
