import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { Express } from "express";
import { config } from "dotenv";
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  REORDER_ITEM,
  CREATE_LIST,
  DELETE_ITEM,
  DELETE_LIST,
  UPDATE_LIST,
} from "../utils/constants";
config();

function socketIO(server: HttpServer, app: Express) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", function (socket: Socket) {
    const query = socket.handshake.query.boardId as string;
    if (query) {
      socket.join(query);

      socket.on(CREATE_ITEM, (data) => {
        io.to(query).emit(CREATE_ITEM, data);
      });

      socket.on(REORDER_ITEM, (data) => {
        socket.to(query).emit(REORDER_ITEM, data);
      });

      socket.on(DELETE_ITEM, (data) => {
        socket.to(query).emit(DELETE_ITEM, data);
      });

      socket.on(DELETE_LIST, (data) => {
        socket.to(query).emit(DELETE_LIST, data);
      });

      socket.on(UPDATE_LIST, (data) => {
        socket.to(query).emit(UPDATE_LIST, data);
      });

      socket.on(UPDATE_ITEM, (data) => {
        socket.to(query).emit(UPDATE_ITEM, data);
      });

      socket.on(CREATE_LIST, (data) => {
        socket.to(query).emit(CREATE_LIST, data);
      });
    }
  });
  return io;
}

export default socketIO;
