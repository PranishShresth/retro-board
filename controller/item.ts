import { Board } from "../models/board";
import { List } from "../models/list";
import { Item } from "../models/item";
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
  const { item_id, position, source_list_id, destination_list_id } = req.body;
  const { list_id } = req.params;

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

    res.status(200).send(list);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
