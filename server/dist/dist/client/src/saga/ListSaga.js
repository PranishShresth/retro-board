"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../utils/api");
const listReducer_1 = require("../reducers/listReducer");
const types_1 = require("../utils/types");
function* createList(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.createListAPI, action.payload);
        yield (0, effects_1.put)(listReducer_1.listActions.addList(result));
    }
    catch (err) {
        console.log(err);
    }
}
function* updateList(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.updateListAPI, action.payload);
        yield (0, effects_1.put)(listReducer_1.listActions.updateList(result));
    }
    catch (err) {
        console.log(err);
    }
}
function* watchListSaga() {
    yield (0, effects_1.takeLatest)(types_1.CREATE_LIST_REQUESTED, createList);
    yield (0, effects_1.takeLatest)(types_1.UPDATE_LIST_REQUESTED, updateList);
}
exports.default = watchListSaga;
//# sourceMappingURL=ListSaga.js.map