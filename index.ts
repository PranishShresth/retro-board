import express, { Response, Request } from "express";
import { config } from "dotenv";
import connectToDB from "./config/db";
import http from "http";
import ApiRoutes from "./routes";
import socketIO from "./config/socket";
import logger from "morgan";
import cors from "cors";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;
config();

const DB_STRING = process.env.MONGO_URI!;
app.use(cors());
app.use(express.json());
// app.use(function (req, res, next) {
//   res.locals.io = io;
//   next();
// });
app.use(express.urlencoded({ extended: false }));
app.set("socketio", io);

app.use(logger("dev"));

app.use("/api/v1", ApiRoutes);

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

connectToDB(DB_STRING);
export type ISocket = typeof io;
