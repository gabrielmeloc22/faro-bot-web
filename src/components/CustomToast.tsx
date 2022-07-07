import { Badge, Box, Text, useMultiStyleConfig } from "@chakra-ui/react";
import { FiCheck, FiInfo, FiX } from "react-icons/fi";

interface CustomToastProps {
  title: string;
  description?: string;
  onClose: () => void;
  variant: "success" | "info" | "error";
}

const variantsIcons = { success: FiCheck, error: FiX, info: FiInfo };

export function CustomToast(props: CustomToastProps) {
  const { description, title, variant, onClose, ...rest } = props;
  const Icon = variantsIcons[variant];

  const styles = useMultiStyleConfig("CustomToast", { variant });
  return (
    <Box __css={styles.container} {...rest}>
      <Badge sx={styles.badge}>
        <Icon size="16" />
      </Badge>
      <Box __css={styles.content}>
        <Text sx={styles.title}>{title}</Text>
        {description && <Text sx={styles.description}>{description}</Text>}
      </Box>

      <FiX aria-label="Fechar notificação" role="button" onClick={onClose} />
    </Box>
  );
}
