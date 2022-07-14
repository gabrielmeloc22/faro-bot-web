import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import { theme } from "../theme";

export type NextPageWithLayout<P = void> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout<any> };

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <NextNProgress color="var(--chakra-colors-brand-500)" />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
