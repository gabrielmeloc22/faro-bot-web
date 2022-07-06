import { Container, Link, List, ListItem, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import { FaGithub } from "react-icons/fa";

export function Header() {
  const { user } = useUser();

  return (
    <Container color="brand.300" maxWidth="100vw" boxShadow="nav" padding={0}>
      <List
        display="flex"
        gap="8"
        alignItems="center"
        maxWidth="container.lg"
        paddingInline="8"
        paddingBlock="6"
        marginInline="auto"
        fontWeight="500"
        role="navigation"
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

        {/* <ListItem marginLeft="4vw">
          <NextLink href="/dashboard" passHref>
            <Link>Sobre</Link>
          </NextLink>
        </ListItem> */}

        <ListItem marginLeft="auto">
          <NextLink href="/profile" passHref>
            <Link>Meu perfil</Link>
          </NextLink>
        </ListItem>

        <ListItem>
          {!user ? (
            <NextLink href="/api/auth/login">
              <Button variant="secondary">Login</Button>
            </NextLink>
          ) : (
            <NextLink href="/api/auth/logout">
              <Button variant="primary">Logout</Button>
            </NextLink>
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
