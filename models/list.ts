import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    list_title: { type: String, required: true },
    board: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
  },
  { timestamps: true }
);

export const List = mongoose.model("List", listSchema);
