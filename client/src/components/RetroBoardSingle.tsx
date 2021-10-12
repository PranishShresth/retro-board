import { useCallback, useEffect } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { boardActions } from "../reducers/boardReducer";
import { Container } from "semantic-ui-react";
import { boardSelector, loadingSelector } from "../utils/selectors";
import CreateList from "./CreateList";
import { isPositionChanged, calculateItemPosition } from "../utils/dragndrop";
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

  const onDragStart = useCallback(() => {
    console.log("draggin");
    /*...*/
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!isPositionChanged(source, destination)) return;
      const { position, afterDropDestinationItems } = calculateItemPosition(
        board!,
        source,
        destination,
        draggableId
      );

      dispatch(
        boardActions.updateItems({
          source_list_id: source.droppableId,
          destination_list_id: destination?.droppableId,
          items: afterDropDestinationItems,
          item_id: draggableId,
        })
      );

      dispatch({
        type: "REORDER_ITEM_REQUESTED",
        payload: {
          source_list_id: source.droppableId,
          destination_list_id: destination?.droppableId,
          position: position,
          list_id: destination?.droppableId,
          item_id: draggableId,
        },
      });
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
