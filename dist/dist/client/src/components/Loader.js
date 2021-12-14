"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const react_1 = require("@chakra-ui/react");
const LoaderWrapper = styled_components_1.default.div `
  padding: 100px 0;
`;
const Loading = () => (<LoaderWrapper>
    <react_1.Spinner size="lg"/>
  </LoaderWrapper>);
exports.default = Loading;
//# sourceMappingURL=Loader.js.map