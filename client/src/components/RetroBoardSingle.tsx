import React, { useCallback, useEffect } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container } from "semantic-ui-react";
import { boardSelector } from "../utils/selectors";
import RetroModal from "./Modal";
import { Button, Form } from "semantic-ui-react";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
`;

interface BoardParam {
  boardId: string;
}
export default function RetroBoardSingle() {
  const dispatch = useDispatch();
  const params = useParams<BoardParam>();
  const board = useSelector(boardSelector);

  useEffect(() => {
    dispatch({ type: "FETCH_BOARD_REQUESTED", payload: params.boardId });
  }, [params.boardId, dispatch]);

  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    console.log("draggin");
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    /*...*/
  }, []);

  return (
    <Container>
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <ColumnsWrapper>
          {board?.lists.map((list) => (
            <Droppable droppableId={`droppable-${list._id}`}>
              {(provided, snapshot) => (
                <RetroColumn
                  droppableProvided={provided}
                  items={list.items}
                  title={list.list_title}
                />
              )}
            </Droppable>
          ))}
        </ColumnsWrapper>
      </DragDropContext>
    </Container>
  );
}
