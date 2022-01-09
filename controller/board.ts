import { Board } from "../models/board";
import { List } from "../models/list";
import { Item } from "../models/item";
import { Request, Response } from "express";

interface CreateBoardReq extends Request {
  body: {
    board_title: string;
    limit: string;
  };
}
export const createBoard = async (req: CreateBoardReq, res: Response) => {
  const { board_title, limit } = req.body;
  try {
    const newBoard = new Board({ board_title, limit });
    const savedBoard = await newBoard.save();
    res.status(200).send(savedBoard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
interface UpdateBoardReq extends Request {
  body: {
    board_title: string;
  };
  params: {
    board_id: string;
  };
}
export const updateBoardDetails = async (
  req: UpdateBoardReq,
  res: Response
) => {
  const { board_title } = req.body;
  const { board_id } = req.params;
  try {
    await Board.where({ _id: board_id }).updateOne({ board_title });
    const updatedBoard = await Board.where({ _id: board_id });
    res.status(200).send(updatedBoard);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const getAllBoard = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find({ closed: false });
    res.status(200).send(boards);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

interface GetBoardReq extends Request {
  params: {
    board_id: string;
  };
}
export const getBoard = async (req: GetBoardReq, res: Response) => {
  try {
    const board = await Board.findOne({ _id: req.params.board_id });
    const list = await List.find({ board: req.params.board_id });
    const items = await Item.find({ board: req.params.board_id });

    res.status(200).send({ board, list, items });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

interface DeleteBoardReq extends Request {
  params: {
    board_id: string;
  };
}
export const closeBoard = async (req: DeleteBoardReq, res: Response) => {
  try {
    const board = await Board.findOne({ _id: req.params.board_id });
    board.closed = true;
    await board.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const deleteFullBoard = async (req: DeleteBoardReq, res: Response) => {
  try {
    const board_id = req.params.board_id;
    await Board.findOneAndDelete({ board: board_id });
    await List.deleteMany({ board: board_id });
    await Item.deleteMany({ board: board_id });
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
