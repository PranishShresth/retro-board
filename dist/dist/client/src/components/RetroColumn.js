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
const styled_components_1 = __importDefault(require("styled-components"));
const RetroCard_1 = __importDefault(require("./RetroCard"));
const AddItem_1 = __importDefault(require("./AddItem"));
const react_redux_1 = require("react-redux");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const selectors_1 = require("../utils/selectors");
const RetroCardContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  min-height: 1px;
`;
const BottomListButton = styled_components_1.default.div `
  margin-top: 10px;
`;
const RetroColumn = (0, react_1.memo)(({ list_id, droppableProvided }) => {
    const items = (0, react_redux_1.useSelector)(selectors_1.itemsSelector);
    const memoizedListItems = (0, react_1.useMemo)(() => {
        return items
            .filter((item) => item.list === list_id)
            .sort((a, b) => a.order - b.order);
    }, [items, list_id]);
    return (<>
      <RetroCardContainer ref={droppableProvided === null || droppableProvided === void 0 ? void 0 : droppableProvided.innerRef}>
        {memoizedListItems.map((item, index) => {
            return (<react_beautiful_dnd_1.Draggable draggableId={item._id} index={index} key={item._id}>
              {(provided, snapshot) => (<RetroCard_1.default provided={provided} snapshot={snapshot} content={item.item_title} item_id={item._id} list_id={list_id}/>)}
            </react_beautiful_dnd_1.Draggable>);
        })}

        {droppableProvided === null || droppableProvided === void 0 ? void 0 : droppableProvided.placeholder}
      </RetroCardContainer>
      <BottomListButton>
        <AddItem_1.default list_id={list_id}/>
      </BottomListButton>
    </>);
});
exports.default = RetroColumn;
//# sourceMappingURL=RetroColumn.js.map