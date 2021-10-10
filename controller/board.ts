import { Board } from "../models/board";
import { List } from "../models/list";
import { Item } from "../models/item";
import { LexoRank } from "lexorank";
import { ISocket } from "../index";
import { Request, Response } from "express";
import { List as IList } from "../utils/interfaces";

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
    const io: ISocket = req.app.get("socketio");
    io.emit("new-board", savedBoard);
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
  console.log();

  try {
    let existingList: IList = await List.findById(list_id).populate("items");

    let nextOrder;
    if (existingList!.items.length) {
      existingList.items.sort((a, b) =>
        LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order))
      );

      nextOrder = LexoRank.parse(
        existingList.items[existingList.items.length - 1].order
      ).genNext();
    } else {
      nextOrder = LexoRank.middle();
    }

    const newItem = new Item({ item_title: item_title, order: nextOrder });
    const savedItem = await newItem.save();

    const list = await List.findById(list_id);
    list?.items?.push(savedItem);

    let updatedList = await list?.save();
    updatedList = await updatedList?.populate("items");

    updatedList.items.sort((a, b) =>
      LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order))
    );

    console.log(updatedList);
    res.status(200).send(updatedList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

interface IReorderRequest extends Request {
  body: {
    prev_item_order: string;
    curr_item: string;
    dest_item: string;
    next_item_order: string;
  };
  params: {
    list_id: string;
  };
}
export const reorderItemInSameList = async (
  req: IReorderRequest,
  res: Response
) => {
  const { prev_item_order, curr_item, next_item_order, dest_item } = req.body;
  const { list_id } = req.params;
  console.log(list_id, curr_item);

  try {
    const isFirstItem = LexoRank.parse(dest_item);

    const item = await Item.findOneAndUpdate(
      { _id: curr_item },
      {
        $set: {
          order: isFirstItem.genPrev(),
        },
      }
    );

    let list: IList = await List.findById(list_id).populate("items");
    list.items.sort((a, b) =>
      LexoRank.parse(b.order).compareTo(LexoRank.parse(a.order))
    );
    res.status(200).send(list);
  } catch (err) {
    console.log(err);
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

// const calculateListPosition = async (id): Promise<number> => {
//   const list = await List.findOne({ _id: id });

//   const itemPositions = issues.map(({ order }) => order);

//   if (itemPositions.length > 0) {
//     return Math.min(...itemPositionsPositions) - 1;
//   }
//   return 1;
// };
