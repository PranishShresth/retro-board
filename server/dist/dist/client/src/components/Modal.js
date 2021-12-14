"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
function Modal1({ onClose, onOpen, modalTitle, isOpen, triggerName, children, }) {
    return (<>
      {triggerName && (<react_1.Button isFullWidth onClick={onOpen}>
          {triggerName}
        </react_1.Button>)}

      <react_1.Modal isOpen={isOpen} onClose={onClose}>
        <react_1.ModalOverlay />
        <react_1.ModalContent>
          <react_1.ModalHeader>{modalTitle}</react_1.ModalHeader>
          <react_1.ModalCloseButton />
          <react_1.ModalBody>{children}</react_1.ModalBody>
        </react_1.ModalContent>
      </react_1.Modal>
    </>);
}
exports.default = Modal1;
//# sourceMappingURL=Modal.js.map