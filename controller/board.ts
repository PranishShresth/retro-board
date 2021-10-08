import { Board } from "../models/board";
import { Request, Response } from "express";
import { APIError, HttpStatusCode } from "../utils/errorHandler";

interface IRequestBody extends Request {
  body: {
    title: string;
  };
}
export const createBoard = async (req: IRequestBody, res: Response) => {
  const { title } = req.body;
  try {
    const newBoard = new Board({ title });
    const savedBoard = await newBoard.save();
    res.status(200).send(savedBoard);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
interface IRequestBody extends Request {
  body: {
    title: string;
  };
  params: {
    board_id: string;
  };
}
export const updateBoardDetails = async (req: IRequestBody, res: Response) => {
  const { title } = req.body;
  const { board_id } = req.params;
  try {
    await Board.where({ id: board_id }).updateOne({ title: title });
    const updatedBoard = await Board.where({ id: board_id });
    res.status(200).send(updatedBoard);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

interface IRequestBody extends Request {
  body: {
    list_title: string;
    board_id: string;
  };
  params: {
    boardId: string;
  };
}
export const addListToBoard = async (req: IRequestBody, res: Response) => {
  const { list_title, board_id } = req.body;
  const { boardId } = req.params;
  try {
    // await Board.where({ id: boardId }).updateOne({ title: title });
    // const updatedBoard = await Board.where({ id: boardId });
    // res.status(200).send(updatedBoard);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
