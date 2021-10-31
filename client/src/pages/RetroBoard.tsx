import RetroBoardSingle from "../components/RetroBoardSingle";
import RetroHeader from "../components/RetroHeader";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { listActions } from "../reducers/listReducer";

interface boardParams {
  boardId: string;
}
export const RetroHome = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams<boardParams>();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      query: { boardId },
      transports: ["websocket"],
    });

    newSocket.on("new-list", function (data) {
      dispatch(listActions.addList(data));
    });

    newSocket.on("new-item", function (data) {
      dispatch(itemActions.addItem(data));
    });

    newSocket.on("updated-item", function (data) {
      dispatch(itemActions.updateItem(data));
    });

    newSocket.on("reordered-item", function (data) {
      const { item, source_list_id, destination_list_id, position } = data;
      dispatch(
        itemActions.reorderItem({
          item_id: item._id,
          source: source_list_id,
          destination: destination_list_id,
          position: position,
        })
      );
    });

    setSocket(socket);
    // setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [boardId, socket, dispatch]);

  return (
    <>
      <RetroHeader />
      <RetroBoardSingle />
    </>
  );
};

export default RetroHome;
