"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_1 = require("react-redux");
const useForm_1 = require("./hooks/useForm");
const input_1 = require("@chakra-ui/input");
const listReducer_1 = require("../reducers/listReducer");
const RetroColumnHeader = styled_components_1.default.div `
  font-weight: bold;
  font-size: 1.2rem;

  padding: 12px 14px;
`;
function RetroColumnListHeader({ list_title, list_id }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [editMode, setEditMode] = (0, react_1.useState)(false);
    const { handleChange, formValues } = (0, useForm_1.useForm)({ list_title: list_title });
    const updateList = () => {
        if (formValues.list_title.length < 1) {
            return;
        }
        dispatch({
            type: "UPDATE_LIST_REQUESTED",
            payload: Object.assign({ list_id }, formValues),
        });
        dispatch(listReducer_1.listActions.updateList(Object.assign({ _id: list_id }, formValues)));
        setEditMode(false);
    };
    const handleSubmit = (ev) => {
        try {
            const { key } = ev;
            if (key === "Enter") {
                return updateList();
            }
            // updateList();
        }
        catch (err) { }
    };
    return (<>
      {editMode ? (<input_1.Input autoFocus fontWeight="bold" variant="filled" placeholder="List Title" name="list_title" onChange={handleChange} onBlur={handleSubmit} onKeyDown={handleSubmit} value={formValues.list_title}/>) : (<RetroColumnHeader onClick={() => setEditMode(true)}>
          {list_title}
        </RetroColumnHeader>)}
    </>);
}
exports.default = RetroColumnListHeader;
//# sourceMappingURL=RetroColumnHeader.js.map