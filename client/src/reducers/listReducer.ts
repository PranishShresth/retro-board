import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../interfaces";

interface ListState {
  lists: List[];
  list: List | null;
  loading: boolean;
  error: string;
}

const initialState = {
  lists: [],
  list: null,
  loading: false,
  error: "",
} as ListState;

const itemSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList(state, action: PayloadAction<List>) {
      state.lists.push(action.payload);
    },
    removeFromList(state, action: PayloadAction<List>) {
      state.lists.filter((lists) => lists._id !== action.payload._id);
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice;
