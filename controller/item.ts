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

interface IAddItem extends Request {
  body: {
    item_title: string;
    list_id: string;
    board_id: string;
    _id: string;
  };
}

export const addItemToList = async (req: IAddItem, res: Response) => {
  const { item_title, list_id, board_id, _id } = req.body;
  const socket: Socket = req.app.get("socket");
  const io: ISocket = req.app.get("socketio");
  const query = socket.handshake.query.boardId as string;

  try {
    const position = await calculateListPosition(list_id);

    const newItem = new Item({
      _id,
      item_title,
      order: position,
      list: list_id,
      board: board_id,
    });
    const item = await newItem.save();

    io.to(query).emit("updated-list", item);

    res.status(200).send(item);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const calculateListPosition = async (listId: string): Promise<number> => {
  const items = await Item.find({ list: listId });

  const itemPositions = items.map(({ order }) => order);

  if (itemPositions.length > 0) {
    return Math.max(...itemPositions) + 1;
  }
  return 1;
};
