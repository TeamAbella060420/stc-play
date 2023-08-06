import React from 'react';
import '@testing-library/react-native';
import SettingsScreen from './SettingsScreen';
import renderer from 'react-test-renderer'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'


const mockStore = configureMockStore([])
const mockedNavigate = jest.fn()

describe('SettingsScreen', () => {
    test('should render correctly', async () => {
  
    const store = mockStore({
        app: {
            themes: 'light'
        }
    })  

    const tree = await renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <SettingsScreen navigation={mockedNavigate}/>
         </NavigationContainer> 
        </Provider>         
    )
      expect(tree).toMatchSnapshot()
    })
})
  