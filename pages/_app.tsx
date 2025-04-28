import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MissionProvider } from '../contexts/MissionContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MissionProvider>
      <Component {...pageProps} />
    </MissionProvider>
  );
}

export default MyApp;
