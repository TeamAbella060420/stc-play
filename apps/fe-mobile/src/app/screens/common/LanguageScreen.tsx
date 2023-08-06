import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppState } from '@fe-monorepo/hooks';

export const  LanguageScreen = ({ navigation }) => {
  const { changeLanguage } = useAppState();

  const changeLang = async (language: string) => {
    changeLanguage(language);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <TouchableOpacity
        onPress={() => {
          changeLang('en');
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
          English
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          changeLang('ar');
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
          Arabic
        </Text>
      </TouchableOpacity>
    </View>
  );
};
