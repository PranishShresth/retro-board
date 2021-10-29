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
  Box,
  Icon,
  Text,
} from "@chakra-ui/react";

import { FaEllipsisV } from "react-icons/fa";
interface Props {
  to?: string;
  boardId: string;
  header: string;
}

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoardCard = (props: Props) => {
  const dispatch = useDispatch();
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="gray.100"
        padding="10px"
        height="60px"
      >
        <Grid>
          <Link to={props.to ?? ""}>
            <Text fontSize="lg" color="#4b5489" fontWeight="700">
              {props.header}
            </Text>
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
      </Box>

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
