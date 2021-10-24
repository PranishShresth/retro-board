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
exports.addListToBoard = void 0;
const list_1 = require("../models/list");
const addListToBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.addListToBoard = addListToBoard;
//# sourceMappingURL=list.js.map