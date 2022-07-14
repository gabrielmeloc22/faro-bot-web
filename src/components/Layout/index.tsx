import { Container } from "@chakra-ui/react";
import { Header } from "../Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container as="main" maxWidth="100vw" bgColor="white" m={0} p={0}>
        {children}
      </Container>
    </>
  );
}
