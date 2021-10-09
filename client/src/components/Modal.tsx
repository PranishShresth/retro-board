import { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

interface Props {
  children?: React.ReactNode;
  triggerName: string;
  modalTitle: string;
}
function RetroModal({ children, triggerName, modalTitle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="purple">{triggerName}</Button>}
    >
      <Modal.Header>{modalTitle}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

export default RetroModal;
