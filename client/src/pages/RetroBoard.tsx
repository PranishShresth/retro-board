import RetroBoardSingle from "../components/RetroBoardSingle";
import RetroHeader from "../components/RetroHeader";

import { SocketProvider } from "../context/SocketContext";

export const RetroHome = () => {
  return (
    <SocketProvider>
      <RetroHeader />
      <RetroBoardSingle />
    </SocketProvider>
  );
};

export default RetroHome;
