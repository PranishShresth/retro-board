import { Button, Textarea, Stack } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "./hooks/useForm";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import { ObjectID } from "bson";
import { itemActions } from "../reducers/itemReducer";

interface Props {
  isOpen: boolean;
  content: string;
  onClose: () => void;
}
function EditItem({ isOpen, onClose, content }: Props) {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useDispatch();
  const { formValues, handleChange, setFormValues } = useForm({
    item_title: content,
  });

  const handleEditingItem = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      const id = new ObjectID().toString();

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
