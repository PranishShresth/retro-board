import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Item } from "../interfaces";
import AddItem from "./AddItem";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";

const RetroColumnWrapper = styled.div`
  min-width: 250px;
  padding: 8px;
  background: rgb(235, 236, 240);
  height: fit-content;
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
  items: Item[];
  title: string;
  children?: React.ReactNode;
  droppableProvided?: DroppableProvided;
}

const RetroColumn = ({ items, title, droppableProvided }: Props) => {
  return (
    <RetroColumnWrapper ref={droppableProvided?.innerRef}>
      <RetroColumnHeader>{title}</RetroColumnHeader>
      {droppableProvided?.placeholder}
      <RetroCardContainer>
        {items.map((item, index) => {
          return (
            <Draggable draggableId={item._id} index={index} key={index}>
              {(provided, snapshot) => (
                <RetroCard provided={provided} content={item.item_title} />
              )}
            </Draggable>
          );
        })}
        <AddItem />
      </RetroCardContainer>
    </RetroColumnWrapper>
  );
};

export default RetroColumn;
