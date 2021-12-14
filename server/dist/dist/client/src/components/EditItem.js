"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const useForm_1 = require("./hooks/useForm");
function EditItem({ isOpen, onClose, content, item_id }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { formValues, handleChange, setFormValues } = (0, useForm_1.useForm)({
        item_title: content,
    });
    const handleEditingItem = (ev) => __awaiter(this, void 0, void 0, function* () {
        try {
            ev.preventDefault();
            dispatch({
                type: "UPDATE_ITEM_REQUESTED",
                payload: Object.assign({ item_id }, formValues),
            });
            setFormValues({ item_title: "" });
            onClose();
        }
        catch (err) {
            console.log(err);
        }
    });
    return (<>
      {isOpen && (<form onSubmit={handleEditingItem}>
          <react_1.Stack spacing={2}>
            <react_1.Textarea name="item_title" onChange={handleChange} placeholder="Do something!" value={formValues.item_title} resize="none" focusBorderColor="blue.500" background="white"/>
            <div>
              <react_1.Button 
        // leftIcon={<FaPlus />}
        type="submit" colorScheme="teal" variant="solid">
                Save
              </react_1.Button>
            </div>
          </react_1.Stack>
        </form>)}
    </>);
}
exports.default = EditItem;
//# sourceMappingURL=EditItem.js.map