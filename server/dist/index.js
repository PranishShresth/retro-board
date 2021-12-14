"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./config/db"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes"));
const socket_1 = __importDefault(require("./config/socket"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = (0, socket_1.default)(server, app);
const PORT = process.env.PORT || 5000;
(0, dotenv_1.config)();
const DB_STRING = process.env.MONGO_URI;
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set("socketio", io);
app.use("/api/v1", routes_1.default);
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
    app.get("*", (req, res, next) => {
        res.sendFile(path_1.default.join(__dirname, "../../client/build", "index.html"));
    });
}
server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
(0, db_1.default)(DB_STRING);
//# sourceMappingURL=index.js.map