import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../interfaces";

interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string;
}

// const createBoard = createAction<Board>("board/create");
// const deleteBoard = createAction<Board>("board/delete");
// const updateBoardDetails = createAction<Board>("board/update");

const initialState = { boards: [], loading: false, error: "" } as BoardState;

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    fetchBoards(state, action) {
      state.boards.push(action.payload);
    },
    createBoard(state, action) {
      state.boards.push(action.payload);
    },
    deleteBoard(state, action) {
      state.boards = state.boards.filter(
        (board) => board._id !== action.payload._id
      );
    },
    updateBoardDetails(state, action) {
      const id = action.payload._id;
      const board = state.boards.find((board) => board._id === id);
      board!.title = action.payload.title;
    },
  },
});

export default boardSlice;
