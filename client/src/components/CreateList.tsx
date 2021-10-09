import React from "react";
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
  const { boardId } = useParams<FormParam>();

  const { formValues, handleChange } = useForm({
    list_title: "",
  });

  const handleCreateBoard = (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      dispatch({
        type: "CREATE_BOARD_REQUESTED",
        payload: { ...formValues, board_id: boardId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RetroModal modalTitle="Board Creation" triggerName="Create a List">
        <Form onSubmit={handleCreateBoard}>
          <Form.Field>
            <label>List Title</label>
            <input
              type="text"
              name="title"
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
