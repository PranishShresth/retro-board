"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = require("react");
const useForm = (initialState) => {
    const [formValues, setFormValues] = (0, react_1.useState)(initialState);
    const handleChange = (event) => {
        setFormValues((prevValues) => (Object.assign(Object.assign({}, prevValues), { [event.target.name]: event.target.value })));
    };
    return { formValues, handleChange, setFormValues };
};
exports.useForm = useForm;
//# sourceMappingURL=useForm.js.map