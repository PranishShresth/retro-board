import express from "express";
import { config } from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;
config();

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
