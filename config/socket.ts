import { Server } from "socket.io";
import { Server as HttpServer } from "http";

function socketIO(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  return io;
}

export default socketIO;
