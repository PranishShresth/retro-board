"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateListAPI = exports.deleteListAPI = exports.updateItemAPI = exports.deleteItemAPI = exports.reorderItemAPI = exports.createItemAPI = exports.createListAPI = exports.deleteBoardAPI = exports.updateBoardAPI = exports.createBoardAPI = exports.fetchActiveBoardAPI = exports.fetchAllBoardsAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const httpClient = axios_1.default.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});
const fetchAllBoardsAPI = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.get("/get-boards");
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.fetchAllBoardsAPI = fetchAllBoardsAPI;
const fetchActiveBoardAPI = (boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.get(`/get-board/${boardId}`);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.fetchActiveBoardAPI = fetchActiveBoardAPI;
const createBoardAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.post("/create-board", payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.createBoardAPI = createBoardAPI;
const updateBoardAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.put(`/update-board/${payload.board_id}`, payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.updateBoardAPI = updateBoardAPI;
const deleteBoardAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.delete(`/delete-board/${payload}`);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteBoardAPI = deleteBoardAPI;
const createListAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.post("/create-list", payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.createListAPI = createListAPI;
// type createItemPayload = {
//   item_title: string;
//   list_id: string;
// };
const createItemAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.post("/create-item", payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.createItemAPI = createItemAPI;
const reorderItemAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.put(`/reorder-item`, payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.reorderItemAPI = reorderItemAPI;
const deleteItemAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.delete(`/delete-item/${payload.item_id}`);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteItemAPI = deleteItemAPI;
const updateItemAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.put(`/update-item/${payload.item_id}`, payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.updateItemAPI = updateItemAPI;
const deleteListAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.delete(`/delete-item/${payload.item_id}`);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.deleteListAPI = deleteListAPI;
const updateListAPI = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield httpClient.put(`/update-list/${payload.list_id}`, payload);
        return data;
    }
    catch (err) {
        throw err;
    }
});
exports.updateListAPI = updateListAPI;
//# sourceMappingURL=api.js.map