import mongoose, { Schema, Model } from "mongoose";
import { LexoRank } from "lexorank";
import { List as IList } from "../utils/interfaces";

const listSchema = new Schema(
  {
    list_title: { type: String, required: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const List = mongoose.model("List", listSchema);
