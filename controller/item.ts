import { List } from "../models/list";
import { Item } from "../models/item";
import { Socket } from "socket.io";
import { ISocket } from "../index";

import { Request, Response } from "express";
import { List as IList } from "../utils/interfaces";

interface IReorderRequest extends Request {
  body: {
    item_id: string;
    position: string;
    source_list_id: string;
    destination_list_id: string;
  };
  params: {
    list_id: string;
  };
}

export const reorderItem = async (req: IReorderRequest, res: Response) => {
  try {
    const { item_id, position, source_list_id, destination_list_id } = req.body;
    const { list_id } = req.params;
    const socket: Socket = req.app.get("socket");
    const io: ISocket = req.app.get("socketio");
    const query = socket.handshake.query.boardId as string;

    const item = await Item.findOneAndUpdate(
      { _id: item_id },
      {
        $set: {
          order: position,
          list: destination_list_id,
        },
      }
    );
    io.to(query).emit("reordered-item", item);

    res.status(200).json(item);
  } catch (err) {}
};
