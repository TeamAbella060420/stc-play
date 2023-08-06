import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LanguageOption from './LanguageOption';
import { TestIDs } from '../../helpers/testIDs';
import { Provider } from 'react-redux';
import { store } from '@fe-monorepo/store';
import { NavigationContainer } from '@react-navigation/native';

describe('LanguageOption', () => {
  it('should render successfully', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <LanguageOption />
        </NavigationContainer>
      </Provider>
    );
    const languageOption = getByTestId(TestIDs.LanguageOption);
    expect(languageOption).toBeTruthy();
  });
});
