import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { ReactElement } from "react";

interface ConfirmationModalProps {
  title: string;
  body: string;
  icon?: ReactElement;
  isOpen: boolean;
  isLoading: boolean;
  action: () => void;
  onClose: () => void;
}

export function ConfirmationModal({
  title,
  body,
  action,
  isOpen,
  onClose,
  isLoading,
  icon,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor="red.100">
          {icon && icon}
          {title}
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter gap="4" justifyContent="center">
          <ModalCloseButton>Cancelar</ModalCloseButton>

          <Button
            onClick={action}
            isLoading={isLoading}
            variant="danger"
            border="none"
            shadow="none"
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
