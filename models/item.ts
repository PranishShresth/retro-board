import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    item_title: { type: String, required: true },
    list: { type: Schema.Types.ObjectId, ref: "List" },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
