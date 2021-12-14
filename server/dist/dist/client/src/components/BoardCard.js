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
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const react_1 = __importStar(require("react"));
const AlertDialog_1 = __importDefault(require("./AlertDialog"));
const react_redux_1 = require("react-redux");
const Modal_1 = __importDefault(require("./Modal"));
const react_2 = require("@chakra-ui/react");
const fa_1 = require("react-icons/fa");
const useForm_1 = require("./hooks/useForm");
const boardReducer_1 = require("../reducers/boardReducer");
const Grid = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
`;
const BoardCard = (props) => {
    var _a;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isOpen, onClose, onOpen } = (0, react_2.useDisclosure)();
    const { formValues, handleChange } = (0, useForm_1.useForm)({
        board_title: props.header,
    });
    const [deleteModalOpen, setdeleteModalOpen] = (0, react_1.useState)(false);
    const handleEditBoard = (ev) => {
        try {
            ev.preventDefault();
            if (formValues.board_title.length < 1) {
                return;
            }
            dispatch({
                type: "UPDATE_BOARD_REQUESTED",
                payload: Object.assign({ board_id: props.boardId }, formValues),
            });
            dispatch(boardReducer_1.boardActions.updateBoardDetails(Object.assign({ _id: props.boardId }, formValues)));
            onClose();
        }
        catch (err) {
            console.log(err);
        }
    };
    return (<>
      <react_2.Box borderWidth="1px" borderRadius="lg" overflow="hidden" backgroundColor="gray.100" padding="10px" height="60px">
        <Grid>
          <react_router_dom_1.Link to={(_a = props.to) !== null && _a !== void 0 ? _a : ""}>
            <react_2.Text fontSize="lg" color="#4b5489" fontWeight="700">
              {props.header}
            </react_2.Text>
          </react_router_dom_1.Link>
          <react_2.Menu>
            <react_2.MenuButton background="none !important">
              <react_2.Icon as={fa_1.FaEllipsisV}/>
            </react_2.MenuButton>
            <react_2.MenuList>
              <react_2.MenuItem onClick={onOpen}>Edit</react_2.MenuItem>
              <react_2.MenuItem>Archive</react_2.MenuItem>
              <react_2.MenuItem onClick={() => setdeleteModalOpen(true)}>
                Delete
              </react_2.MenuItem>
            </react_2.MenuList>
          </react_2.Menu>
        </Grid>
      </react_2.Box>

      <Modal_1.default modalTitle="Edit Board Details" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <form onSubmit={handleEditBoard}>
          <react_2.Stack spacing={3}>
            <react_2.InputGroup>
              <react_2.Input type="text" name="board_title" value={formValues.board_title} placeholder="Board Title" onChange={handleChange}/>
            </react_2.InputGroup>

            <div>
              <react_2.Button type="submit">Update board</react_2.Button>
            </div>
          </react_2.Stack>
        </form>
      </Modal_1.default>
      <AlertDialog_1.default isOpen={deleteModalOpen} onClose={() => setdeleteModalOpen(false)} onClick={() => {
            dispatch({
                type: "DELETE_BOARD_REQUESTED",
                payload: props.boardId,
            });
            setdeleteModalOpen(false);
        }} title="Delete Board"/>
    </>);
};
exports.default = BoardCard;
//# sourceMappingURL=BoardCard.js.map