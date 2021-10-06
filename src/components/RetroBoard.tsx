import React, { useCallback } from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
`;

export default function RetroBoard() {
  const columnTitles = ["Yes"];
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
        {columnTitles.map((item, index) => (
          <Droppable droppableId={`droppable-${index}`}>
            {(provided, snapshot) => (
              <RetroColumn
                ref={provided.innerRef}
                droppableProvided={provided}
                columnTitle={item}
              />
            )}
          </Droppable>
        ))}
      </ColumnsWrapper>
    </DragDropContext>
  );
}
