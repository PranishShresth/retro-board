import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    board_title: { type: String, required: true },
    limit: { type: Number },
    closed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);
