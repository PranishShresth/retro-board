import { Button, Textarea, Stack, IconButton } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { ObjectID } from "bson";
import { itemActions } from "../../reducers/itemReducer";
import { SocketContext } from "../../context/SocketContext";
import styled from "styled-components";
import { GiCrossMark } from "react-icons/gi";

interface Props {
  list_id: string;
}

const StyledButton = styled(Button)`
  background: #f7f7f7 !important;
  border: 1px solid #e6e7e9;
  color: #b7b8ba;
`;
function AddItem({ list_id }: Props) {
  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { formValues, handleChange, setFormValues } = useForm({
    item_title: "",
  });

  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleAddingItem = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      if (formValues.item_title === "") {
        return;
      }
      const id = new ObjectID().toString();
      const payload = {
        list: list_id,
        board: boardId,
        _id: id,
        ...formValues,
      };
      socket?.emit("CREATE_ITEM", payload);

      dispatch(itemActions.addItem(payload));

      dispatch({
        type: "CREATE_ITEM_REQUESTED",
        payload,
      });

      setFormValues({ item_title: "" });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!open && (
        <StyledButton
          leftIcon={<FaPlus />}
          fluid
          variant="solid"
          width="100%"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Item
        </StyledButton>
      )}
      {open && (
        <form onSubmit={handleAddingItem}>
          <Stack spacing={2}>
            <Textarea
              name="item_title"
              onChange={handleChange}
              placeholder="Add a Item"
              value={formValues.item_title}
              resize="none"
              focusBorderColor="blue.500"
              background="white"
            />
            <Stack direction="row" spacing={2}>
              <Button leftIcon={<FaPlus />} type="submit" variant="solid">
                Create
              </Button>
              <IconButton
                aria-label="cross"
                icon={<GiCrossMark />}
                size="md"
                onClick={close}
              />
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
}

export default AddItem;
