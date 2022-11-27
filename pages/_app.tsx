import type { AppProps } from 'next/app';
import { SSRProvider } from 'react-bootstrap';
import './globals.css';
import { NextPageWithLayout } from './page';
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return <SSRProvider>{getLayout(<Component {...pageProps} />)}</SSRProvider>;
}

export default MyApp;
