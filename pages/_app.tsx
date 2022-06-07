import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';

import '../styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(App);
