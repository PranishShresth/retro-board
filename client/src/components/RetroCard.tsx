import React, { memo, useCallback, useContext } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { itemActions } from "../reducers/itemReducer";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";

import EditItem from "./Item/EditItem";
import { SocketContext } from "../context/SocketContext";
import * as SE from "../context/socketTypes";
import styled from "styled-components";
interface Props {
  content: string;
  item_id: string;
  children?: React.ReactChild;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const StyledBox = styled(Box)`
  /* display: flex;
  justify-content: space-between; */
  /* align-items: center; */
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 1px 3px 1px;
  transition: background 100ms linear;
  border-radius: 5px;
`;

const ContentDiv = styled.div`
  padding-bottom: 5px;
`;
const RetroCard = memo(({ content, item_id, provided, snapshot }: Props) => {
  const { isOpen, onClose, onOpen: openEditBox } = useDisclosure();

  if (isOpen) {
    return (
      <EditItem
        item_id={item_id}
        content={content}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }
  return (
    <StyledBox
      padding="10px 12px"
      background={snapshot.isDragging ? "#e8e9ed" : "white"}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <ContentDiv>
        <Text overflowWrap="anywhere" fontWeight="bolder">
          {content}
        </Text>
      </ContentDiv>
      <Stack direction="row-reverse">
        <RetroCardActions item_id={item_id} openEditBox={openEditBox} />
      </Stack>
    </StyledBox>
  );
});

const RetroCardActions = ({
  item_id,
  openEditBox,
}: {
  item_id: string;
  openEditBox: () => void;
}) => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);

  const deleteItem = useCallback(() => {
    const payload = { item_id };
    dispatch(itemActions.deleteItem(payload));
    dispatch({
      type: "DELETE_ITEM_REQUESTED",
      payload,
    });
    socket?.emit(SE.DELETE_ITEM, payload);
  }, [dispatch, item_id, socket]);

  return (
    <>
      <IconButton
        aria-label="Edit Card"
        icon={<FaPencilAlt />}
        isRound
        size="xs"
        onClick={openEditBox}
      />
      <IconButton
        aria-label="Delete card"
        icon={<FaTrash />}
        isRound
        size="xs"
        onClick={deleteItem}
      />

      <IconButton aria-label="Like" icon={<GiSelfLove />} isRound size="xs" />
    </>
  );
};
export default RetroCard;
