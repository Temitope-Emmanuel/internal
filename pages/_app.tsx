import React from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import { AuthServiceProvider } from '../utils/auth';

function MyApp({ Component, pageProps }: AppProps) {

  return(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default AuthServiceProvider(MyApp)
