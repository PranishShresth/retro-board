import mongoose, { Schema } from "mongoose";

const itemSchemaRevised = new Schema(
  {
    item_title: { type: String, required: true },
    order: { type: Number },
    list: { type: Schema.Types.ObjectId, ref: "List", required: true },
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  },
  { timestamps: true }
);

const itemSchema = new Schema(
  {
    item_title: { type: String, required: true },
    order: { type: Number },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchemaRevised);
