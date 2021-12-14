"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const RetroHome_1 = __importDefault(require("./pages/RetroHome"));
const RetroBoard_1 = __importDefault(require("./pages/RetroBoard"));
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Switch>
        <react_router_dom_1.Route exact path="/" component={RetroHome_1.default}/>
        <react_router_dom_1.Route exact path="/board/:boardId" component={RetroBoard_1.default}/>
      </react_router_dom_1.Switch>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
//# sourceMappingURL=App.js.map