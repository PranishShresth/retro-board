import styled from "styled-components";

const Header = styled.nav.attrs({ className: "header-bar" })`
  background-color: #f7f4e9;
  color: #e40c2b;
  font-weight: 800;
  padding: 20px 0;
`;
const HeaderBanner = styled.div``;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;
export default function RetroHeader() {
  return (
    <Header>
      <Container>
        <HeaderBanner>Retro Board</HeaderBanner>{" "}
      </Container>
    </Header>
  );
}
