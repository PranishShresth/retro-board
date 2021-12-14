"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const boardReducer_1 = __importDefault(require("./reducers/boardReducer"));
const listReducer_1 = __importDefault(require("./reducers/listReducer"));
const itemReducer_1 = __importDefault(require("./reducers/itemReducer"));
const redux_saga_1 = __importDefault(require("redux-saga"));
const RootSaga_1 = __importDefault(require("./saga/RootSaga"));
const sagaMiddleware = (0, redux_saga_1.default)();
const store = (0, toolkit_1.configureStore)({
    reducer: {
        board: boardReducer_1.default.reducer,
        list: listReducer_1.default.reducer,
        item: itemReducer_1.default.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(RootSaga_1.default);
exports.default = store;
//# sourceMappingURL=store.js.map