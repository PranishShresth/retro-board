"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketProvider = exports.SocketContext = void 0;
const react_1 = require("react");
exports.SocketContext = (0, react_1.createContext)({ socket: null });
const SocketProvider = () => {
    const [clientSocket, setClientSocket] = (0, react_1.useState)({ socket: null });
    return (<exports.SocketContext.Provider value={{ socket: clientSocket.socket, setClientSocket }}></exports.SocketContext.Provider>);
};
exports.SocketProvider = SocketProvider;
//# sourceMappingURL=SocketContext.js.map