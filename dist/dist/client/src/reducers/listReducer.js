"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listActions = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    lists: [],
    currentList: null,
    loading: false,
    error: "",
};
const listSlice = (0, toolkit_1.createSlice)({
    name: "list",
    initialState,
    reducers: {
        loadAllLists(state, action) {
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
            const listIdx = state.lists.findIndex((list) => list._id === action.payload._id);
            if (listIdx === -1) {
                state.lists.push(action.payload);
            }
            else {
                state.lists[listIdx] = action.payload;
            }
        },
        removeFromList(state, action) {
            state.lists.filter((lists) => lists._id !== action.payload._id);
        },
    },
});
exports.listActions = listSlice.actions;
exports.default = listSlice;
//# sourceMappingURL=listReducer.js.map