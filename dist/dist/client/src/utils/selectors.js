"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsSelector = exports.itemSelector = exports.listsSelector = exports.listSelector = exports.boardSelector = exports.loadingSelector = exports.boardsSelector = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const rootSelector = (state) => state;
exports.boardsSelector = (0, toolkit_1.createSelector)(rootSelector, (state) => state.board.boards);
exports.loadingSelector = (0, toolkit_1.createSelector)(rootSelector, (state) => state.board.loading);
exports.boardSelector = (0, toolkit_1.createSelector)(rootSelector, (state) => state.board.currentBoard);
// list
exports.listSelector = (0, toolkit_1.createSelector)(rootSelector, (state) => state.list);
exports.listsSelector = (0, toolkit_1.createSelector)(exports.listSelector, (state) => state.lists);
// item
exports.itemSelector = (0, toolkit_1.createSelector)(rootSelector, (state) => state.item);
exports.itemsSelector = (0, toolkit_1.createSelector)(exports.itemSelector, (state) => state.items);
//# sourceMappingURL=selectors.js.map