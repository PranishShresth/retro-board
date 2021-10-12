import RetroBoardSingle from "../components/RetroBoardSingle";
import RetroHeader from "../components/RetroHeader";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router";

interface boardParams {
  boardId: string;
}
export const RetroHome = () => {
  const { boardId } = useParams<boardParams>();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      query: { boardId },
      transports: ["websocket"],
    });
    newSocket?.emit("damn", "boi");

    setSocket(socket);
    // setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [boardId, socket]);

  return (
    <>
      <RetroHeader />
      <RetroBoardSingle />
    </>
  );
};

export default RetroHome;
