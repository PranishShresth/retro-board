import RetroBoardSingle from "../components/RetroBoardSingle";
import RetroHeader from "../components/RetroHeader";

import { SocketProvider } from "../context/SocketContext";

export const RetroHome = () => {
  return (
    <SocketProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <RetroHeader />
        <RetroBoardSingle />
      </div>
    </SocketProvider>
  );
};

export default RetroHome;
