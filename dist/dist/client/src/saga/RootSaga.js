"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListSaga_1 = __importDefault(require("./ListSaga"));
const BoardSaga_1 = __importDefault(require("./BoardSaga"));
const ItemSaga_1 = __importDefault(require("./ItemSaga"));
const effects_1 = require("redux-saga/effects");
function* rootSaga() {
    yield (0, effects_1.all)([(0, effects_1.fork)(ListSaga_1.default), (0, effects_1.fork)(BoardSaga_1.default), (0, effects_1.fork)(ItemSaga_1.default)]);
}
exports.default = rootSaga;
//# sourceMappingURL=RootSaga.js.map