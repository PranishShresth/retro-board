import React from "react";
import styled from "styled-components";

const RetroColumnWrapper = styled.div`
  min-width: 250px;
`;

const RetroColumnHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
export default function RetroColumn() {
  return (
    <div>
      <RetroColumnHeader>Action Items?</RetroColumnHeader>
    </div>
  );
}
