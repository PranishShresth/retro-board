import { Router } from "express";
import {
  createBoard,
  updateBoardDetails,
  addListToBoard,
  addItemToList,
  getAllBoard,
  getBoard,
  reorderItemInSameList,
} from "../controller/board";

const router = Router();

router.post("/create-board", createBoard);
router.put("/update-board/:board_id", updateBoardDetails);
router.post("/create-list", addListToBoard);
router.post("/create-item", addItemToList);
router.get("/get-boards", getAllBoard);
router.get("/get-board/:boardId", getBoard);
router.put("/list/:list_id/reorder-item", reorderItemInSameList);

export default router;
