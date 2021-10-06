import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: 8px;
  background: white;
`;

const CardContent = styled.div`
  font-size: 15px;
`;

interface Props {
  content: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
}

const RetroCard = ({ content, provided }: Props) => {
  return (
    <StyledCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <CardContent>{content}</CardContent>
    </StyledCard>
  );
};

export default RetroCard;
