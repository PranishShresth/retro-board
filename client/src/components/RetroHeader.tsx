import React from "react";
import styled from "styled-components";
import { Container } from "semantic-ui-react";

const Header = styled.nav`
  background-color: #f6f6f6;
  padding: 20px 0;
`;
const HeaderBanner = styled.div``;
export default function RetroHeader() {
  return (
    <Header>
      <Container>
        <HeaderBanner>Retro Board</HeaderBanner>{" "}
      </Container>
    </Header>
  );
}
