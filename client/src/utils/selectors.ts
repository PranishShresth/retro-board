import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const rootSelector = (state: RootState) => state;

export const boardSelector = createSelector(
  rootSelector,
  (state) => state.boards
);
