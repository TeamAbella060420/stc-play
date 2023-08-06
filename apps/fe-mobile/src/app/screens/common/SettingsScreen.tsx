import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { getStyle } from '@fe-monorepo/themes';

const SettingsScreen = ({ navigation }) => {
  const theme = useSelector((state: RootState) => state.app.themes);

  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, getStyle(theme)]}>
      <Text>Settings Screen</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.push('Language');
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
          Language
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.push('Themes');
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
          Themes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
