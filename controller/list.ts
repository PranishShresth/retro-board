import { List } from "../models/list";
import { Item } from "../models/item";
import { Request, Response } from "express";
import { List as IList } from "../utils/interfaces";
import { Socket } from "socket.io";
import { ISocket } from "../index";

interface IAddItem extends Request {
  body: {
    item_title: string;
    list_id: string;
  };
}
export const addItemToList = async (req: IAddItem, res: Response) => {
  const { item_title, list_id } = req.body;
  const socket: Socket = req.app.get("socket");
  const io: ISocket = req.app.get("socketio");
  const query = socket.handshake.query.boardId as string;

  try {
    const position = await calculateListPosition(list_id);
    console.log(query);

    const newItem = new Item({ item_title: item_title, order: position });
    const savedItem = await newItem.save();

    const list = await List.findById(list_id);
    list?.items?.push(savedItem);

    let updatedList = await list?.save();
    updatedList = await updatedList?.populate("items");

    io.to(query).emit("updated-list", updatedList);

    res.status(200).send(updatedList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const calculateListPosition = async (id: string): Promise<number> => {
  const list: IList = await List.findOne({ _id: id }).populate("items");

  const itemPositions = list.items.map(({ order }) => order);

  if (itemPositions.length > 0) {
    return Math.max(...itemPositions) + 1;
  }
  return 1;
};
