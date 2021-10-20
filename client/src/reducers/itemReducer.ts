import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../interfaces";

interface ItemState {
  items: Item[];
  item: Item | null;
  loading: boolean;
  error: string;
}

const initialState = {
  items: [],
  item: null,
  loading: false,
  error: "",
} as ItemState;

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
});
export const itemActions = itemSlice.actions;
export default itemSlice;
