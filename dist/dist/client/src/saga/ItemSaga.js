"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const api_1 = require("../utils/api");
const types_1 = require("../utils/types");
const itemReducer_1 = require("../reducers/itemReducer");
function* createItem(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.createItemAPI, action.payload);
        yield (0, effects_1.put)(itemReducer_1.itemActions.addItem(result));
    }
    catch (err) {
        console.log(err);
    }
}
function* reorderItem(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.reorderItemAPI, action.payload);
        yield (0, effects_1.put)(itemReducer_1.itemActions.reorderItem(result));
    }
    catch (err) {
        console.log(err);
    }
}
function* updateItem(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.updateItemAPI, action.payload);
        yield (0, effects_1.put)(itemReducer_1.itemActions.updateItem(result));
    }
    catch (err) {
        console.log(err);
    }
}
function* deleteItem(action) {
    try {
        const result = yield (0, effects_1.call)(api_1.deleteItemAPI, action.payload);
        if (result.success) {
            console.log("deleted");
        }
    }
    catch (err) {
        console.log(err);
    }
}
function* watchItemSaga() {
    yield (0, effects_1.takeLatest)(types_1.CREATE_ITEM_REQUESTED, createItem);
    yield (0, effects_1.takeLatest)(types_1.REORDER_ITEM_REQUESTED, reorderItem);
    yield (0, effects_1.takeLatest)(types_1.DELETE_ITEM_REQUESTED, deleteItem);
    yield (0, effects_1.takeLatest)(types_1.UPDATE_ITEM_REQUESTED, updateItem);
}
exports.default = watchItemSaga;
//# sourceMappingURL=ItemSaga.js.map