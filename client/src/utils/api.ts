import axios from "axios";
import { Board } from "../interfaces";
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
export const createBoardAPI = async (payload: Board): Promise<Board> => {
  try {
    const { data } = await httpClient.post("/create-board", payload);
    return data;
  } catch (err) {
    throw err;
  }
};
