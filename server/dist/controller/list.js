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
exports.updateList = exports.deleteList = exports.addListToBoard = void 0;
const list_1 = require("../models/list");
exports.addListToBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list_title, board_id, _id } = req.body;
    try {
        const newList = new list_1.List({
            _id: _id,
            list_title: list_title,
            board: board_id,
        });
        const socket = req.app.get("socket");
        const io = req.app.get("socketio");
        const query = socket.handshake.query.boardId;
        const savedList = yield newList.save();
        io.to(query).emit("new-list", savedList);
        res.status(200).send(savedList);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list_id } = req.params;
    try {
        yield list_1.List.findByIdAndDelete(list_id);
        res.status(200).send({ success: true });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { list_title } = req.body;
    const { list_id } = req.params;
    const socket = req.app.get("socket");
    const io = req.app.get("socketio");
    const query = socket.handshake.query.boardId;
    try {
        const updatedList = yield list_1.List.findByIdAndUpdate(list_id, {
            $set: {
                list_title: list_title,
            },
        }, { new: true });
        io.to(query).emit("updated-list", updatedList);
        res.status(200).send(updatedList);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=list.js.map