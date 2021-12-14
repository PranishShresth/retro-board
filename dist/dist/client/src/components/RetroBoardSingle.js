"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const RetroColumn_1 = __importDefault(require("./RetroColumn"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const selectors_1 = require("../utils/selectors");
const CreateList_1 = __importDefault(require("./CreateList"));
const dragndrop_1 = require("../utils/dragndrop");
const Loader_1 = __importDefault(require("./Loader"));
const itemReducer_1 = require("../reducers/itemReducer");
const RetroColumnHeader_1 = __importDefault(require("./RetroColumnHeader"));
const layout_1 = require("@chakra-ui/layout");
const ColumnsWrapper = styled_components_1.default.main `
  display: flex;
  gap: 20px;
  padding-top: 30px;
  overflow-x: auto;
  height: calc(100vh - 80px);
`;
const RetroColumnWrapper = styled_components_1.default.div `
  width: 300px;
  padding: 8px;
  background: rgb(235, 236, 240);
  display: flex;
  flex-direction: column;

  /* height: fit-content; */
`;
const Container = styled_components_1.default.div `
  width: 95%;
  margin: 0 auto;
`;
function RetroBoardSingle() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const params = (0, react_router_1.useParams)();
    const lists = (0, react_redux_1.useSelector)(selectors_1.listsSelector);
    const currentBoardLists = lists.filter((l) => l.board === params.boardId);
    const items = (0, react_redux_1.useSelector)(selectors_1.itemsSelector);
    const loading = (0, react_redux_1.useSelector)(selectors_1.loadingSelector);
    (0, react_1.useEffect)(() => {
        dispatch({ type: "FETCH_BOARD_REQUESTED", payload: params.boardId });
    }, [params.boardId, dispatch]);
    const onDragStart = (0, react_1.useCallback)(() => {
        console.log("draggin");
        /*...*/
    }, []);
    const onDragEnd = (0, react_1.useCallback)((result) => {
        const { source, destination, draggableId } = result;
        if (!(0, dragndrop_1.isPositionChanged)(source, destination))
            return;
        if (!destination)
            return;
        const position = (0, dragndrop_1.calculateItemPosition)(items, source, destination, draggableId);
        dispatch(itemReducer_1.itemActions.reorderItem({
            item_id: draggableId,
            source: source.droppableId,
            destination: destination.droppableId,
            position: position,
        }));
        dispatch({
            type: "REORDER_ITEM_REQUESTED",
            payload: {
                source_list_id: source.droppableId,
                destination_list_id: destination.droppableId,
                position: position,
                list_id: destination === null || destination === void 0 ? void 0 : destination.droppableId,
                item_id: draggableId,
            },
        });
    }, [items, dispatch]);
    if (loading) {
        return <Loader_1.default />;
    }
    return (<Container>
      <react_beautiful_dnd_1.DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <ColumnsWrapper>
          {currentBoardLists === null || currentBoardLists === void 0 ? void 0 : currentBoardLists.map((list) => {
            return (<layout_1.Box>
                <RetroColumnWrapper>
                  <RetroColumnHeader_1.default list_id={list._id} list_title={list.list_title}/>
                  <react_beautiful_dnd_1.Droppable droppableId={list._id} key={list._id}>
                    {(provided) => (<RetroColumn_1.default droppableProvided={provided} items={list.items} list_id={list._id} title={list.list_title}/>)}
                  </react_beautiful_dnd_1.Droppable>
                </RetroColumnWrapper>
              </layout_1.Box>);
        })}
          <layout_1.Box minWidth="300px">
            <CreateList_1.default />
          </layout_1.Box>
        </ColumnsWrapper>
      </react_beautiful_dnd_1.DragDropContext>
    </Container>);
}
exports.default = RetroBoardSingle;
//# sourceMappingURL=RetroBoardSingle.js.map