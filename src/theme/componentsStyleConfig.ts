import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Form: ComponentStyleConfig = {
  baseStyle: {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "4",
      _hover: { boxShadow: "base" },
      transition: "ease 0.2s",
      borderRadius: "16",
      paddingInline: "8",
      paddingBlock: "6",
    },
    helperText: {
      color: "brand.300",
      fontWeight: "500",
    },
  },
  variants: {},
  defaultProps: {},
};

export const Button: ComponentStyleConfig = {
  baseStyle: {
    paddingInline: "0",
    borderRadius: "12",
    fontWeight: "600",
    maxWidth: "fit-content",
    _loading: {
      _hover: { background: "brand.400" },
    },
  },
  sizes: {
    md: {
      fontSize: "15",
    },
  },
  variants: {
    primary: {
      _hover: { backgroundColor: "brand.600" },
      backgroundColor: "brand.500",
      color: "gray.100",
    },
    secondary: {
      _hover: { backgroundColor: "gray.300", color: "brand.600" },
      backgroundColor: "gray.200",
      color: "brand.500",
    },
    danger: {
      _hover: { backgroundColor: "red.600" },
      backgroundColor: "red.400",
      color: "gray.100",
      boxShadow: "0 0 0px 2px var(--chakra-colors-red-500)",
      border: "2px solid white",
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  },
};

export const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "700",
    margin: "0",
    color: "brand.400",
    fontSize: "18",
  },
};
