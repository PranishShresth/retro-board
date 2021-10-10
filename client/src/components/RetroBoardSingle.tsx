import React, { useCallback, useEffect } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container } from "semantic-ui-react";
import { boardSelector, loadingSelector } from "../utils/selectors";
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
  const dispatch = useDispatch();
  const params = useParams<BoardParam>();
  const board = useSelector(boardSelector);
  const loading = useSelector(loadingSelector);

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
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!destination) {
        return;
      }
      if (source.droppableId === destination.droppableId) {
        console.log(board);
        const currentlist = board?.lists.find(
          (list) => list._id === destination.droppableId
        );

        console.log(currentlist);
        const currentItems = currentlist!.items;

        const currentItemIdx = currentItems.findIndex(
          (x) => x._id === draggableId
        );

        console.log(currentItemIdx - 1, currentItemIdx + 1);
        const prevItem = currentItems[currentItemIdx - 1]?.order;
        const currItem = currentItems[currentItemIdx]._id;
        const nextItem = currentItems[currentItemIdx + 1]?.order;
        // prev_item_order, curr_item, next_item_order

        dispatch({
          type: "REORDER_ITEM_REQUESTED",
          payload: {
            prev_item_order: prevItem,
            curr_item: currItem,
            next_item_order: nextItem,
            list_id: destination.droppableId,
          },
        });
        console.log("here", prevItem, currItem, nextItem);
        // board?.lists.find((list) => list);
      }
    },
    [board, dispatch]
  );

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
