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

export const reorderItem1 = async (req: IReorderRequest, res: Response) => {
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
    res.status(200).json(item);
  } catch (err) {}
};
export const reorderItem = async (req: IReorderRequest, res: Response) => {
  const { item_id, position, source_list_id, destination_list_id } = req.body;
  const { list_id } = req.params;
  const socket: Socket = req.app.get("socket");
  const io: ISocket = req.app.get("socketio");
  const query = socket.handshake.query.boardId as string;

  try {
    await Item.findOneAndUpdate(
      { _id: item_id },
      {
        $set: {
          order: position,
        },
      }
    );

    if (source_list_id !== destination_list_id) {
      const sourceList = await List.findById(source_list_id);
      sourceList.items.pull({ _id: item_id });
      await sourceList.save();

      const destinationList = await List.findById(destination_list_id);
      destinationList.items.push(item_id);
      await destinationList.save();
    }

    let list: IList = await List.findById(list_id).populate({
      path: "items",
      options: { sort: { order: 1 } },
    });
    io.to(query).emit("updated-items", {
      list,
      item_id,
      source_list_id,
      destination_list_id,
    });

    res.status(200).send(list);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
