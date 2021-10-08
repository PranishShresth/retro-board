import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    description: { type: String, required: true },
    _list: { type: Schema.Types.ObjectId, ref: "List" },
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
