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
  (state) => state.board.board
);
