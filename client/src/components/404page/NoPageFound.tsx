import React from "react";
import Image from "../../images/404.png";
import styled from "styled-components";

const StyledDiv = styled.div`
  flex: 1;
  align-self: center;
  justify-self: center;
`;
const NoPageFound = () => {
  return (
    <StyledDiv>
      <img src={Image} alt="404 page" />
    </StyledDiv>
  );
};

export default NoPageFound;
