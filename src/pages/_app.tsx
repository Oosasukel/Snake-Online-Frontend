import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { isMobile } from 'utils/isMobile';
import Head from '../components/Head';
import { GlobalStyle } from '../styles/globals';
import { theme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (isMobile()) {
      document.body.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.body.requestFullscreen();
          screen.orientation.lock('landscape');
        }
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head title="Snake Online" />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
