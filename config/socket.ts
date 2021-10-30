import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { Express } from "express";
import { config } from "dotenv";
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
    }
    app.set("socket", socket);

    socket.emit("user", socket.id);
  });
  return io;
}

export default socketIO;
