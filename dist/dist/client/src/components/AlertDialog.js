"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
function AlertDialogBar({ title, isOpen, onClose, onClick, }) {
    const cancelRef = (0, react_2.useRef)(null);
    return (<>
      <react_1.AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <react_1.AlertDialogOverlay>
          <react_1.AlertDialogContent>
            <react_1.AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </react_1.AlertDialogHeader>

            <react_1.AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </react_1.AlertDialogBody>

            <react_1.AlertDialogFooter>
              <react_1.Button ref={cancelRef} onClick={onClose}>
                Cancel
              </react_1.Button>
              <react_1.Button colorScheme="red" onClick={onClick} ml={3}>
                Delete
              </react_1.Button>
            </react_1.AlertDialogFooter>
          </react_1.AlertDialogContent>
        </react_1.AlertDialogOverlay>
      </react_1.AlertDialog>
    </>);
}
exports.default = AlertDialogBar;
//# sourceMappingURL=AlertDialog.js.map