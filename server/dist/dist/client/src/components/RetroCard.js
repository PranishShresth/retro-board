"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const itemReducer_1 = require("../reducers/itemReducer");
const layout_1 = require("@chakra-ui/layout");
const react_2 = require("@chakra-ui/react");
const fa_1 = require("react-icons/fa");
const EditItem_1 = __importDefault(require("./EditItem"));
const RetroCard = (0, react_1.memo)(({ content, item_id, provided, snapshot }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isOpen, onClose, onOpen } = (0, react_2.useDisclosure)();
    const deleteItem = (0, react_1.useCallback)(() => {
        dispatch(itemReducer_1.itemActions.deleteItem({ item_id }));
        dispatch({
            type: "DELETE_ITEM_REQUESTED",
            payload: { item_id },
        });
    }, [item_id, dispatch]);
    if (isOpen) {
        return (<EditItem_1.default item_id={item_id} content={content} isOpen={isOpen} onClose={onClose}/>);
    }
    return (<layout_1.Box padding="5px 12px" background={snapshot.isDragging ? "rgba(226, 231, 245, 255)" : "white"} display="flex" justifyContent="space-between" ref={provided.innerRef} alignItems="center" transition="background 100ms linear" {...provided.draggableProps} {...provided.dragHandleProps}>
      <layout_1.Text overflowWrap="anywhere">{content}</layout_1.Text>
      <layout_1.Stack direction="row">
        <react_2.Menu>
          <react_2.MenuButton as={react_2.Button} background="none !important">
            <react_2.Icon as={fa_1.FaEllipsisV}/>
          </react_2.MenuButton>
          <react_2.MenuList>
            <react_2.MenuItem onClick={onOpen}>Edit</react_2.MenuItem>
            <react_2.MenuItem onClick={deleteItem}>Delete</react_2.MenuItem>
          </react_2.MenuList>
        </react_2.Menu>
      </layout_1.Stack>
    </layout_1.Box>);
});
exports.default = RetroCard;
//# sourceMappingURL=RetroCard.js.map