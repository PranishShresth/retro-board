import { Card, CardProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import AlertDialog from "./AlertDialog";
import { useDispatch } from "react-redux";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
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

const BoardCard = (props: Props) => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  return (
    <>
      <StyledCard color="purple">
        <Card.Content>
          <Grid>
            <Link to={props.to ?? ""}>
              <Card.Header>{props.header}</Card.Header>
            </Link>
            <Menu>
              <MenuButton as={Button}>
                <Icon as={FaEllipsisV} />
              </MenuButton>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Archive</MenuItem>
                <MenuItem onClick={() => setdeleteModalOpen(true)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
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
