import { Board } from "../models/board";
import { List } from "../models/list";
import { Item } from "../models/item";

import { Request, Response } from "express";
import { APIError, HttpStatusCode } from "../utils/errorHandler";

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

interface IRequest3 extends Request {
  body: {
    list_title: string;
    board_id: string;
  };
}
export const addListToBoard = async (req: IRequest3, res: Response) => {
  const { list_title, board_id } = req.body;

  try {
    const newList = new List({ list_title: list_title });
    const savedList = await newList.save();
    const board = await Board.findById(board_id);
    board.lists.push(savedList._id);
    let updatedBoard = await board.save();
    updatedBoard = await updatedBoard.populate({
      path: "lists",
      populate: { path: "items" },
    });

    res.status(200).send(updatedBoard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

interface IRequest4 extends Request {
  body: {
    item_title: string;
    list_id: string;
  };
}
export const addItemToList = async (req: IRequest4, res: Response) => {
  const { item_title, list_id } = req.body;

  try {
    const newItem = new Item({ item_title: item_title, list: list_id });
    const savedItem = await newItem.save();

    const list = await List.findById(list_id);
    list.items.push(savedItem._id);
    const updatedList = await list.save();
    res.status(200).send(updatedList);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export const getAllBoard = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find({});
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
    const board = await Board.findOne({ _id: req.params.boardId }).populate({
      path: "lists",
      populate: { path: "items" },
    });
    res.status(200).send(board);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
