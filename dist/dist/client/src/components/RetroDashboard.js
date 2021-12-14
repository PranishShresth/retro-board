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
const selectors_1 = require("../utils/selectors");
const useForm_1 = require("./hooks/useForm");
const layout_1 = require("@chakra-ui/layout");
const hooks_1 = require("@chakra-ui/hooks");
const react_2 = require("@chakra-ui/react");
const BoardCard_1 = __importDefault(require("./BoardCard"));
const styled_components_1 = __importDefault(require("styled-components"));
const Modal_1 = __importDefault(require("./Modal"));
const Loader_1 = __importDefault(require("./Loader"));
const BoardsContainer = styled_components_1.default.div `
  padding-top: 50px;
  width: 95%;
  margin: 0 auto;
`;
const RetroDashBoard = react_1.default.memo(() => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const toast = (0, react_2.useToast)();
    const { isOpen, onOpen, onClose } = (0, hooks_1.useDisclosure)();
    const boards = (0, react_redux_1.useSelector)(selectors_1.boardsSelector);
    const loading = (0, react_redux_1.useSelector)(selectors_1.loadingSelector);
    const { formValues, handleChange } = (0, useForm_1.useForm)({
        board_title: "",
    });
    (0, react_1.useEffect)(() => {
        dispatch({ type: "FETCH_BOARDS_REQUESTED" });
    }, [dispatch]);
    const handleCreateBoard = (ev) => {
        try {
            ev.preventDefault();
            if (formValues.board_title.length < 1) {
                return;
            }
            dispatch({ type: "CREATE_BOARD_REQUESTED", payload: formValues });
            toast({
                title: "Board Created",
                description: "We've created your board for you.",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            onClose();
        }
        catch (err) {
            console.log(err);
        }
    };
    if (loading) {
        return <Loader_1.default />;
    }
    return (<>
      <BoardsContainer>
        <layout_1.Grid templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
        }} justifyContent="center" gap={6}>
          {boards === null || boards === void 0 ? void 0 : boards.map((board) => {
            return (<BoardCard_1.default to={`/board/${board._id}`} header={board.board_title} boardId={board._id}/>);
        })}
          <react_2.Box>
            <Modal_1.default modalTitle="Create Board" isOpen={isOpen} onOpen={onOpen} onClose={onClose} triggerName="Create new Board">
              <form onSubmit={handleCreateBoard}>
                <layout_1.Stack spacing={3}>
                  <react_2.InputGroup>
                    <react_2.Input type="text" name="board_title" value={formValues.board_title} placeholder="Board Title" onChange={handleChange}/>
                  </react_2.InputGroup>

                  <div>
                    <react_2.Button type="submit">Create Board</react_2.Button>
                  </div>
                </layout_1.Stack>
              </form>
            </Modal_1.default>
          </react_2.Box>
        </layout_1.Grid>
      </BoardsContainer>
    </>);
});
exports.default = RetroDashBoard;
//# sourceMappingURL=RetroDashboard.js.map