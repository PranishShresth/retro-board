import React from "react";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { GiStaryu } from "react-icons/gi";
import {
  getBoardLimit,
  boardSelector,
  getListCountsPerBoard,
} from "../utils/selectors";
import CreateList from "./List/CreateList";
import { useSelector } from "react-redux";
import styled from "styled-components";

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4687fd;
  width: 36px;
  color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;

const RetroBoardHeader = () => {
  const currentBoard = useSelector(boardSelector);
  const boardLimit = useSelector(getBoardLimit);
  const listCount = useSelector(getListCountsPerBoard);

  const showListCreation = boardLimit && boardLimit > listCount;
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      padding="25px 0 15px 24px"
      width="95%"
      margin="0 auto"
    >
      <Stack direction="row">
        <IconDiv>
          <Icon as={GiStaryu} w={6} h={6} />
        </IconDiv>
        <Text fontWeight={"500"} fontSize={"1.9rem"}>
          {currentBoard?.board_title}
        </Text>
      </Stack>

      {showListCreation && (
        <Box>
          <CreateList />
        </Box>
      )}
    </Stack>
  );
};

export default RetroBoardHeader;
