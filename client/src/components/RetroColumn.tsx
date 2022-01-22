import React, { memo, useMemo } from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Item } from "../interfaces";
import AddItem from "./Item/AddItem";
import { useSelector } from "react-redux";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { itemsSelector } from "../utils/selectors";

const RetroCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1px;
  min-height: 2px;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 10%);
  }
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

const RetroColumn = memo(({ list_id, droppableProvided }: Props) => {
  const items = useSelector(itemsSelector);

  const memoizedListItems = useMemo(() => {
    return items
      .filter((item) => item.list === list_id)
      .sort((a, b) => a.order - b.order);
  }, [items, list_id]);

  return (
    <>
      <RetroCardContainer ref={droppableProvided?.innerRef}>
        {memoizedListItems.map((item, index) => {
          return (
            <Draggable draggableId={item._id} index={index} key={item._id}>
              {(provided, snapshot) => (
                <RetroCard
                  provided={provided}
                  snapshot={snapshot}
                  item={item}
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
});

export default RetroColumn;
