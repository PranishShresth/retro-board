import { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

function RetroModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Create a Board</Button>}
    >
      <Modal.Header>Board Creation</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Board Title</label>
            <input type="text" placeholder="Board Title" />
          </Form.Field>
          <Form.Field>
            <label>Board Theme</label>
            <input type="color" placeholder="Board Theme" />
          </Form.Field>

          <Button color="instagram" type="submit">
            Create Board
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default RetroModal;
