import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RetroModal from "./Modal";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "./hooks/useForm";
import { useParams } from "react-router";

interface FormParam {
  boardId: string;
}
const CreateList = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const { boardId } = useParams<FormParam>();

  const { formValues, handleChange } = useForm({
    list_title: "",
  });

  const handleCreateList = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      dispatch({
        type: "CREATE_LIST_REQUESTED",
        payload: { ...formValues, board_id: boardId },
      });
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RetroModal
        modalTitle="List Creation"
        triggerName="Create a List"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
      >
        <Form onSubmit={handleCreateList}>
          <Form.Field>
            <label>List Title</label>
            <input
              type="text"
              name="list_title"
              value={formValues.list_title}
              placeholder="List Title"
              onChange={handleChange}
            />
          </Form.Field>

          <Button color="instagram" type="submit">
            Create List
          </Button>
        </Form>
      </RetroModal>
    </>
  );
};

export default CreateList;
