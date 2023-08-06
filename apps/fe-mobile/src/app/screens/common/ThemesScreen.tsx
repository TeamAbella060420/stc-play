import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppState } from '@fe-monorepo/hooks';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { getStyle } from '@fe-monorepo/themes';

const ThemesScreen = ({ navigation }) => {
  const { changeThemes } = useAppState();

  const theme = useSelector((state: RootState) => state.app.themes);

  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, getStyle(theme)]}>
      <Text>Settings Screen</Text>
      <TouchableOpacity
        onPress={() => {
          changeThemes('light');
        }}
        style={{
          backgroundColor: '#AD40AF'
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff'
          }}
        >
          Light
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          changeThemes('dark');
        }}
        style={{
          backgroundColor: '#AD40AF'
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff'
          }}
        >
          Dark
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          changeThemes('custom');
        }}
        style={{
          backgroundColor: '#AD40AF'
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff'
          }}
        >
          Custom
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemesScreen;
