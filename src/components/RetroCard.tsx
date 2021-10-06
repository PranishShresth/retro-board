import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: 8px;
  background: white;
`;

const CardContent = styled.div`
  font-size: 15px;
`;
export default function RetroCard() {
  return (
    <StyledCard>
      <CardContent> hi there</CardContent>
    </StyledCard>
  );
}
