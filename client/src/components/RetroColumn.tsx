import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Item } from "../interfaces";
import AddItem from "./AddItem";
import { useSelector } from "react-redux";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { itemsSelector } from "../utils/selectors";

const RetroCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  min-height: 1px;
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

  const listItems = items
    .filter((item) => item.list === list_id)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <RetroCardContainer ref={droppableProvided?.innerRef}>
        {listItems.map((item, index) => {
          return (
            <Draggable draggableId={item._id} index={index} key={item._id}>
              {(provided, snapshot) => (
                <RetroCard
                  provided={provided}
                  snapshot={snapshot}
                  content={item.item_title}
                  item_id={item._id}
                  list_id={list_id}
                />
              )}
            </Draggable>
          );
        })}

        {droppableProvided?.placeholder}
      </RetroCardContainer>
      <BottomListButton>
        <AddItem list_id={list_id} />
      </BottomListButton>
    </>
  );
};

export default RetroColumn;
