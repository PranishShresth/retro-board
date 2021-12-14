"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardActions = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    boards: [],
    currentBoard: null,
    loading: false,
    error: "",
};
const boardSlice = (0, toolkit_1.createSlice)({
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
        deleteBoard(state, action) {
            state.boards = state.boards.filter((board) => board._id !== action.payload._id);
        },
        updateBoardDetails(state, action) {
            const id = action.payload._id;
            const board = state.boards.find((board) => board._id === id);
            board.board_title = action.payload.board_title;
        },
        updateBoard(state, action) {
            state.currentBoard = action.payload;
        },
        clearBoard(state) {
            state.boards = [];
        },
    },
});
exports.boardActions = boardSlice.actions;
exports.default = boardSlice;
//# sourceMappingURL=boardReducer.js.map