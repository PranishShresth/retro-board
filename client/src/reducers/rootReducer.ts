import { createAction, createReducer } from "@reduxjs/toolkit";

interface Board {
  title: string;
  _id: string;
}
interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string;
}

const createBoard = createAction<Board>("board/create");
const deleteBoard = createAction<Board>("board/delete");
const updateBoardDetails = createAction<Board>("board/update");

const initialState = { boards: [], loading: false, error: "" } as BoardState;

export const boardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createBoard, (state, action) => {
      state.boards.push(action.payload);
    })
    .addCase(deleteBoard, (state, action) => {
      state.boards.filter((board) => board._id !== action.payload._id);
    })
    .addCase(updateBoardDetails, (state, action) => {
      const id = action.payload._id;
      const board = state.boards.find((board) => board._id === id);
      board!.title = action.payload.title;
    });
});
