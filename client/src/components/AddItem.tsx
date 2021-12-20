import { Button, Textarea, Stack } from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "./hooks/useForm";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { ObjectID } from "bson";
import { itemActions } from "../reducers/itemReducer";
import { SocketContext } from "../context/SocketContext";

interface Props {
  list_id: string;
}
function AddItem({ list_id }: Props) {
  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const { formValues, handleChange, setFormValues } = useForm({
    item_title: "",
  });

  const [open, setOpen] = useState(false);

  const handleAddingItem = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      const id = new ObjectID().toString();
      const payload = {
        list: list_id,
        board: boardId,
        _id: id,
        ...formValues,
      };
      socket?.emit("CREATE_ITEM", payload);

      dispatch(
        itemActions.addItem({
          _id: id,
          list: list_id,
          board: boardId,
          ...formValues,
        })
      );

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
        <Button
          leftIcon={<FaPlus />}
          fluid
          width="100%"
          colorScheme="facebook"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Add a Item
        </Button>
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
            <div>
              <Button
                leftIcon={<FaPlus />}
                type="submit"
                colorScheme="teal"
                variant="solid"
              >
                Create
              </Button>
            </div>
          </Stack>
        </form>
      )}
    </>
  );
}

export default AddItem;
