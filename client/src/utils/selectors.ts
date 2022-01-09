import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const rootSelector = (state: RootState) => state;

export const boardsSelector = createSelector(
  rootSelector,
  (state) => state.board.boards
);

export const loadingSelector = createSelector(
  rootSelector,
  (state) => state.board.loading
);
export const boardSelector = createSelector(
  rootSelector,
  (state) => state.board.currentBoard
);

export const getBoardLimit = (boardId: string) => {
  return createSelector(
    boardsSelector,
    (boards) => boards.find((board) => board._id === boardId)?.limit
  );
};

// list

export const listSelector = createSelector(rootSelector, (state) => state.list);

export const listsSelector = createSelector(
  listSelector,
  (state) => state.lists
);

export const getListCountsPerBoard = createSelector(
  listSelector,
  (state) => state.lists.length
);

// item

export const itemSelector = createSelector(rootSelector, (state) => state.item);

export const itemsSelector = createSelector(
  itemSelector,
  (state) => state.items
);
