import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    loadAllItems(state, action: PayloadAction<Item[]>) {
      state.items.push(...action.payload);
    },
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    removeFromList(state, action: PayloadAction<Item>) {
      state.items.filter((item) => item._id !== action.payload._id);
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice;
