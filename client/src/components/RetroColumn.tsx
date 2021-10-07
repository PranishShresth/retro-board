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

interface ColumnData {
  content: string;
  id: number;
}
interface ColumnDetails {
  columnTitle: string;
  columnData: Array<ColumnData>;
}

interface Props {
  columnData: ColumnDetails;
  children?: React.ReactNode;
  droppableProvided?: DroppableProvided;
}

const RetroColumn = ({ columnData, droppableProvided }: Props) => {
  return (
    <RetroColumnWrapper ref={droppableProvided?.innerRef}>
      <RetroColumnHeader>{columnData.columnTitle}</RetroColumnHeader>
      {droppableProvided?.placeholder}
      <RetroCardContainer>
        {columnData.columnData.map((item, index) => {
          return (
            <Draggable
              draggableId={`draggable-${item.id}`}
              index={index}
              key={index}
            >
              {(provided, snapshot) => (
                <RetroCard provided={provided} content={item.content} />
              )}
            </Draggable>
          );
        })}
      </RetroCardContainer>
    </RetroColumnWrapper>
  );
};

export default RetroColumn;
