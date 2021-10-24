import { Board } from "../models/board";
import { List } from "../models/list";
import { Item } from "../models/item";
import { Request, Response } from "express";
import { List as IList } from "../utils/interfaces";
import { Socket } from "socket.io";
import { ISocket } from "../index";

interface IRequest1 extends Request {
  body: {
    title: string;
  };
}
export const createBoard = async (req: IRequest1, res: Response) => {
  const { title } = req.body;
  try {
    const newBoard = new Board({ title });
    const savedBoard = await newBoard.save();
    res.status(200).send(savedBoard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
interface IRequest2 extends Request {
  body: {
    title: string;
  };
  params: {
    board_id: string;
  };
}
export const updateBoardDetails = async (req: IRequest2, res: Response) => {
  const { title } = req.body;
  const { board_id } = req.params;
  try {
    await Board.where({ _id: board_id }).updateOne({ title: title });
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

interface IGetBoardAPI extends Request {
  params: {
    boardId: string;
  };
}
export const getBoard = async (req: IGetBoardAPI, res: Response) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId });
    const list = await List.find({ board: req.params.boardId });
    const items = await Item.find({ board: req.params.boardId });

    console.log(items);
    res.status(200).send({ board, list, items });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

interface IDeleteBoardAPI extends Request {
  params: {
    boardId: string;
  };
}
export const closeBoard = async (req: IDeleteBoardAPI, res: Response) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId });
    board.closed = true;
    await board.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const deleteFullBoard = async (req: IDeleteBoardAPI, res: Response) => {
  try {
    const boardId = req.params.boardId;
    await Board.findOneAndDelete({ board: boardId });
    await List.deleteMany({ board: boardId });
    await Item.deleteMany({ board: boardId });
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
