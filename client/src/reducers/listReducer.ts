import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../interfaces";

interface ListState {
  lists: List[];
  currentList: List | null;
  loading: boolean;
  error: string;
}

const initialState = {
  lists: [],
  currentList: null,
  loading: false,
  error: "",
} as ListState;

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    loadAllLists(state, action: PayloadAction<List[]>) {
      state.lists = action.payload;
    },
    updateList(state, action) {
      const list = state.lists.find((l) => l._id === action.payload._id);
      if (!list) {
        return state;
      }
      list.list_title = action.payload.list_title;
    },
    addList(state, action) {
      const listIdx = state.lists.findIndex(
        (list) => list._id === action.payload._id
      );
      console.log(listIdx);
      if (listIdx === -1) {
        console.log("here");
        state.lists.push(action.payload);
      } else {
        state.lists[listIdx] = action.payload;
      }
    },
    removeFromList(state, action: PayloadAction<List>) {
      state.lists.filter((lists) => lists._id !== action.payload._id);
    },
  },
});
export const listActions = listSlice.actions;
export default listSlice;
