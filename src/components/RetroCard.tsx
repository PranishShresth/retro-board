import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  padding: 8px;
  background: white;
`;

const CardContent = styled.div`
  font-size: 15px;
`;

interface Props {
  content: string;
}

const RetroCard = ({ content }: Props) => {
  return (
    <StyledCard>
      <CardContent>{content}</CardContent>
    </StyledCard>
  );
};
export default RetroCard;
