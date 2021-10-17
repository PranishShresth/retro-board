import { Button, Modal } from "semantic-ui-react";

interface Props {
  children?: React.ReactNode;
  triggerName: string;
  modalTitle: string;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}
function RetroModal({
  children,
  triggerName,
  modalTitle,
  open,
  onClose,
  onOpen,
}: Props) {
  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      trigger={<Button color="purple">{triggerName}</Button>}
    >
      <Modal.Header>{modalTitle}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

export default RetroModal;
