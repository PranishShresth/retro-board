import React from "react";
import styled from "styled-components";

const Header = styled.nav`
  background-color: #f6f6f6;
  padding: 20px;
`;
const HeaderBanner = styled.div``;
export default function RetroHeader() {
  return (
    <Header>
      <HeaderBanner>Retro Board</HeaderBanner>
    </Header>
  );
}
