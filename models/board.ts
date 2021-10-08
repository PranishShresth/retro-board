import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    lists: [
      { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
    ],
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);
