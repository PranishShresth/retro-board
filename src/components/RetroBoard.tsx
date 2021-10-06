import React,{useCallback} from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
`;

export default function RetroBoard() {
  const columnTitles = ["Yes", "No", "Hello"];  
  const onBeforeCapture = useCallback(() => {
    /*...*/
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback(() => {
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
      {columnTitles.map((item) => (
        <RetroColumn columnTitle={item} />
      ))}
    </ColumnsWrapper>
    <DragDropContext/>
  );
}
