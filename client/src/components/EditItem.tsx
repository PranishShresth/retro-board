import { Button, Textarea, Stack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { useForm } from "./hooks/useForm";
import * as SE from "../context/socketTypes";

interface Props {
  isOpen: boolean;
  content: string;
  item_id: string;
  onClose: () => void;
}
function EditItem({ isOpen, onClose, content, item_id }: Props) {
  const dispatch = useDispatch();
  const { formValues, handleChange, setFormValues } = useForm({
    item_title: content,
  });
  const { socket } = useContext(SocketContext);

  const handleEditingItem = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      dispatch({
        type: "UPDATE_ITEM_REQUESTED",
        payload: { item_id, ...formValues },
      });
      socket?.emit(SE.UPDATE_ITEM, { item_id, ...formValues });
      setFormValues({ item_title: "" });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isOpen && (
        <form onSubmit={handleEditingItem}>
          <Stack spacing={2}>
            <Textarea
              name="item_title"
              onChange={handleChange}
              placeholder="Do something!"
              value={formValues.item_title}
              resize="none"
              focusBorderColor="blue.500"
              background="white"
            />
            <div>
              <Button
                // leftIcon={<FaPlus />}
                type="submit"
                colorScheme="teal"
                variant="solid"
              >
                Save
              </Button>
            </div>
          </Stack>
        </form>
      )}
    </>
  );
}

export default EditItem;
