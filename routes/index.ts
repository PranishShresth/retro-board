import { Router } from "express";
import { createBoard, updateBoardDetails } from "../controller/board";

const router = Router();

router.post("/create-board", createBoard);
router.put("/update-board/:board_id", updateBoardDetails);

export default router;
