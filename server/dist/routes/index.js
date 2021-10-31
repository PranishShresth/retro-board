"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_1 = require("../controller/board");
const item_1 = require("../controller/item");
const list_1 = require("../controller/list");
const validator = __importStar(require("../utils/validator"));
const router = express_1.Router();
// board Routes
router.post("/create-board", validator.validateCreateBoard, board_1.createBoard);
router.put("/update-board/:board_id", board_1.updateBoardDetails);
router.delete("/delete-board/:board_id", board_1.deleteFullBoard);
router.get("/get-boards", board_1.getAllBoard);
router.get("/get-board/:board_id", board_1.getBoard);
// list Routes
router.post("/create-list", validator.validateCreateList, list_1.addListToBoard);
router.delete("/delete-list/:list_id", list_1.deleteList);
router.put("/update-list/:list_id", list_1.updateList);
// item Routes
router.post("/create-item", validator.validateCreateItem, item_1.addItemToList);
router.put("/reorder-item", item_1.reorderItem);
router.delete("/delete-item/:item_id", item_1.deleteItem);
router.put("/update-item/:item_id", item_1.updateItem);
exports.default = router;
//# sourceMappingURL=index.js.map