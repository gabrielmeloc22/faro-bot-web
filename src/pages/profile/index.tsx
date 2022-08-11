import {
  Avatar,
  Box,
  Container,
  Heading,
  Switch,
  Text,
  SlideFade,
  Button,
  useToast,
  Stack,
} from "@chakra-ui/react";

import type { GetServerSideProps } from "next";
import Head from "next/head";

import { Layout } from "../../components/Layout";
import { NextPageWithLayout } from "../_app";

import { database } from "../../services/mongodb";
import { api } from "../../services/axios";

import { SyntheticEvent, useRef, useState } from "react";

import { getSession, useSession } from "next-auth/react";
import { DiscordProfile } from "next-auth/providers/discord";

import { useLoadingList } from "../../hooks/useLoadingList";

import { BioInput } from "../../components/Form/BioInput";
import { GlobalLoading } from "../../components/Loading";
import { Toast } from "../../components/Toast";
import { FormArea } from "../../components/Form/FormArea";
import { DeleteBtn } from "../../components/Form/DeleteBtn";
import { FaDiscord } from "react-icons/fa";

interface ProfileProps {
  userInfo: {
    discordId: string;
    bio: string;
    allowCantada: boolean;
  };
}

const Profile: NextPageWithLayout<ProfileProps> = ({
  userInfo: { bio, allowCantada, discordId },
}) => {
  const { status, data: session } = useSession();

  const [hasDataChanged, setHasDataChanged] = useState(false);

  const { loadingList, addToLoadingList, removeFromLoadingList } = useLoadingList();

  const bioInput = useRef<HTMLTextAreaElement>(null);
  const statusInput = useRef<HTMLInputElement>(null);

  const chakraToast = useToast({ position: "bottom-right", isClosable: true, duration: 5000 });

  async function handleSubmitForm(event: SyntheticEvent) {
    event.preventDefault();
    addToLoadingList("submitBtn");

    try {
      await api.post("/updateUser", {
        bio: bioInput?.current?.value,
        allowCantada: statusInput?.current?.checked,
        discordId,
        updatedAt: new Date(),
      });

      chakraToast({
        render: ({ onClose }) => (
          <Toast
            onClose={onClose}
            title="Dados atualizados!"
            variant="success"
            description="ELE GOSTA 😏"
          />
        ),
      });
    } catch (err) {
      chakraToast({
        render: ({ onClose }) => (
          <Toast
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
    setHasDataChanged(false);
  }

  if (status === "loading") return <GlobalLoading />;

  return (
    <>
      <Head>
        <title>Perfil - Faro-bot</title>
      </Head>
      <Container
        marginBlock="24"
        maxWidth="container.lg"
        minH="fit-content"
        paddingInline="8"
        color="brand.400"
        mb={0}
      >
        <Stack
          spacing="8"
          as="form"
          onSubmit={(event) => handleSubmitForm(event)}
          onChange={() => {
            !hasDataChanged && setHasDataChanged(true);
          }}
          mb="16"
        >
          <Box display="flex" gap="4">
            <Heading color="brand.500" fontWeight="400" fontSize="4xl">
              Perfil
            </Heading>
            <Box marginLeft="auto" textAlign="right">
              <Text display="flex" alignItems="center" gap="2">
                <FaDiscord size="18" />
                {session?.user?.name}
              </Text>
            </Box>
            <Avatar size="md" src={session?.user?.image as string} />
          </Box>

          <FormArea
            htmlFor="bio"
            formLabel="Bio"
            formHelperText="Deixe seus pretendentes se derretendo em apenas 120 caracteres."
          >
            <BioInput
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
              defaultChecked={allowCantada}
              colorScheme="brand"
            />
          </FormArea>

          <FormArea
            htmlFor="deleteAccount"
            formLabel="Deletar conta"
            formHelperText="Seus dados serão permanentemente perdidos."
            helperTextColor="red.400"
            labelColor="red.400"
          >
            <DeleteBtn discordId={discordId} id="deleteAccount" />
          </FormArea>

          <Box w="fit-content" alignSelf="center">
            <SlideFade in={hasDataChanged}>
              <Button isLoading={loadingList.includes("submitBtn")} type="submit">
                Salvar mudanças
              </Button>
            </SlideFade>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

Profile.getLayout = (page) => <Layout>{page}</Layout>;

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/signin",
      },
      props: {},
    };
  }

  const userProfile = session.userProfile as DiscordProfile;
  const collection = database.collection("users");
  const userInfo = await collection.findOne({ discordId: userProfile?.id });

  return {
    props: {
      userInfo: {
        discordId: userProfile.id,
        bio: userInfo?.bio,
        allowCantada: userInfo?.allowCantada,
      },
    },
  };
};
