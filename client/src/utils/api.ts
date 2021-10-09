import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const fetchAllBoards = async () => {
  try {
    const { data } = await httpClient.get("/get-boards");
    return data;
  } catch {
    console.log("Network issue");
  }
};
