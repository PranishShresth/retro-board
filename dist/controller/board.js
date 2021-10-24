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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFullBoard = exports.closeBoard = exports.getBoard = exports.getAllBoard = exports.updateBoardDetails = exports.createBoard = void 0;
const board_1 = require("../models/board");
const list_1 = require("../models/list");
const item_1 = require("../models/item");
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newBoard = new board_1.Board({ title });
        const savedBoard = yield newBoard.save();
        res.status(200).send(savedBoard);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.createBoard = createBoard;
const updateBoardDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const { board_id } = req.params;
    try {
        yield board_1.Board.where({ _id: board_id }).updateOne({ title: title });
        const updatedBoard = yield board_1.Board.where({ _id: board_id });
        res.status(200).send(updatedBoard);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.updateBoardDetails = updateBoardDetails;
const getAllBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boards = yield board_1.Board.find({ closed: false });
        res.status(200).send(boards);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.getAllBoard = getAllBoard;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield board_1.Board.findOne({ _id: req.params.boardId });
        const list = yield list_1.List.find({ board: req.params.boardId });
        const items = yield item_1.Item.find({ board: req.params.boardId });
        res.status(200).send({ board, list, items });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.getBoard = getBoard;
const closeBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield board_1.Board.findOne({ _id: req.params.boardId });
        board.closed = true;
        yield board.save();
        res.status(200).send({ success: true });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.closeBoard = closeBoard;
const deleteFullBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = req.params.boardId;
        yield board_1.Board.findOneAndDelete({ board: boardId });
        yield list_1.List.deleteMany({ board: boardId });
        yield item_1.Item.deleteMany({ board: boardId });
        res.status(200).send({ success: true });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteFullBoard = deleteFullBoard;
//# sourceMappingURL=board.js.map