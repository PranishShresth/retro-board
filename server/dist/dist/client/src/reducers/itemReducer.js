"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemActions = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    items: [],
    currentItem: null,
    loading: false,
    error: "",
};
const itemSlice = (0, toolkit_1.createSlice)({
    name: "item",
    initialState,
    reducers: {
        loadAllItems(state, action) {
            state.items = action.payload;
        },
        deleteItem(state, action) {
            state.items = state.items.filter((i) => i._id !== action.payload.item_id);
        },
        addItem(state, action) {
            const itemIdx = state.items.findIndex((item) => item._id === action.payload._id);
            if (itemIdx === -1) {
                state.items.push(action.payload);
            }
            else {
                state.items[itemIdx] = action.payload;
            }
        },
        updateItem(state, action) {
            const itemIdx = state.items.findIndex((item) => item._id === action.payload._id);
            state.items[itemIdx] = action.payload;
        },
        removeFromList(state, action) {
            state.items.filter((item) => item._id !== action.payload._id);
        },
        reorderItem(state, action) {
            const { source, destination, item_id, position } = action.payload;
            const itemIdx = state.items.findIndex((s) => s._id === item_id);
            const item = state.items[itemIdx];
            if (source === destination) {
                item.order = position;
            }
            else {
                const item = state.items[itemIdx];
                item.order = position;
                item.list = destination;
            }
        },
    },
});
exports.itemActions = itemSlice.actions;
exports.default = itemSlice;
//# sourceMappingURL=itemReducer.js.map