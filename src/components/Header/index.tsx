import { Container, Link, List, ListItem, Button } from "@chakra-ui/react";
import NextLink from "next/link";

import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <Container
      color="brand.400"
      maxWidth="100vw"
      boxShadow="nav"
      padding={0}
      bgColor="white"
      as="header"
    >
      <List
        display="flex"
        gap="8"
        alignItems="center"
        maxWidth="container.lg"
        paddingInline="8"
        paddingBlock="6"
        marginInline="auto"
        fontWeight="500"
      >
        <ListItem color="brand.500">
          <NextLink href="/" passHref>
            <Link
              _hover={{
                textDecoration: "none",
              }}
              fontSize="1.5rem"
              fontWeight="800"
            >
              Faro-bot
            </Link>
          </NextLink>
        </ListItem>

        <ListItem marginLeft="auto" marginRight="6">
          <NextLink href="/profile" passHref>
            <Link>Meu perfil</Link>
          </NextLink>
        </ListItem>

        <ListItem>
          {!session ? (
            <Button
              variant="secondary"
              onClick={() =>
                signIn("discord", {
                  callbackUrl: "/profile",
                })
              }
            >
              Login
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              Logout
            </Button>
          )}
        </ListItem>

        <ListItem>
          <NextLink href="https://github.com/gabrielmeloc22/faro-bot" passHref>
            <Button display="flex" gap="2">
              <FaGithub size="1.25rem" />
              GitHub
            </Button>
          </NextLink>
        </ListItem>
      </List>
    </Container>
  );
}
