import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
