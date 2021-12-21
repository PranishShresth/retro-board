import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { listActions } from "../reducers/listReducer";
import { itemActions } from "../reducers/itemReducer";
import { getSocketConfig } from "../utils/config";
import * as SE from "./socketTypes";
interface CSocket {
  socket: Socket | null;
}
export const SocketContext = createContext<CSocket>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSocket, setClientSocket] = useState<Socket | null>(null);
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(getSocketConfig(), {
      query: { boardId },
      transports: ["websocket"],
    });

    newSocket.on(SE.CREATE_LIST, (data) => {
      dispatch(listActions.addList(data));
    });

    newSocket.on(SE.DELETE_LIST, (data) => {
      dispatch(listActions.removeFromList(data));
    });

    newSocket.on(SE.DELETE_ITEM, (data) => {
      dispatch(itemActions.deleteItem(data));
    });

    newSocket.on(SE.CREATE_ITEM, (data) => {
      dispatch(itemActions.addItem(data));
    });

    newSocket.on(SE.UPDATE_ITEM, (data) => {
      dispatch(itemActions.updateItem(data));
    });

    newSocket.on(SE.REORDER_ITEM, (data) => {
      const { item_id, source_list_id, destination_list_id, position } = data;
      dispatch(
        itemActions.reorderItem({
          item_id,
          source: source_list_id,
          destination: destination_list_id,
          position: position,
        })
      );
    });

    setClientSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [boardId, dispatch]);

  return (
    <SocketContext.Provider value={{ socket: clientSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
