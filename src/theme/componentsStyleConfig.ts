import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Form: ComponentStyleConfig = {
  baseStyle: {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "4",
      _hover: { boxShadow: "base" },
      transition: "ease 0.2s",
      borderRadius: "1rem",
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

export const FormLabel: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "700",
    margin: "0",
    color: "brand.400",
    fontSize: "1.125rem",
  },
};

export const Button: ComponentStyleConfig = {
  baseStyle: {
    paddingInline: "0",
    borderRadius: "0.75rem",
    fontWeight: "600",
    maxWidth: "fit-content",
  },
  sizes: {
    md: {
      fontSize: "0.9375rem",
    },
  },
  variants: {
    primary: {
      _hover: { backgroundColor: "brand.600" },
      backgroundColor: "brand.500",
      color: "gray.100",
      _loading: {
        _hover: { background: "brand.400" },
      },
    },
    secondary: {
      _hover: { backgroundColor: "gray.300", color: "brand.600" },
      backgroundColor: "gray.200",
      color: "brand.500",
      _loading: {
        _hover: { background: "gray.100" },
      },
    },
    danger: {
      _hover: { backgroundColor: "red.600" },
      backgroundColor: "red.400",
      color: "white",
      boxShadow: "0 0 0px 2px var(--chakra-colors-red-400)",
      border: "2px solid white",
      _loading: {
        _hover: { background: "red.300" },
      },
    },
    ghost: {
      width: "fit-content",
      height: "fit-content",
      background: "none",
      _hover: { background: "none", opacity: "0.7" },
      _focus: { background: "none" },
      padding: 0,
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  },
};

export const CustomToast: ComponentStyleConfig = {
  baseStyle: {
    container: {
      display: "flex",
      gap: "1rem",
      alignItems: "top",
      justifyContent: "space-between",
      margin: "0 0.5rem 0.5rem 0",
      fontWeight: "500",
      padding: "1rem",
      borderRadius: "1rem",
      color: "white",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      marginRight: "auto",
    },
    title: {
      lineHeight: "1.125rem",
      height: "fit-content",
      padding: 0,
      fontWeight: "700",
      fontSize: "1.125rem",
    },
    description: {
      fontSize: "0.875rem",
    },
    badge: {
      display: "flex",
      alignItems: "center",
      height: "6",
      width: "6",
      color: "brand.400",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: "100vmax",
    },
  },
  variants: {
    success: {
      container: {
        backgroundColor: "green.400",
      },
      badge: {
        color: "green.400",
      },
    },
    error: {
      container: {
        backgroundColor: "red.400",
      },
      badge: {
        color: "red.400",
      },
    },
    info: {
      container: {
        backgroundColor: "blue.400",
      },
      badge: {
        color: "blue.400",
      },
    },
  },
};
