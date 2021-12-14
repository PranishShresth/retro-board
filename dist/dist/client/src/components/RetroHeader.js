"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Header = styled_components_1.default.nav.attrs({ className: "header-bar" }) `
  background-color: #4863a9;
  color: #ffffff;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  font-weight: 800;
  padding: 10px 0;
`;
const HeaderBanner = styled_components_1.default.div `
  font-size: 18px;
`;
const Container = styled_components_1.default.div `
  width: 95%;
  margin: 0 auto;
`;
function RetroHeader() {
    return (<Header>
      <Container>
        <HeaderBanner>Retro Board</HeaderBanner>{" "}
      </Container>
    </Header>);
}
exports.default = RetroHeader;
//# sourceMappingURL=RetroHeader.js.map