"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("semantic-ui-css/semantic.min.css");
const App_1 = __importDefault(require("./App"));
const react_redux_1 = require("react-redux");
const react_2 = require("@chakra-ui/react");
const store_1 = __importDefault(require("./store"));
react_dom_1.default.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store_1.default}>
      <react_2.ChakraProvider>
        <App_1.default />
      </react_2.ChakraProvider>
    </react_redux_1.Provider>
  </react_1.default.StrictMode>, document.getElementById("root"));
//# sourceMappingURL=index.js.map