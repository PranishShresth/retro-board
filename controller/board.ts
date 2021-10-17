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
    const socket: Socket = req.app.get("socket");
    const io: ISocket = req.app.get("socketio");
    const query = socket.handshake.query.boardId as string;

    const savedList = await newList.save();
    const board = await Board.findById(board_id);
    board.lists.push(savedList._id);
    let updatedBoard = await board.save();

    updatedBoard = await updatedBoard.populate({
      path: "lists",
      populate: { path: "items" },
    });
    io.to(query).emit("new-list", updatedBoard);

    res.status(200).send(updatedBoard);
  } catch (err) {
    console.log(err);
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
    const board = await Board.findOne({ _id: req.params.boardId }).populate({
      path: "lists",
      populate: {
        path: "items",
        options: { sort: { order: 1 } },
      },
    });
    res.status(200).send(board);
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
    const board = await Board.findOne({ _id: boardId }).populate("lists");
    const lists = board.lists;
    const items = lists.reduce(
      (allItems, currList) => allItems.concat(currList.items),
      []
    );
    const itemsIds = items.map((itemId) => Item.findByIdAndDelete(itemId));
    const listIds = lists.map((list) => List.findByIdAndDelete(list._id));
    await Promise.all([...itemsIds, ...listIds]);
    await Board.findByIdAndDelete(boardId);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
