import { Card, CardProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface Props extends CardProps {
  to?: string;
}

const StyledCard = styled(Card)`
  margin: 0 auto !important;
`;
const BoardCard = (props: Props) => {
  return (
    <Link to={props.to ?? ""}>
      <StyledCard {...props} color="purple" />
    </Link>
  );
};

export default BoardCard;
