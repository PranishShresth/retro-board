import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Item } from "../interfaces";
import AddItem from "./AddItem";
import { useSelector } from "react-redux";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { itemsSelector } from "../utils/selectors";

const RetroColumnWrapper = styled.div`
  min-width: 250px;
  padding: 8px;
  background: rgb(235, 236, 240);
  height: fit-content;
`;

const RetroColumnHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  padding: 12px 0;
`;
const RetroCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
`;

const BottomListButton = styled.div`
  margin-top: 10px;
`;

interface Props {
  items: Item[];
  list_id: string;
  title: string;
  children?: React.ReactNode;
  droppableProvided?: DroppableProvided;
}

const RetroColumn = ({ list_id, title, droppableProvided }: Props) => {
  const items = useSelector(itemsSelector);
  console.log(items);
  const listItems = items
    .filter((item) => item.list === list_id)
    .sort((a, b) => a.order - b.order);

  return (
    <RetroColumnWrapper ref={droppableProvided?.innerRef}>
      <RetroColumnHeader>{title}</RetroColumnHeader>
      <RetroCardContainer>
        {listItems.map((item, index) => {
          return (
            <Draggable draggableId={item._id} index={index} key={item._id}>
              {(provided, snapshot) => (
                <RetroCard provided={provided} content={item.item_title} />
              )}
            </Draggable>
          );
        })}

        {droppableProvided?.placeholder}
      </RetroCardContainer>
      <BottomListButton>
        <AddItem list_id={list_id} />
      </BottomListButton>
    </RetroColumnWrapper>
  );
};

export default RetroColumn;
