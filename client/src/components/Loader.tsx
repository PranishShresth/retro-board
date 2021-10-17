import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  padding: 100px 0;
`;

const Loading = () => (
  <LoaderWrapper>
    <Dimmer active inverted>
      <Loader size="medium" inverted content="Loading" />
    </Dimmer>
  </LoaderWrapper>
);

export default Loading;
