import { Card, CardProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
interface Props extends CardProps {
  to?: string;
}
const BoardCard = (props: Props) => {
  return (
    <Link to={props.to ?? ""}>
      <Card
        {...props}
        meta="Friend"
        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
      />
    </Link>
  );
};

export default BoardCard;
