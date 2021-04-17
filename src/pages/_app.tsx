import { useRef } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../hooks/sidebarDrawer';
import { makeServer } from '../services/mirage';

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      {isDevelopment && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default MyApp;
