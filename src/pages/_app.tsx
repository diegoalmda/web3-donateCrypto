import '@component/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name="description" content="Aplicação para criação de campanhas de doações utilizando crypto moedas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  ) 
  
}
