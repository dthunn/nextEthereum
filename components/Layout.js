import Head from 'next/head';
import Header from './Header';
import { Container } from 'semantic-ui-react';

const Layout = ({ children }) => {
  return (
    <Container>
      <Head>
        <title>Crowd Coin</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
