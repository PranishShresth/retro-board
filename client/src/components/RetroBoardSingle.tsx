import React, { useCallback } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
`;

export default function RetroBoardSingle() {
  const twoColumns = [
    {
      columnTitle: "Yes",
      columnData: [
        { content: "Hey what are you doing", id: 12321 },
        { content: "Hey what are you doing 232", id: 12322321 },
      ],
    },
    {
      columnTitle: "No",
      columnData: [
        { content: "Hey what are you doing 12321312", id: 12232321 },
        { content: "Hey what are you doing 2321 3212", id: 12323222321 },
      ],
    },
    {
      columnTitle: "Npe!o",
      columnData: [
        { content: "Hey what are you doing 12321312", id: 1222332321 },
        { content: "Hey what are you doing 2321 3212", id: 12322323222321 },
      ],
    },
  ];
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    console.log("draggin");
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
    /*...*/
  }, []);
  // the only one that is
  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <ColumnsWrapper>
        {twoColumns.map((item, index) => (
          <Droppable droppableId={`droppable-${index}`}>
            {(provided, snapshot) => (
              <RetroColumn droppableProvided={provided} columnData={item} />
            )}
          </Droppable>
        ))}
      </ColumnsWrapper>
    </DragDropContext>
  );
}
