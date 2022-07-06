import {
  Avatar,
  Box,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Switch,
  Text,
  SlideFade,
  Button,
} from "@chakra-ui/react";

import type { NextPage, GetServerSideProps } from "next";
import router from "next/router";

import { SyntheticEvent, useRef, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";

import { CustomEditableInput } from "../../components/CustomEditableInput";
import { FaDiscord } from "react-icons/fa";
import { GlobalLoading } from "../../components/Loading";
import Head from "next/head";

const Profile: NextPage = () => {
  const { user, isLoading } = useUser();

  const [hasDataChanged, setHasDataChanged] = useState(false);

  const bioInput = useRef<HTMLTextAreaElement>(null);
  const statusInput = useRef<HTMLInputElement>(null);

  function handleSubmitForm(e: SyntheticEvent) {
    e.preventDefault();
    console.log(bioInput?.current?.value);
    console.log(statusInput?.current?.checked);
  }

  if (isLoading) return <GlobalLoading />;

  if (!user) {
    router.push("/api/auth/login");
    return <GlobalLoading />;
  }

  return (
    <>
      <Head>
        <title>Perfil - Faro-bot</title>
      </Head>
      <Container
        marginBlock="24"
        maxWidth="container.lg"
        paddingInline="8"
        color="brand.400"
      >
        <form
          onSubmit={(e) => handleSubmitForm(e)}
          onChange={() => {
            !hasDataChanged && setHasDataChanged(true);
          }}
        >
          <Flex flexDirection="column" gap="8">
            <Box display="flex" gap="4">
              <Heading color="brand.500" fontWeight="400" fontSize="4xl">
                Perfil
              </Heading>
              <Box marginLeft="auto" textAlign="right">
                <Text display="flex" alignItems="center" gap="2">
                  <FaDiscord size="18" />
                  {user.nickname}
                </Text>
              </Box>
              <Avatar size="md" src={user?.picture!} />
            </Box>

            <FormControl>
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <CustomEditableInput
                id="bio"
                ref={bioInput}
                placeholder="Sua bio está vazia!"
              />
              <FormHelperText>
                Deixe seus pretendentes se derretendo em apenas 120 caracteres.
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="allowCantada">Na pista?</FormLabel>
              <Switch id="allowCantada" ref={statusInput} colorScheme="brand" />
              <FormHelperText>
                Caso desmarcado, você não receberá cantadas.
                <br />
                Por enquanto, essa opção é aplicada em todos os servidores que você está
                no Discord.
              </FormHelperText>
            </FormControl>

            <FormControl color="red">
              <FormLabel htmlFor="deleteData" color="red.400">
                Deletar dados
              </FormLabel>
              <Button id="deleteData" variant="danger">
                Deletar
              </Button>
              <FormHelperText color="red.300">
                Seus dados serão permanentemente perdidos
              </FormHelperText>
            </FormControl>

            <Box marginInline="auto" marginTop="6">
              <SlideFade in={hasDataChanged}>
                <Button isLoading={false} maxWidth="fit-content" type="submit">
                  Salvar mudanças
                </Button>
              </SlideFade>
            </Box>
          </Flex>
        </form>
      </Container>
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};
