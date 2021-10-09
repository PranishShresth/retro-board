import axios from "axios";
import { Board, List } from "../interfaces";
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
