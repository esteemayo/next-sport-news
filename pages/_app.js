import { Provider } from 'react-redux';

import store from '@/app/store';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <ScrollToTop />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
