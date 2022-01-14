import { Item } from "../models/item";

import { Request, Response } from "express";

interface IReorderRequest extends Request {
  body: {
    item_id: string;
    position: string;
    destination: string;
  };
  params: {
    list_id: string;
  };
}

export const reorderItem = async (req: IReorderRequest, res: Response) => {
  try {
    const { item_id, position, destination } = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: item_id },
      {
        $set: {
          order: position,
          list: destination,
        },
      }
    );

    res.status(200).json(item);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

interface IAddItem extends Request {
  body: {
    item_title: string;
    list: string;
    board: string;
    _id: string;
  };
}

export const addItemToList = async (req: IAddItem, res: Response) => {
  const { item_title, list, board, _id } = req.body;
  try {
    const position = await calculateListPosition(list);

    const newItem = new Item({
      _id,
      item_title,
      order: position,
      list: list,
      board: board,
    });
    const item = await newItem.save();
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

interface DeleteItemRequest extends Request {
  params: {
    item_id: string;
  };
}
export const deleteItem = async (req: DeleteItemRequest, res: Response) => {
  const { item_id } = req.params;
  try {
    await Item.findByIdAndDelete(item_id);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

interface UpdateItemRequest extends Request {
  params: {
    item_id: string;
  };
  body: {
    item_title?: string;
  };
}
export const updateItem = async (req: UpdateItemRequest, res: Response) => {
  const { item_id } = req.params;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      item_id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
