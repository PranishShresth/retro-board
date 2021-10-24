import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../interfaces";

interface ItemState {
  items: Item[];
  currentItem: Item | null;
  loading: boolean;
  error: string;
}

const initialState = {
  items: [],
  currentItem: null,
  loading: false,
  error: "",
} as ItemState;

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    loadAllItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
    addItem(state, action) {
      const itemIdx = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIdx === -1) {
        state.items.push(action.payload);
      } else {
        state.items[itemIdx] = action.payload;
      }
    },
    removeFromList(state, action: PayloadAction<Item>) {
      state.items.filter((item) => item._id !== action.payload._id);
    },
    reorderItem(state, action) {
      const { source, destination, item_id, position } = action.payload;
      const itemIdx = state.items.findIndex((s) => s._id === item_id);
      const item = state.items[itemIdx];

      if (source === destination) {
        item.order = position;
      } else {
        const item = state.items[itemIdx];
        item.order = position;
        item.list = destination;
      }
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice;
