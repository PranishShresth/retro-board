import React from "react";
import RetroColumn from "./RetroColumn";
import styled from "styled-components";

const ColumnsWrapper = styled.main`
  display: flex;
  gap: 20px;
`;

export default function RetroBoard() {
  const columnTitles = ["Yes", "No", "Hello"];
  return (
    <ColumnsWrapper>
      {columnTitles.map((item) => (
        <RetroColumn columnTitle={item} />
      ))}
    </ColumnsWrapper>
  );
}
