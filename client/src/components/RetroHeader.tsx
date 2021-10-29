import styled from "styled-components";

const Header = styled.nav.attrs({ className: "header-bar" })`
  background-color: #4863a9;
  color: #ffffff;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 5%);
  font-weight: 800;
  padding: 10px 0;
`;
const HeaderBanner = styled.div`
  font-size: 18px;
`;

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
