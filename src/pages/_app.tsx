import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import Head from '../components/Head';
import { GlobalStyle } from '../styles/globals';

import { theme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head title="Snake Online" />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
