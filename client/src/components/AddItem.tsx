import { Form, TextArea, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useForm } from "./hooks/useForm";
import styled from "styled-components";

const StyledTextArea = styled(TextArea)`
  resize: none !important;
`;

function AddItem() {
  const { formValues, handleChange } = useForm({ item_title: "" });
  const [open, setOpen] = useState(false);

  const handleAddingItem = async (ev: React.FormEvent) => {
    try {
      ev.preventDefault();
      setOpen(false);
    } catch (err) {}
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
              placeholder="Add a Item"
              value={formValues.item_title}
              handleChange={handleChange}
            />
          </Form.Field>
          <Form.Button color="green">Create</Form.Button>
        </Form>
      )}
    </>
  );
}

export default AddItem;
