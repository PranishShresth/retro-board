import express from "express";
import { config } from "dotenv";
import connectToDB from "./config/db";
import ApiRoutes from "./routes";
import logger from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
config();

const DB_STRING = process.env.MONGO_URI!;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api/v1", ApiRoutes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

connectToDB(DB_STRING);
