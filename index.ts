import express from "express";
import { config } from "dotenv";
import connectToDB from "./config/db";
import http from "http";
import ApiRoutes from "./routes";
import socketIO from "./config/socket";
import cors from "cors";
import helmet from "helmet";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, app);

const PORT = process.env.PORT || 5000;
config();

const DB_STRING = process.env.MONGO_URI!;

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set("socketio", io);

app.use("/api/v1", ApiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend")));

  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

connectToDB(DB_STRING);
export type ISocket = typeof io;
