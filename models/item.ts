import mongoose, { Schema } from "mongoose";
import { LexoRank } from "lexorank";

const itemSchema = new Schema(
  {
    item_title: { type: String, required: true },
    order: { type: Number },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
