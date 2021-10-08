import mongoose, { Schema } from "mongoose";

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
