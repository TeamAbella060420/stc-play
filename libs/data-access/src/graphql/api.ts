import {
  ApolloClient,
  ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getEnvironment } from './apiEnvironments';
import dayjs from 'dayjs';
import fetch from 'cross-fetch';
import { Platform } from 'react-native';
import { store } from '@fe-monorepo/store';
import { getValidAccessToken } from './authToken'


interface ApolloClientInstance {
  instance?: ApolloClient<NormalizedCacheObject>;
}

const clientSingleton: ApolloClientInstance = {
  instance: undefined
};

const { baseUrl, apKey } = getEnvironment()

const httpLink = new HttpLink({ uri: baseUrl, fetch });


const withToken = setContext(async () => {
  return { token: 'Bearer ' + getValidAccessToken()};
});


const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
 
  const { token } = store.getState().user.userContext;
  const { authToken } = operation.getContext()

  // console.log("token: ", token)
  
  operation.setContext({
    headers: {
      'authorization': authToken,
      'x-api-token': token,
      'x-api-lang': store.getState().app.language,
      'x-api-version': '115', // is this the build version //reply: yes
      'x-api-key': apKey,
      'x-api-endpoint': Platform.OS,
      'x-request-time': dayjs().toISOString()
    }
  });

  return forward(operation);
});


const link = ApolloLink.from([withToken, authMiddleware.concat(httpLink)]);

const defaultOptions: DefaultOptions = {
  // note that useLazyQuery ignores these "global" defaults so the errorPolicy must be added to each useLazyQuery
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
};


export const apolloClient = (): ApolloClient<NormalizedCacheObject> => {
  if (!clientSingleton.instance) {
    clientSingleton.instance = new ApolloClient({
      link: link,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, // by default Apollo sends request as text/plain!!
      cache: new InMemoryCache({ addTypename: false }),
      credentials: 'include',
      defaultOptions: defaultOptions
    });
  }
  return clientSingleton.instance;
};
