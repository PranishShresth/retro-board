import React, { useCallback, useEffect, useState } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container } from "semantic-ui-react";
import { boardSelector } from "../utils/selectors";
import CreateList from "./CreateList";
import Loading from "./Loader";
const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
  padding-top: 30px;
  overflow-x: auto;
  height: calc(100vh - 80px);
`;

interface BoardParam {
  boardId: string;
}
export default function RetroBoardSingle() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams<BoardParam>();
  const board = useSelector(boardSelector);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "FETCH_BOARD_REQUESTED", payload: params.boardId });
    setLoading(false);
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
  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const currentlist = board?.lists.find(
        (list) => list._id === destination.droppableId
      );
      const currentItem = currentlist?.items.findIndex(
        (x) => x._id === draggableId
      );
      board?.lists.find((list) => list);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
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
            <Droppable droppableId={list._id} key={list._id}>
              {(provided) => (
                <RetroColumn
                  droppableProvided={provided}
                  items={list.items}
                  list_id={list._id}
                  title={list.list_title}
                />
              )}
            </Droppable>
          ))}
          <div style={{ minWidth: 250 }}>
            <CreateList />
          </div>
        </ColumnsWrapper>
      </DragDropContext>
    </Container>
  );
}
