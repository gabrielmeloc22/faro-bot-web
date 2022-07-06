import { ChakraProps, Flex, Spinner } from "@chakra-ui/react";

export function GlobalLoading(props: ChakraProps) {
  return (
    <Flex
      align="center"
      justify="center"
      maxWidth="100vw"
      height="calc(100vh - 5.5rem)"
      {...props}
    >
      <Spinner color="brand.500" />
    </Flex>
  );
}
