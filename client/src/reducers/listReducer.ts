import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});
export const itemActions = itemSlice.actions;
export default itemSlice;
