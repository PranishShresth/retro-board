import { Card, CardProps, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
interface Props extends CardProps {
  to?: string;
  boardId: string;
}

const StyledCard = styled(Card)`
  margin: 0 auto !important;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;
const options = [
  { key: "delete", text: "Delete", value: "delete" },
  { key: "edit", text: "Edit", value: "edit" },
];

const BoardCard = (props: Props) => {
  const [choice, setChoice] = useState("");

  useEffect(() => {
    if (choice === "delete") {
    } else if (choice === "edit") {
    }
  }, [choice]);

  return (
    <StyledCard color="purple">
      <Card.Content>
        <Grid>
          <Link to={props.to ?? ""}>
            <Card.Header>{props.header}</Card.Header>
          </Link>
          <Dropdown
            upward
            onChange={(_, data) => {
              setChoice(data.value as string);
            }}
            value={choice}
            floating
            options={options}
            text=" "
            icon="ellipsis vertical"
          />
        </Grid>
      </Card.Content>
    </StyledCard>
  );
};

export default BoardCard;
