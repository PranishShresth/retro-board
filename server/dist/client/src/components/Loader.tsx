import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import { Spinner } from "@chakra-ui/react";

const LoaderWrapper = styled.div`
  padding: 100px 0;
`;

const Loading = () => (
  <LoaderWrapper>
    <Spinner size="lg" />
  </LoaderWrapper>
);

export default Loading;
