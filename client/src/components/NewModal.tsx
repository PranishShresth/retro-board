import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface Props {
  children?: React.ReactNode;
  triggerName?: string;
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function Modal1({
  onClose,
  onOpen,
  modalTitle,
  isOpen,
  triggerName,
  children,
}: Props) {
  return (
    <>
      <Button onClick={onOpen}>{triggerName}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
