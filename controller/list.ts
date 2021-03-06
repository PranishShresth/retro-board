import { List } from "../models/list";
import { Request, Response } from "express";
import { Socket } from "socket.io";
import { ISocket } from "../index";

interface AddListRequest extends Request {
  body: {
    list_title: string;
    board_id: string;
    _id: string;
  };
}
export const addListToBoard = async (req: AddListRequest, res: Response) => {
  const { list_title, board_id, _id } = req.body;

  try {
    const newList = new List({
      _id: _id,
      list_title: list_title,
      board: board_id,
    });
    const socket: Socket = req.app.get("socket");
    const io: ISocket = req.app.get("socketio");
    const query = socket.handshake.query.boardId as string;

    const savedList = await newList.save();

    io.to(query).emit("new-list", savedList);

    res.status(200).send(savedList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
