import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Switch,
  Text,
  SlideFade,
  Button,
  useToast,
} from "@chakra-ui/react";

import type { NextPage, GetServerSideProps } from "next";
import router from "next/router";
import Head from "next/head";

import { database } from "../../services/mongodb";
import { api } from "../../services/axios";

import { memo, SyntheticEvent, useRef, useState } from "react";

import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { CustomEditableInput } from "../../components/CustomEditableInput";
import { GlobalLoading } from "../../components/Loading";
import { CustomToast } from "../../components/CustomToast";

import { FaDiscord } from "react-icons/fa";
import { FormArea } from "../../components/FormArea";
import { useLoadingList } from "../../hooks/useLoadingList";

interface ProfileProps {
  userInfo: {
    bio: string;
    status: boolean;
  };
}

const Profile: NextPage<ProfileProps> = ({ userInfo: { bio, status } }) => {
  const { user, isLoading } = useUser();

  const [hasDataChanged, setHasDataChanged] = useState(false);

  const { loadingList, addToLoadingList, removeFromLoadingList } = useLoadingList();

  const bioInput = useRef<HTMLTextAreaElement>(null);
  const statusInput = useRef<HTMLInputElement>(null);

  const toast = useToast({ position: "bottom-right", isClosable: true, duration: 5000 });

  async function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault();
    addToLoadingList("submitBtn");

    try {
      await api.post("/updateUser", {
        bio: bioInput?.current?.value,
        allowCantada: statusInput?.current?.checked,
        discordId: user?.sub?.slice(-18),
      });

      toast({
        render: ({ onClose }) => (
          <CustomToast
            onClose={onClose}
            title="Dados atualizados!"
            variant="success"
            description="ELE GOSTA 😏"
          />
        ),
      });
    } catch (err) {
      toast({
        render: ({ onClose }) => (
          <CustomToast
            onClose={onClose}
            title="Erro!"
            variant="error"
            description="Hoje não, Faro 😨"
          />
        ),
      });
      console.error(err);
    }
    removeFromLoadingList("submitBtn");
  }

  async function handleRequestDelete() {
    try {
      addToLoadingList("deleteBtn");
      await api.delete("/deleteUser", {
        data: { discordId: user?.sub?.slice(-18) },
      });
      toast({
        render: ({ onClose }) => (
          <CustomToast
            onClose={onClose}
            title="Seus dados foram deletados!"
            variant="success"
            description="Adeus 😭"
          />
        ),
      });
      await router.push("/api/auth/logout");
      removeFromLoadingList("deleteBtn");
    } catch {}
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
          onSubmit={(event) => handleSubmitForm(event)}
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

            <FormArea
              htmlFor="bio"
              formLabel="Bio"
              formHelperText="Deixe seus pretendentes se derretendo em apenas 120 caracteres."
            >
              <CustomEditableInput
                id="bio"
                userBio={bio}
                ref={bioInput}
                placeholder="Sua bio está vazia!"
              />
            </FormArea>

            <FormArea
              formLabel="Na pista?"
              htmlFor="allowCantada"
              formHelperText="Caso desmarcado, você não receberá cantadas.\nPor enquanto, essa opção é aplicada em todos os servidores que você está
                no Discord."
            >
              <Switch
                id="allowCantada"
                ref={statusInput}
                defaultChecked={status}
                colorScheme="brand"
              />
            </FormArea>

            <FormArea
              htmlFor="deleteUser"
              formLabel="Deletar conta"
              formHelperText="Seus dados serão permanentemente perdidos."
              helperTextColor="red.400"
              labelColor="red.400"
            >
              <Button
                id="deleteUser"
                variant="danger"
                onClick={handleRequestDelete}
                isLoading={loadingList.includes("deleteBtn")}
              >
                Deletar
              </Button>
            </FormArea>

            <Box marginInline="auto" marginTop="6">
              <SlideFade in={hasDataChanged}>
                <Button
                  isLoading={loadingList.includes("submitBtn")}
                  maxWidth="fit-content"
                  type="submit"
                >
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

export default memo(Profile);

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const session = getSession(req, res);
    const userDiscordId = await session?.user.sub.slice(-18);

    const collection = database.collection("users");
    const userInfo = await collection.findOne({ discordId: userDiscordId });

    return {
      props: {
        userInfo: {
          bio: userInfo?.bio ?? "",
          status: userInfo?.allowCantada ?? "",
        },
      },
    };
  },
});
