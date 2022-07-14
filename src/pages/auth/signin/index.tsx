import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import router from "next/router";

import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";

import { Box, Button, Container, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";

import { FiArrowLeft } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

interface SignInProps {
  providers: Record<BuiltInProviderType, ClientSafeProvider>;
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <>
      <Head>
        <title>Login - Faro-bot</title>
      </Head>
      <Container display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
        <Box
          position="absolute"
          zIndex={-1}
          height="100%"
          width="100%"
          bgGradient=""
          filter="grayscale(1) brightness(0.125)"
        >
          <Image
            src="https://c.tenor.com/hrOwstmBF-gAAAAd/vai-dar-namoro.gif"
            layout="fill"
            objectFit="cover"
            alt=""
            quality="85"
            priority
          />
        </Box>
        <Flex
          position="relative"
          w="23rem"
          h="15rem"
          py="6"
          px="6"
          flexDir="column"
          alignItems="center"
          bgColor="white"
          borderRadius="10"
        >
          <IconButton
            onClick={() => router.push("/")}
            icon={<FiArrowLeft />}
            aria-label=""
            variant="ghost"
            position="absolute"
            top="6"
            left="6"
            size="lg"
            color="brand.500"
          />
          <Heading fontSize="1.625rem" fontWeight="800" color="brand.500" mb="auto">
            Faça login
          </Heading>

          <VStack mt="8">
            {Object.values(providers).map((provider) => (
              <Button key={provider?.name} onClick={() => signIn(provider?.id, { callbackUrl: "/profile" })}>
                Entrar com {provider?.name}
                <FaDiscord style={{ marginLeft: "0.5rem" }} />
              </Button>
            ))}
          </VStack>
          <Text
            color="gray.500"
            fontSize="0.875rem"
            fontWeight="600"
            textAlign="center"
            mt="auto"
            lineHeight="1.35"
          >
            Primeira vez por aqui? Entre com o Discord e personalize o seu perfil 🔥
          </Text>
        </Flex>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
