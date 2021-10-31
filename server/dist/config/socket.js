"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
dotenv_1.config();
function socketIO(server, app) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });
    io.on("connection", function (socket) {
        const query = socket.handshake.query.boardId;
        if (query) {
            socket.join(query);
        }
        app.set("socket", socket);
        socket.emit("user", socket.id);
    });
    return io;
}
exports.default = socketIO;
//# sourceMappingURL=socket.js.map