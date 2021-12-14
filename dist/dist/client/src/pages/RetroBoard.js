"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetroHome = void 0;
const RetroBoardSingle_1 = __importDefault(require("../components/RetroBoardSingle"));
const RetroHeader_1 = __importDefault(require("../components/RetroHeader"));
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const react_router_1 = require("react-router");
const react_redux_1 = require("react-redux");
const itemReducer_1 = require("../reducers/itemReducer");
const listReducer_1 = require("../reducers/listReducer");
const RetroHome = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { boardId } = (0, react_router_1.useParams)();
    const [socket, setSocket] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const newSocket = (0, socket_io_client_1.io)("http://localhost:5000", {
            query: { boardId },
            transports: ["websocket"],
        });
        newSocket.on("new-list", function (data) {
            dispatch(listReducer_1.listActions.addList(data));
        });
        newSocket.on("new-item", function (data) {
            dispatch(itemReducer_1.itemActions.addItem(data));
        });
        newSocket.on("updated-item", function (data) {
            dispatch(itemReducer_1.itemActions.updateItem(data));
        });
        newSocket.on("reordered-item", function (data) {
            const { item, source_list_id, destination_list_id, position } = data;
            dispatch(itemReducer_1.itemActions.reorderItem({
                item_id: item._id,
                source: source_list_id,
                destination: destination_list_id,
                position: position,
            }));
        });
        setSocket(socket);
        return () => {
            newSocket.close();
        };
    }, [boardId, socket, dispatch]);
    return (<>
      <RetroHeader_1.default />
      <RetroBoardSingle_1.default />
    </>);
};
exports.RetroHome = RetroHome;
exports.default = exports.RetroHome;
//# sourceMappingURL=RetroBoard.js.map