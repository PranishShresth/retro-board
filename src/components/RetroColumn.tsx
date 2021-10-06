import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";

const RetroColumnWrapper = styled.div`
  min-width: 250px;
  padding: 8px;
  background: rgb(235, 236, 240);
`;

const RetroColumnHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
const RetroCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface Props {
  columnTitle: string;
  children?: React.ReactNode;
  droppableProvided?: DroppableProvided;
}

const RetroColumn = ({ columnTitle, droppableProvided }: Props) => {
  const mockData = ["hi", "asdsadasdasdasdasd", "en tougrage dasds", "Sadsdas"];
  return (
    <RetroColumnWrapper ref={droppableProvided?.innerRef}>
      <RetroColumnHeader>{columnTitle}</RetroColumnHeader>
      <RetroCardContainer>
        {mockData.map((item, index) => {
          return (
            <Draggable
              draggableId={`draggable-${index}`}
              index={index}
              key={index}
            >
              {(provided, snapshot) => (
                <RetroCard provided={provided} content={item} />
              )}
            </Draggable>
          );
        })}
      </RetroCardContainer>
    </RetroColumnWrapper>
  );
};

export default RetroColumn;
