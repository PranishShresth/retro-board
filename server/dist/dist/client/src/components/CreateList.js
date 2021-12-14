"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const Modal_1 = __importDefault(require("./Modal"));
const useForm_1 = require("./hooks/useForm");
const react_router_1 = require("react-router");
const bson_1 = require("bson");
const hooks_1 = require("@chakra-ui/hooks");
const input_1 = require("@chakra-ui/input");
const layout_1 = require("@chakra-ui/layout");
const button_1 = require("@chakra-ui/button");
const CreateList = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isOpen, onOpen, onClose } = (0, hooks_1.useDisclosure)();
    const { boardId } = (0, react_router_1.useParams)();
    const { formValues, handleChange, setFormValues } = (0, useForm_1.useForm)({
        list_title: "",
    });
    const handleCreateList = (ev) => {
        try {
            ev.preventDefault();
            if (formValues.list_title.length < 1) {
                return;
            }
            const id = new bson_1.ObjectID().toString();
            dispatch({
                type: "CREATE_LIST_REQUESTED",
                payload: Object.assign(Object.assign({}, formValues), { _id: id, board_id: boardId }),
            });
            setFormValues({ list_title: "" });
            onClose();
        }
        catch (err) {
            console.log(err);
        }
    };
    return (<>
      <Modal_1.default modalTitle="List Creation" triggerName="Create a List" isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <form onSubmit={handleCreateList}>
          <layout_1.Stack spacing={3}>
            <input_1.InputGroup>
              <input_1.Input type="text" name="list_title" value={formValues.list_title} placeholder="List Title" onChange={handleChange}/>
            </input_1.InputGroup>
            <div>
              <button_1.Button type="submit">Create List</button_1.Button>
            </div>
          </layout_1.Stack>
        </form>
      </Modal_1.default>
    </>);
};
exports.default = CreateList;
//# sourceMappingURL=CreateList.js.map