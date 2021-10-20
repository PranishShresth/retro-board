import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../interfaces";

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  loading: boolean;
  error: string;
}

const initialState = {
  boards: [],
  currentBoard: null,
  loading: false,
  error: "",
} as BoardState;

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    fetchBoards(state, action) {
      state.boards = action.payload;
    },
    fetchActiveBoard(state, action) {
      state.currentBoard = action.payload;
    },
    createBoard(state, action) {
      state.boards.push(action.payload);
    },
    updateList(state, action) {
      const list = action.payload;

      const boardIdx = state.currentBoard?.lists.findIndex(
        (singleList) => singleList._id === list._id
      );
      state.currentBoard!.lists[boardIdx!] = list;
    },
    updateItems(state, action) {
      const { source_list_id, items, destination_list_id, item_id } =
        action.payload;
      const destList = state.currentBoard?.lists.find(
        (l) => l._id === destination_list_id
      );
      destList!.items = items;
      if (source_list_id !== destination_list_id) {
        const sourcelist = state.currentBoard?.lists.find(
          (l) => l._id === source_list_id
        );
        sourcelist!.items = sourcelist!.items.filter((l) => l._id !== item_id);
      }
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

    updateBoard(state, action) {
      state.currentBoard = action.payload;
    },
    clearBoard(state) {
      state.boards = [];
    },
  },
});
export const boardActions = boardSlice.actions;
export default boardSlice;
