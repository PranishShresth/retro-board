import { Dimmer, Loader, Segment } from "semantic-ui-react";

const Loading = () => (
  <div>
    <Segment>
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    </Segment>
  </div>
);

export default Loading;
