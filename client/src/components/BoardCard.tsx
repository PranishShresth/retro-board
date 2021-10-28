import {
  Card,
  CardProps,
  Dropdown,
  Modal,
  Button,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import DeleteModal from "./Modal";
import AlertDialog from "./AlertDialog";
import { useDispatch } from "react-redux";

interface Props extends CardProps {
  to?: string;
  boardId: string;
}

const StyledCard = styled(Card)`
  margin: 0 auto !important;
  height: 80px;
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;
const options = [
  { key: "delete", text: "Delete", value: "delete" },
  { key: "edit", text: "Edit", value: "edit" },
  { key: "archive", text: "Archive", value: "archive" },
];

const BoardCard = (props: Props) => {
  const [choice, setChoice] = useState("");
  const dispatch = useDispatch();
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  useEffect(() => {
    if (choice === "delete") {
      setdeleteModalOpen(true);
    } else if (choice === "edit") {
    }
  }, [choice]);

  return (
    <>
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

      <AlertDialog
        isOpen={deleteModalOpen}
        onClose={() => setdeleteModalOpen(false)}
        onClick={() => {
          dispatch({
            type: "DELETE_BOARD_REQUESTED",
            payload: props.boardId,
          });
          setdeleteModalOpen(false);
        }}
        title="Delete Board"
      />
    </>
  );
};

export default BoardCard;
