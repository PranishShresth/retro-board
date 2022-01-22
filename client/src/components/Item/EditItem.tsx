import { Button, Textarea, Stack, IconButton } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../../context/SocketContext";
import { useForm } from "../hooks/useForm";
import * as SE from "../../context/socketTypes";
import { itemActions } from "../../reducers/itemReducer";
import { IoMdClose } from "react-icons/io";

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

      const payload = { _id: item_id, ...formValues };

      dispatch(itemActions.updateItem(payload));
      dispatch({
        type: "UPDATE_ITEM_REQUESTED",
        payload,
      });
      socket?.emit(SE.UPDATE_ITEM, payload);
      setFormValues({ item_title: "" });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isOpen && (
        <form onSubmit={handleEditingItem} style={{ padding: "20px 0" }}>
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
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="solid">
                Save
              </Button>

              <IconButton
                aria-label="cross"
                icon={<IoMdClose />}
                size="md"
                onClick={onClose}
              />
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
}

export default EditItem;
