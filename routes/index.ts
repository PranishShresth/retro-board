import { Router } from "express";
import {
  createBoard,
  updateBoardDetails,
  getAllBoard,
  getBoard,
  deleteFullBoard,
} from "../controller/board";

import { reorderItem, addItemToList, deleteItem } from "../controller/item";

import { addListToBoard } from "../controller/list";

const router = Router();

router.post("/create-board", createBoard);
router.put("/update-board/:boardId", updateBoardDetails);
router.delete("/delete-board/:boardId", deleteFullBoard);
router.get("/get-boards", getAllBoard);
router.get("/get-board/:boardId", getBoard);

router.post("/create-list", addListToBoard);
router.post("/create-item", addItemToList);

router.put("/list/:list_id/reorder-item", reorderItem);
router.delete("/delete-item/:item_id", deleteItem);

export default router;
