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
exports.updateItem = exports.deleteItem = exports.addItemToList = exports.reorderItem = void 0;
const item_1 = require("../models/item");
exports.reorderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_id, position, source_list_id, destination_list_id } = req.body;
        const { list_id } = req.params;
        const socket = req.app.get("socket");
        const io = req.app.get("socketio");
        const query = socket.handshake.query.boardId;
        const item = yield item_1.Item.findOneAndUpdate({ _id: item_id }, {
            $set: {
                order: position,
                list: destination_list_id,
            },
        });
        io.to(query).emit("reordered-item", {
            source_list_id,
            destination_list_id,
            item,
            position,
        });
        res.status(200).json(item);
    }
    catch (err) { }
});
exports.addItemToList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item_title, list, board, _id } = req.body;
    const socket = req.app.get("socket");
    const io = req.app.get("socketio");
    const query = socket.handshake.query.boardId;
    try {
        const position = yield calculateListPosition(list);
        const newItem = new item_1.Item({
            _id,
            item_title,
            order: position,
            list: list,
            board: board,
        });
        const item = yield newItem.save();
        io.to(query).emit("new-item", item);
        res.status(200).send(item);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
const calculateListPosition = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield item_1.Item.find({ list: listId });
    const itemPositions = items.map(({ order }) => order);
    if (itemPositions.length > 0) {
        return Math.max(...itemPositions) + 1;
    }
    return 1;
});
exports.deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item_id } = req.params;
    try {
        yield item_1.Item.findByIdAndDelete(item_id);
        res.status(200).send({ success: true });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
exports.updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item_title } = req.body;
    const { item_id } = req.params;
    const socket = req.app.get("socket");
    const io = req.app.get("socketio");
    const query = socket.handshake.query.boardId;
    try {
        const updatedItem = yield item_1.Item.findByIdAndUpdate(item_id, {
            $set: {
                item_title: item_title,
            },
        }, { new: true });
        io.to(query).emit("updated-item", updatedItem);
        res.status(200).send(updatedItem);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=item.js.map