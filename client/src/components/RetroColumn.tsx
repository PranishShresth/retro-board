import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";
import { Item } from "../interfaces";
import AddItem from "./AddItem";
import { useDispatch, useSelector } from "react-redux";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { itemsSelector } from "../utils/selectors";
import { useState } from "react";
import { Input } from "@chakra-ui/input";
import { useForm } from "./hooks/useForm";
import { listActions } from "../reducers/listReducer";
const RetroColumnWrapper = styled.div`
  width: 300px;
  padding: 8px;
  background: rgb(235, 236, 240);
  height: fit-content;
`;

const RetroColumnHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;

  padding: 12px 14px;
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
  const [editMode, setEditMode] = useState(false);
  const { handleChange, formValues } = useForm({ list_title: title });
  const dispatch = useDispatch();

  const updateList = () => {
    if (formValues.list_title.length < 1) {
      return;
    }
    dispatch({
      type: "UPDATE_LIST_REQUESTED",
      payload: { list_id, ...formValues },
    });
    dispatch(listActions.updateList({ _id: list_id, ...formValues }));
    setEditMode(false);
  };
  const handleSubmit = (ev: React.KeyboardEvent | React.FocusEvent) => {
    try {
      const { key } = ev as React.KeyboardEvent<HTMLInputElement>;
      if (key === "Enter") {
        return updateList();
      }

      // updateList();
    } catch (err) {}
  };

  const listItems = items
    .filter((item) => item.list === list_id)
    .sort((a, b) => a.order - b.order);

  return (
    <RetroColumnWrapper ref={droppableProvided?.innerRef}>
      {editMode ? (
        <Input
          autoFocus
          fontWeight="bold"
          variant="filled"
          placeholder="List Title"
          name="list_title"
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleSubmit}
          value={formValues.list_title}
        />
      ) : (
        <RetroColumnHeader onClick={() => setEditMode(true)}>
          {title}
        </RetroColumnHeader>
      )}

      <RetroCardContainer>
        {listItems.map((item, index) => {
          return (
            <Draggable draggableId={item._id} index={index} key={item._id}>
              {(provided, snapshot) => (
                <RetroCard
                  provided={provided}
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
    </RetroColumnWrapper>
  );
};

export default RetroColumn;
