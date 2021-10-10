import express, { Response, Request } from "express";
import { config } from "dotenv";
import connectToDB from "./config/db";
import http from "http";
import ApiRoutes from "./routes";
import { Server } from "socket.io";
import logger from "morgan";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = process.env.PORT || 5000;
config();

const DB_STRING = process.env.MONGO_URI!;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("socketio", io);

app.use(logger("dev"));

app.use("/api/v1", ApiRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");
});
server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

connectToDB(DB_STRING);
