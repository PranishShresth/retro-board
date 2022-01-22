import RetroBoardSingle from "../components/RetroBoardSingle";
import RetroHeader from "../components/RetroHeader";

import { SocketProvider } from "../context/SocketContext";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
`;

export const RetroHome = () => {
  return (
    <SocketProvider>
      <AppWrapper>
        <RetroHeader />
        <RetroBoardSingle />
      </AppWrapper>
    </SocketProvider>
  );
};

export default RetroHome;
