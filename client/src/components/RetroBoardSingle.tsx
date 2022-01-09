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
  getBoardLimit,
} from "../utils/selectors";
import CreateList from "./CreateList";
import { isPositionChanged, calculateItemPosition } from "../utils/dragndrop";
import Loading from "./Loader";
import { itemActions } from "../reducers/itemReducer";
import RetroColumnListHeader from "./RetroColumnHeader";
import { Box } from "@chakra-ui/layout";
import { SocketContext } from "../context/SocketContext";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
  padding-top: 30px;
  overflow-x: auto;
  height: calc(100vh - 80px);
`;

const RetroColumnWrapper = styled.div`
  width: 300px;
  max-width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;

  /* height: fit-content; */
`;

const FlexBox = styled(Box)<{ limit: number | undefined }>`
  ${({ limit }) =>
    limit &&
    css`
      flex: ${100 / limit};
    `}
`;
const Container = styled.div`
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
  const boardLimit = useSelector(getBoardLimit(params.boardId));
  console.log(listCount, boardLimit);
  const showListCreation = boardLimit && boardLimit > listCount;
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
    <Container>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <ColumnsWrapper>
          {currentBoardLists?.map((list) => {
            return (
              <FlexBox key={list._id} limit={boardLimit}>
                <RetroColumnWrapper>
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
          {showListCreation && (
            <Box minWidth="300px">
              <CreateList />
            </Box>
          )}
        </ColumnsWrapper>
      </DragDropContext>
    </Container>
  );
}
