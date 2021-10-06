import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Draggable } from "react-beautiful-dnd";

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
}

const RetroColumn = React.forwardRef<HTMLDivElement, Props>(
  ({ columnTitle }, ref) => {
    const mockData = [
      "hi",
      "asdsadasdasdasdasd",
      "en tougrage dasds",
      "Sadsdas",
    ];
    return (
      <RetroColumnWrapper ref={ref}>
        <RetroColumnHeader>{columnTitle}</RetroColumnHeader>
        <RetroCardContainer>
          {mockData.map((item) => {
            return (
              <Draggable draggableId="draggable-1" index={0}>
                {(provided, snapshot) => (
                  <RetroCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    content={item}
                  />
                )}
              </Draggable>
            );
          })}
        </RetroCardContainer>
      </RetroColumnWrapper>
    );
  }
);

export default RetroColumn;
