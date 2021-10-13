import RetroBoardSingle from "../components/RetroBoardSingle";
import RetroHeader from "../components/RetroHeader";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { boardActions } from "../reducers/boardReducer";

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
      dispatch(boardActions.updateBoard(data));
    });

    newSocket.on("updated-list", function (data) {
      dispatch(boardActions.updateList(data));
    });

    newSocket.on("updated-items", function (data) {
      const { list, item_id, source_list_id, destination_list_id } = data;
      console.log(data);
      dispatch(
        boardActions.updateItems({
          source_list_id,
          destination_list_id,
          items: list.items,
          item_id,
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
