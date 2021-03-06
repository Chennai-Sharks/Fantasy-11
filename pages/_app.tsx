import React from 'react';
import Head from 'next/head';

import { AppProps } from 'next/app';

import { QueryClientProvider, QueryClient } from 'react-query';

import { StylesProvider } from '@material-ui/core';

const clientQuery = new QueryClient();
import '@styles/GlobalStyles.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <QueryClientProvider client={clientQuery}>
        <React.Fragment>
          <Head>
            <title>Fantasy 11</title>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0'
            ></meta>
          </Head>
          <Component {...pageProps} />
        </React.Fragment>
      </QueryClientProvider>
    </StylesProvider>
  );
};

export default MyApp;
