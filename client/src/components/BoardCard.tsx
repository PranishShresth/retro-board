import { Card, CardProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
interface Props extends CardProps {
  to?: string;
}
const BoardCard = (props: Props) => {
  return (
    <Link to={props.to ?? ""}>
      <Card {...props} />
    </Link>
  );
};

export default BoardCard;
