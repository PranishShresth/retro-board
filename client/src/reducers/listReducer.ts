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
    addList(state, action: PayloadAction<List>) {
      state.lists.push(action.payload);
    },
    removeFromList(state, action: PayloadAction<List>) {
      state.lists.filter((lists) => lists._id !== action.payload._id);
    },
  },
});
export const listActions = listSlice.actions;
export default listSlice;
