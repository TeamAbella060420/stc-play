import React from 'react';
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'

import App from './App';

const mockStore = configureMockStore([])

describe('App', () => {
  test('should render correctly', async () => {
    const store = mockStore({
      app: {
        language: 'en',
        themes: 'light'
      }
    })

    const tree = await renderer.create(
      <Provider store={store}>
        <App />
      </Provider>  
    )
    expect(tree).toMatchSnapshot()
  })
})
