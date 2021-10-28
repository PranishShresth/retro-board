import { Router } from "express";
import {
  createBoard,
  updateBoardDetails,
  getAllBoard,
  getBoard,
  deleteFullBoard,
} from "../controller/board";

import {
  reorderItem,
  addItemToList,
  deleteItem,
  updateItem,
} from "../controller/item";

import { addListToBoard, deleteList, updateList } from "../controller/list";

const router = Router();
// board Routes
router.post("/create-board", createBoard);
router.put("/update-board/:board_id", updateBoardDetails);
router.delete("/delete-board/:board_id", deleteFullBoard);
router.get("/get-boards", getAllBoard);
router.get("/get-board/:board_id", getBoard);

// list Routes
router.post("/create-list", addListToBoard);
router.delete("/delete-list/:list_id", deleteList);
router.put("/update-list/:list_id", updateList);

// item Routes
router.post("/create-item", addItemToList);
router.put("/reorder-item", reorderItem);
router.delete("/delete-item/:item_id", deleteItem);
router.put("/update-item/:item_id", updateItem);

export default router;
