import { useCallback, useEffect, useContext } from "react";
import RetroColumn from "./RetroColumn";
import styled, { css } from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  loadingSelector,
  listsSelector,
  itemsSelector,
  getListCountsPerBoard,
} from "../utils/selectors";
import { isPositionChanged, calculateItemPosition } from "../utils/dragndrop";
import Loading from "./Loader";
import { itemActions } from "../reducers/itemReducer";
import RetroColumnListHeader from "./RetroColumnHeader";
import { Box } from "@chakra-ui/layout";
import { SocketContext } from "../context/SocketContext";
import RetroBoardHeader from "./RetroBoardHeader";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
  bottom: 0;
  left: 0;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  padding-left: 24px;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-user-select: none;
  user-select: none;
`;

const RetroColumnWrapper = styled.div<{ listCount: number }>`
  ${({ listCount }) =>
    listCount &&
    css`
      width: ${listCount > 5 ? "300px" : "100%"};
    `}
  height:100%;
  min-width: 300px;
  max-width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const FlexBox = styled(Box)<{ listCount: number }>`
  ${({ listCount }) =>
    css`
      flex: ${listCount < 5 ? 100 / listCount : 100};
    `}
`;
const RetroBoardCanvas = styled.div`
  position: relative;
  flex-grow: 1;
  width: 95%;
  margin: 0 auto;
`;
interface BoardParam {
  boardId: string;
}
export default function RetroBoardSingle() {
  const dispatch = useDispatch();
  const params = useParams<BoardParam>();
  const lists = useSelector(listsSelector);
  const { socket } = useContext(SocketContext);

  const currentBoardLists = lists.filter((l) => l.board === params.boardId);
  const items = useSelector(itemsSelector);
  const listCount = useSelector(getListCountsPerBoard);

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
      if (!destination) return;
      const position = calculateItemPosition(
        items,
        source,
        destination,
        draggableId
      );
      const payload = {
        source: source.droppableId,
        destination: destination.droppableId,
        position: position,
        item_id: draggableId,
      };
      dispatch(itemActions.reorderItem(payload));

      socket?.emit("REORDER_ITEM", payload);

      dispatch({
        type: "REORDER_ITEM_REQUESTED",
        payload,
      });
    },
    [items, dispatch, socket]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RetroBoardHeader />
      <RetroBoardCanvas>
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <ColumnsWrapper>
            {currentBoardLists?.map((list) => {
              return (
                <FlexBox key={list._id} listCount={listCount}>
                  <RetroColumnWrapper listCount={listCount}>
                    <RetroColumnListHeader
                      list_id={list._id}
                      list_title={list.list_title}
                    />
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
                  </RetroColumnWrapper>
                </FlexBox>
              );
            })}
          </ColumnsWrapper>
        </DragDropContext>
      </RetroBoardCanvas>
    </>
  );
}
