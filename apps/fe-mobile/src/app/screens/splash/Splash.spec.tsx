import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from './Splash';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('react-native-video', () => 'Video');
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn()
    })
  };
});

describe('Splash', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Splash />
      </NavigationContainer>
    );
    const splashScreen = getByTestId('Splash');
    expect(splashScreen).toBeTruthy();
  });
});
