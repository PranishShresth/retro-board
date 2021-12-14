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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const useForm_1 = require("./hooks/useForm");
const fa_1 = require("react-icons/fa");
const react_router_1 = require("react-router");
const bson_1 = require("bson");
const itemReducer_1 = require("../reducers/itemReducer");
function AddItem({ list_id }) {
    const { boardId } = (0, react_router_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const { formValues, handleChange, setFormValues } = (0, useForm_1.useForm)({
        item_title: "",
    });
    const [open, setOpen] = (0, react_2.useState)(false);
    const handleAddingItem = (ev) => __awaiter(this, void 0, void 0, function* () {
        try {
            ev.preventDefault();
            const id = new bson_1.ObjectID().toString();
            dispatch(itemReducer_1.itemActions.addItem(Object.assign({ _id: id, list: list_id, board: boardId }, formValues)));
            dispatch({
                type: "CREATE_ITEM_REQUESTED",
                payload: Object.assign({ list: list_id, board: boardId, _id: id }, formValues),
            });
            setFormValues({ item_title: "" });
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    });
    return (<>
      {!open && (<react_1.Button leftIcon={<fa_1.FaPlus />} fluid width="100%" colorScheme="facebook" onClick={() => {
                setOpen(!open);
            }}>
          Add a Item
        </react_1.Button>)}
      {open && (<form onSubmit={handleAddingItem}>
          <react_1.Stack spacing={2}>
            <react_1.Textarea name="item_title" onChange={handleChange} placeholder="Add a Item" value={formValues.item_title} resize="none" focusBorderColor="blue.500" background="white"/>
            <div>
              <react_1.Button leftIcon={<fa_1.FaPlus />} type="submit" colorScheme="teal" variant="solid">
                Create
              </react_1.Button>
            </div>
          </react_1.Stack>
        </form>)}
    </>);
}
exports.default = AddItem;
//# sourceMappingURL=AddItem.js.map