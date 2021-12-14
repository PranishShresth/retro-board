import { createContext, useState } from "react";
import { Socket } from "socket.io-client";

interface CSocket {
  socket: Socket | null;
  setClientSocket?: React.Dispatch<React.SetStateAction<CSocket>>;
}
export const SocketContext = createContext<CSocket>({ socket: null });

export const SocketProvider = () => {
  const [clientSocket, setClientSocket] = useState<CSocket>({ socket: null });

  return (
    <SocketContext.Provider
      value={{ socket: clientSocket.socket, setClientSocket }}
    ></SocketContext.Provider>
  );
};
