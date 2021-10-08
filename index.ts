import express from "express";
import { config } from "dotenv";
import connectToDB from "./config/db";
const app = express();
const PORT = process.env.PORT || 5000;
const DB_STRING = process.env.MONGO_URI;
config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDB(DB_STRING);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
