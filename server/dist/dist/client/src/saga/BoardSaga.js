"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../utils/api");
const boardReducer_1 = require("../reducers/boardReducer");
const itemReducer_1 = require("../reducers/itemReducer");
const listReducer_1 = require("../reducers/listReducer");
const types_1 = require("../utils/types");
function* getBoards() {
    try {
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(true));
        const result = yield (0, effects_1.call)(api_1.fetchAllBoardsAPI);
        yield (0, effects_1.put)(boardReducer_1.boardActions.fetchBoards(result));
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(false));
    }
    catch (err) {
        console.log(err);
    }
}
function* createBoard(action) {
    try {
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(true));
        const result = yield (0, effects_1.call)(api_1.createBoardAPI, action.payload);
        yield (0, effects_1.put)(boardReducer_1.boardActions.createBoard(result));
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(false));
    }
    catch (err) {
        console.log(err);
    }
}
function* fetchActiveBoard(action) {
    try {
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(true));
        const result = yield (0, effects_1.call)(api_1.fetchActiveBoardAPI, action.payload);
        yield (0, effects_1.all)([
            (0, effects_1.put)(boardReducer_1.boardActions.fetchActiveBoard(result.board)),
            (0, effects_1.put)(listReducer_1.listActions.loadAllLists(result.list)),
            (0, effects_1.put)(itemReducer_1.itemActions.loadAllItems(result.items)),
        ]);
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(false));
    }
    catch (err) {
        console.log(err);
    }
}
function* deleteBoard(action) {
    try {
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(true));
        yield (0, effects_1.call)(api_1.deleteBoardAPI, action.payload);
        yield (0, effects_1.put)(boardReducer_1.boardActions.deleteBoard({ _id: action.payload }));
        yield (0, effects_1.put)(boardReducer_1.boardActions.setLoading(false));
    }
    catch (err) {
        console.log(err);
    }
}
function* updateBoard(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.updateBoardAPI, action.payload);
        yield (0, effects_1.put)(boardReducer_1.boardActions.updateBoardDetails(result));
    }
    catch (err) {
        console.log(err);
    }
}
function* watchBoardSaga() {
    yield (0, effects_1.takeLatest)(types_1.FETCH_BOARDS_REQUESTED, getBoards);
    yield (0, effects_1.takeLatest)(types_1.CREATE_BOARD_REQUESTED, createBoard);
    yield (0, effects_1.takeLatest)(types_1.FETCH_BOARD_REQUESTED, fetchActiveBoard);
    yield (0, effects_1.takeLatest)(types_1.DELETE_BOARD_REQUESTED, deleteBoard);
    yield (0, effects_1.takeLatest)(types_1.UPDATE_BOARD_REQUESTED, updateBoard);
}
exports.default = watchBoardSaga;
//# sourceMappingURL=BoardSaga.js.map