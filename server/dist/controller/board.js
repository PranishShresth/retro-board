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
    const { board_title } = req.body;
    try {
        const newBoard = new board_1.Board({ board_title });
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
    const { board_title } = req.body;
    const { board_id } = req.params;
    try {
        yield board_1.Board.where({ _id: board_id }).updateOne({ board_title });
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
        const board = yield board_1.Board.findOne({ _id: req.params.board_id });
        const list = yield list_1.List.find({ board: req.params.board_id });
        const items = yield item_1.Item.find({ board: req.params.board_id });
        res.status(200).send({ board, list, items });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.getBoard = getBoard;
const closeBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const board = yield board_1.Board.findOne({ _id: req.params.board_id });
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
        const board_id = req.params.board_id;
        yield board_1.Board.findOneAndDelete({ board: board_id });
        yield list_1.List.deleteMany({ board: board_id });
        yield item_1.Item.deleteMany({ board: board_id });
        res.status(200).send({ success: true });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteFullBoard = deleteFullBoard;
//# sourceMappingURL=board.js.map