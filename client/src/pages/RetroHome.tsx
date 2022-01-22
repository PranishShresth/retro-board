import styled from "styled-components";
import RetroDashBoard from "../components/RetroDashboard";
import RetroHeader from "../components/RetroHeader";
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
`;

export const RetroHome = () => {
  return (
    <AppWrapper>
      <RetroHeader />
      <RetroDashBoard />
    </AppWrapper>
  );
};

export default RetroHome;
