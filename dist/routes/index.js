"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_1 = require("../controller/board");
const item_1 = require("../controller/item");
const list_1 = require("../controller/list");
const router = (0, express_1.Router)();
router.post("/create-board", board_1.createBoard);
router.put("/update-board/:boardId", board_1.updateBoardDetails);
router.delete("/delete-board/:boardId", board_1.deleteFullBoard);
router.get("/get-boards", board_1.getAllBoard);
router.get("/get-board/:boardId", board_1.getBoard);
router.post("/create-list", list_1.addListToBoard);
router.post("/create-item", item_1.addItemToList);
router.put("/list/:list_id/reorder-item", item_1.reorderItem);
router.delete("/delete-item/:item_id", item_1.deleteItem);
exports.default = router;
//# sourceMappingURL=index.js.map