import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { ChakraProvider } from "@chakra-ui/react";

import NextNProgress from "nextjs-progressbar";

import { theme } from "../theme";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <NextNProgress color="var(--chakra-colors-brand-500)" />
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
