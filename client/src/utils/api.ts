import axios from "axios";
import { Board, List, Item } from "../interfaces";
const httpClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const fetchAllBoardsAPI = async () => {
  try {
    const { data } = await httpClient.get("/get-boards");
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchActiveBoardAPI = async (boardId: string) => {
  try {
    const { data } = await httpClient.get(`/get-board/${boardId}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const createBoardAPI = async (payload: Partial<Board>) => {
  try {
    const { data } = await httpClient.post("/create-board", payload);
    return data;
  } catch (err) {
    throw err;
  }
};

export const createListAPI = async (payload: Partial<List>) => {
  try {
    const { data } = await httpClient.post("/create-list", payload);
    return data;
  } catch (err) {
    throw err;
  }
};

type createItemPayload = {
  item_title: string;
  list_id: string;
};
export const createItemAPI = async (payload: createItemPayload) => {
  try {
    const { data } = await httpClient.post("/create-item", payload);
    return data;
  } catch (err) {
    throw err;
  }
};

type reorderItemPayload = {
  prev_item_order: string;
  curr_item: string;
  next_item_order: string;
};

export const reorderItemAPI = async (payload: reorderItemPayload) => {
  try {
    const { data } = await httpClient.put(
      "/list/:list_id/reorder-item",
      payload
    );
    return data;
  } catch (err) {
    throw err;
  }
};
