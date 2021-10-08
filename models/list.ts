import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
  {
    list_title: { type: String, required: true },
  },
  { timestamps: true }
);

export const List = mongoose.model("List", listSchema);
