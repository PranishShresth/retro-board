"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetroHome = void 0;
const RetroDashboard_1 = __importDefault(require("../components/RetroDashboard"));
const RetroHeader_1 = __importDefault(require("../components/RetroHeader"));
const RetroHome = () => {
    return (<>
      <RetroHeader_1.default />
      <RetroDashboard_1.default />
    </>);
};
exports.RetroHome = RetroHome;
exports.default = exports.RetroHome;
//# sourceMappingURL=RetroHome.js.map