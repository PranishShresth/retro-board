import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
  {
    title: { type: String, required: true },

    closed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Board = mongoose.model("Board", boardSchema);
