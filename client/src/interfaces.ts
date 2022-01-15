export interface Board {
  _id: string;
  board_title: string;
  lists: List[];
  limit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface List {
  _id: string;
  list_title: string;
  board: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  items: Item[];
}

export interface Item {
  order: number;
  _id: string;
  board: string;
  list: string;
  item_title: string;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
