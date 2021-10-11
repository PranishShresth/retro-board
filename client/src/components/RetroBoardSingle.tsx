import React, { useCallback, useEffect } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { boardActions } from "../reducers/boardReducer";
import { Container } from "semantic-ui-react";
import { boardSelector, loadingSelector } from "../utils/selectors";
import CreateList from "./CreateList";
import Loading from "./Loader";
import { Board, Item, List } from "../interfaces";

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

  const onDragStart = useCallback(() => {
    console.log("draggin");
    /*...*/
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!isPositionChanged(source, destination)) return;
      const { position, mutatedItems } = calculateItemPosition(
        board!,
        source,
        destination,
        draggableId
      );

      dispatch(
        boardActions.updateItems({
          list_id: destination?.droppableId,
          items: mutatedItems,
        })
      );
      console.log(position, mutatedItems);
      // dispatch({
      //   type: "REORDER_ITEM_REQUESTED",
      //   payload: {
      //     position: position.format(),
      //     list_id: destination?.droppableId,
      //     item_id: draggableId,
      //   },
      // });
    },
    [board, dispatch]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <Container>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
const isPositionChanged = (
  source: DraggableLocation,
  destination: DraggableLocation | undefined
) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateItemPosition = (
  board: Board,
  source: DraggableLocation,
  destination: DraggableLocation | undefined,
  droppedItemId: string
) => {
  const { prevItem, nextItem, mutatedItems } = getPrevAndNextItem(
    board,
    source,
    destination,
    droppedItemId
  );
  let position;

  if (!prevItem && !nextItem) {
    position = 1;
  } else if (!prevItem) {
    position = nextItem.order - 1;
  } else if (!nextItem) {
    position = prevItem.order + 1;
  } else {
    position = prevItem.order + (nextItem.order - prevItem.order) / 2;
  }
  return { mutatedItems, position };
};

export const moveItemWithinArray = (
  arr: Item[],
  item: Item | undefined,
  newIndex: number
) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item!);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

const getPrevAndNextItem = (
  board: Board,
  source: DraggableLocation,
  destination: DraggableLocation | undefined,
  droppedItemId: string
) => {
  const currentlist = board?.lists.find(
    (list) => list._id === destination?.droppableId
  );
  const droppedItem = currentlist!.items.find(
    (item) => item._id === droppedItemId
  );

  const sortedItem = [...currentlist!.items].sort((a, b) => a.order - b.order);

  const mutatedItems = moveItemWithinArray(
    sortedItem,
    droppedItem,
    destination!.index
  );
  const prevItem = mutatedItems[destination!.index - 1];
  const nextItem = mutatedItems[destination!.index + 1];

  return { prevItem, nextItem, mutatedItems };
};
