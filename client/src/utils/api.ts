import axios from "axios";
import { Board, Item, List } from "../interfaces";
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

export const deleteBoardAPI = async (payload: string) => {
  try {
    const { data } = await httpClient.delete(`/delete-board/${payload}`);
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

// type createItemPayload = {
//   item_title: string;
//   list_id: string;
// };
export const createItemAPI = async (payload: Partial<Item>) => {
  try {
    const { data } = await httpClient.post("/create-item", payload);
    return data;
  } catch (err) {
    throw err;
  }
};

type reorderItemPayload = {
  item_id: string;
  position: string;
  list_id: string;
};

export const reorderItemAPI = async (payload: reorderItemPayload) => {
  try {
    const { data } = await httpClient.put(
      `/list/${payload.list_id}/reorder-item`,
      payload
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export const deleteItemAPI = async (payload: { item_id: string }) => {
  try {
    const { data } = await httpClient.delete(`/delete-item/${payload.item_id}`);
    return data;
  } catch (err) {
    throw err;
  }
};
