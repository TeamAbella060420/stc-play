// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Suspense, useEffect, useState, lazy } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

import TagManager from 'react-gtm-module';

import { persistor, store } from '@fe-monorepo/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { Translation } from '@fe-monorepo/helper';
import { apolloClient } from '@fe-monorepo/data-access';
import { PersistGate } from 'redux-persist/integration/react';
import { Routes, Route } from 'react-router-dom';
import { gtm } from '../../helper/functions';
import '../styles.scss';

import useTheme from './hooks/useTheme';


import AnimatedRoutes from './AnimatedRoutes';

const tagManagerArgs = {
 gtmId: 'GTM-M34MXNQ'
};

TagManager.initialize(tagManagerArgs);

export function App()
{
  const language = store.getState().app.language;

  useEffect(() => {
    Translation(language);
  }, [language]);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename='/'>
          <ApolloProvider client={apolloClient()}>
            <ParallaxProvider>
              <AnimatedRoutes />
            </ParallaxProvider>
          </ApolloProvider>
        </BrowserRouter>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
