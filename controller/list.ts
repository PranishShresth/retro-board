import { List } from "../models/list";
import { Item } from "../models/item";
import { Request, Response } from "express";
import { List as IList, Item as IItem } from "../utils/interfaces";
import { Socket } from "socket.io";
import { ISocket } from "../index";

interface IAddItem extends Request {
  body: {
    item_title: string;
    list_id: string;
    board_id: string;
  };
}
export const addItemToList = async (req: IAddItem, res: Response) => {
  const { item_title, list_id, board_id } = req.body;
  const socket: Socket = req.app.get("socket");
  const io: ISocket = req.app.get("socketio");
  const query = socket.handshake.query.boardId as string;

  try {
    const position = await calculateListPosition(list_id);
    console.log(query);
    const newItem = new Item({
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
