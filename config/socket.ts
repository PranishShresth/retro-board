import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { Express } from "express";

function socketIO(server: HttpServer, app: Express) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", function (socket: Socket) {
    console.log("user connected", socket.id);
    socket.emit("user", socket.id);
    app.set("socket", socket);
  });
  return io;
}

export default socketIO;
