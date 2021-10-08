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
    const board = new Board({ title });
    await board.save();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
interface IRequestBody extends Request {
  body: {
    title: string;
  };
  params: {
    boardId: string;
  };
}
export const updateBoardDetails = async (req: IRequestBody, res: Response) => {
  const { title } = req.body;
  const { boardId } = req.params;

  try {
    await Board.where({ id: boardId }).set("title", title).exec();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
