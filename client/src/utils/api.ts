import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const fetchAllBoards = () => {
  return httpClient.get("/get-boards").then((res) => res.data);
};
