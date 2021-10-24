import { Router } from "express";
import {
  createBoard,
  updateBoardDetails,
  addListToBoard,
  getAllBoard,
  getBoard,
  deleteFullBoard,
} from "../controller/board";

import { reorderItem1 } from "../controller/item";

import { addItemToList } from "../controller/list";

const router = Router();

router.post("/create-board", createBoard);
router.put("/update-board/:boardId", updateBoardDetails);
router.delete("/delete-board/:boardId", deleteFullBoard);

router.post("/create-list", addListToBoard);
router.post("/create-item", addItemToList);
router.get("/get-boards", getAllBoard);
router.get("/get-board/:boardId", getBoard);
router.put("/list/:list_id/reorder-item", reorderItem1);

export default router;
