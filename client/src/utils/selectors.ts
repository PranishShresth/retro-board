import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const rootSelector = (state: RootState) => state;

export const boardsSelector = createSelector(
  rootSelector,
  (state) => state.boards
);

export const boardSelector = createSelector(
  rootSelector,
  (state) => state.board
);
