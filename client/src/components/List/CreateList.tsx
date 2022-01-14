import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import { useForm } from "../hooks/useForm";
import { useParams } from "react-router";
import { ObjectID } from "bson";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input, InputGroup } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { SocketContext } from "../../context/SocketContext";
import * as SE from "../../context/socketTypes";
import { listActions } from "../../reducers/listReducer";

interface FormParam {
  boardId: string;
}
const CreateList = () => {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { boardId } = useParams<FormParam>();

  const { formValues, handleChange, setFormValues } = useForm({
    list_title: "",
  });

  const handleCreateList = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();

      if (formValues.list_title.length < 1) {
        return;
      }
      const id = new ObjectID().toString();

      const payload = { ...formValues, _id: id, board: boardId };

      dispatch({
        type: "CREATE_LIST_REQUESTED",
        payload,
      });

      socket?.emit(SE.CREATE_LIST, payload);

      dispatch(listActions.addList(payload));

      setFormValues({ list_title: "" });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        modalTitle="List Creation"
        triggerName="Add"
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      >
        <form onSubmit={handleCreateList}>
          <Stack spacing={3}>
            <InputGroup>
              <Input
                type="text"
                name="list_title"
                value={formValues.list_title}
                placeholder="List Title"
                onChange={handleChange}
              />
            </InputGroup>
            <div>
              <Button type="submit">Create List</Button>
            </div>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default CreateList;
