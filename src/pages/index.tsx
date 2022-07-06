import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Faro-bot</title>
        <meta
          name="description"
          content="O bot que junta casais de todos os lugares do mundo"
        />
      </Head>
      <Container
        maxWidth="100%"
        margin={0}
        padding={0}
        bgImage="images/vai-dar-namoro.png"
        height="calc(100vh - 5.5rem)"
        bgRepeat="no-repeat"
        bgPosition="calc(-30vw + 70%) 50%"
      >
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="center"
          marginInline="auto"
          paddingInline="8"
          maxWidth="container.lg"
          textAlign="right"
          color="brand.500"
        >
          <Heading fontSize="clamp(4.5rem, 5vw, 5rem)" fontWeight="800">
            Faro-bot
          </Heading>
          <Text marginTop="6" fontSize="clamp(1rem, 2vw, 1.5rem)">
            O bot de discord para os apaixonados.
          </Text>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
