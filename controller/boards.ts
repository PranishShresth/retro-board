import { Board } from "../models/board";
import { Request, Response } from "express";

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
  } catch (err) {}
};
