import styled from "styled-components";
import { Spinner } from "@chakra-ui/react";

const LoaderWrapper = styled.div`
  padding: 100px 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = () => (
  <LoaderWrapper>
    <Spinner size="lg" />
  </LoaderWrapper>
);

export default Loading;
