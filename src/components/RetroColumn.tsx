import React from "react";
import styled from "styled-components";
import RetroCard from "./RetroCard";

const RetroColumnWrapper = styled.div`
  min-width: 250px;
  padding: 8px;
  background: rgb(235, 236, 240);
`;

const RetroColumnHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;
const RetroCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface Props {
  columnTitle: string;
}
export default function RetroColumn({ columnTitle }: Props) {
  return (
    <RetroColumnWrapper>
      <RetroColumnHeader>{columnTitle}</RetroColumnHeader>
      <RetroCardContainer>
        <RetroCard />
        <RetroCard /> <RetroCard /> <RetroCard />
      </RetroCardContainer>
    </RetroColumnWrapper>
  );
}
