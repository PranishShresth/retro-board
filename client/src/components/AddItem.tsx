import { Form, TextArea, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "./hooks/useForm";
import styled from "styled-components";

const StyledTextArea = styled(TextArea)`
  resize: none !important;
`;
interface Props {
  list_id: string;
}
function AddItem({ list_id }: Props) {
  const dispatch = useDispatch();
  const { formValues, handleChange } = useForm({ item_title: "" });
  const [open, setOpen] = useState(false);

  const handleAddingItem = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      dispatch({
        type: "CREATE_ITEM_REQUESTED",
        payload: { list_id, ...formValues },
      });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!open && (
        <Button
          onClick={() => {
            setOpen(!open);
          }}
        >
          Add a Item
        </Button>
      )}
      {open && (
        <Form onSubmit={handleAddingItem}>
          <Form.Field>
            <StyledTextArea
              name="item_title"
              onChange={handleChange}
              placeholder="Add a Item"
              value={formValues.item_title}
            />
          </Form.Field>
          <Form.Button color="green">Create</Form.Button>
        </Form>
      )}
    </>
  );
}

export default AddItem;
