import type { AppProps } from 'next/app';
import { useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MyAlert from '../components/alerts/MyAlert';
import AlertContext from '../contexts/AlertContext';
import './globals.css';
import { NextPageWithLayout } from './page';
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const [alerts, setAlerts] = useState(
    [] as { variant: string; message: string }[]
  );

  return (
    <SSRProvider>
      <AlertContext.Provider value={{ alerts, setAlerts }}>
        <MyAlert />
        {getLayout(<Component {...pageProps} />)}
      </AlertContext.Provider>
    </SSRProvider>
  );
}

export default MyApp;
