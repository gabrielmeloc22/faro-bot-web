import { Button, useBoolean, useDisclosure, useToast } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { FiAlertCircle } from "react-icons/fi";
import { api } from "../../services/axios";
import { ConfirmationModal } from "./ConfirmationModal";
import { Toast } from "../Toast";

interface DeleteBtnProps {
  discordId: string;
  id: string;
}

export function DeleteBtn({ discordId, id }: DeleteBtnProps) {
  const [isLoading, setIsLoading] = useBoolean();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast({ position: "bottom-right", isClosable: true, duration: 5000 });

  async function handleRequestDelete() {
    try {
      setIsLoading.on();
      await api.delete("/deleteUser", {
        data: { discordId },
      });
      toast({
        render: ({ onClose }) => (
          <Toast
            onClose={onClose}
            title="Seus dados foram deletados!"
            variant="success"
            description="Adeus 😭"
          />
        ),
      });
      await signOut({ callbackUrl: "/" });
      setIsLoading.off();
    } catch (err) {
      console.error(err);
    }
  }

  const icon = <FiAlertCircle />;

  return (
    <>
      <ConfirmationModal
        action={handleRequestDelete}
        isOpen={isOpen}
        title="Você realmente quer deletar sua conta?"
        body="Essa ação é irreversível e seus dados serão permanentemente perdidos."
        onClose={onClose}
        isLoading={isLoading}
        icon={icon}
      />
      <Button id={id} variant="danger" onClick={onOpen}>
        Deletar
      </Button>
    </>
  );
}
