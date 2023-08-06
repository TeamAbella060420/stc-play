/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@fe-monorepo/store';
import { Translation } from '@fe-monorepo/helper';
import { RootNavigation } from './navigation/RootNavigation';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '@fe-monorepo/data-access';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading';
import images, { preloadImages } from './assets/images';
import { deeplink } from './helpers/deeplink';
import { StatusBar } from 'react-native';
import { enableFreeze, enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';
import { toastConfig } from './helpers/Toast';

enableScreens();
enableFreeze(true);

function App() {
  const { themes, language, firstInstall } = store.getState().app;

  useEffect(() => {
    if (firstInstall) {
      Translation(language);
    }
  }, [firstInstall, language]);

  const handleImageAssets = async () => {
    const imageAssets: Promise<void>[] = preloadImages(images); // preload the images
    await Promise.all(imageAssets);
  };

  useEffect(() => {
    handleImageAssets();
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ApolloProvider client={apolloClient()}>
          <NavigationContainer linking={deeplink}>
            <StatusBar translucent backgroundColor="transparent" barStyle={themes === 'dark' ? 'light-content' : 'dark-content'} />
            <RootNavigation />
          </NavigationContainer>
          <Toast topOffset={55} config={toastConfig} />
        </ApolloProvider>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;
