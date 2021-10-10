import mongoose, { Schema, Model } from "mongoose";
import { LexoRank } from "lexorank";
import { List as IList } from "../utils/interfaces";

interface ListModel extends Model<IList> {
  findByIdAndSortByOrder(id: string): Promise<IList>;
}

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

listSchema.static("findByIdAndSortByOrder", async function (id) {
  let list: IList = await this.findById(id).populate("items");
  list.items.sort((a, b) =>
    LexoRank.parse(a.order).compareTo(LexoRank.parse(b.order))
  );
  return list;
});
export const List = mongoose.model("List", listSchema);
