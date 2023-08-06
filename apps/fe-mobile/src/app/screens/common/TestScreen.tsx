import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ViewContainer from '../../components/view_container';
import { useSelector } from 'react-redux';
import { RootState, setPersona, useAppDispatch } from '@fe-monorepo/store';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { useAppState, useCountdown } from '@fe-monorepo/hooks';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import { useNetInfo } from '@react-native-community/netinfo';

const TestScreen = () => {
  const { themes, language } = useSelector((state: RootState) => state.app);
  const { changeThemes, changeLanguage } = useAppState();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Main'>>();
  const [isVisible, setVisibility] = useState(false);
  // const { remainingTime, formattedTime, setNewTime } = useCountdown(60);
  const netInfo = useNetInfo();
  console.log('netInfo', netInfo.isConnected);

  const handleNav = persona => {
    dispatch(setPersona(persona));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAV_ROUTES.Main }]
      })
    );
  };

  const changeTheme = () => {
    let theme;
    if (themes === 'dark') {
      theme = 'light';
    } else {
      theme = 'dark';
    }
    changeThemes(theme);
  };

  const changeLang = () => {
    let lang;
    if (language === 'en') {
      lang = 'ar';
    } else {
      lang = 'en';
    }
    changeLanguage(lang);
  };

  return (
    <>
      <ViewContainer style={styles.container}>
        <Text style={{ color: 'orange' }} onPress={() => navigation.navigate('Settings')}>
          GO TO SETTINGS
        </Text>
        {/* <Text>COUNTDOWN TIMER: {remainingTime}</Text>
        <Text>COUNTDOWN FORMATTED TIMER: {formattedTime}</Text>

        <TouchableOpacity onPress={() => setNewTime(60)} style={{ padding: 20, borderColor: 'orange', borderWidth: 1, marginTop: 15 }}>
          <Text style={{ color: 'orange' }}>SET TO 60 SECS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setNewTime(120)}
          style={{ padding: 20, borderColor: 'orange', borderWidth: 1, marginVertical: 15 }}
        >
          <Text style={{ color: 'orange' }}>SET TO MINS</Text>
        </TouchableOpacity> */}

        {/* <Text style={{ color: 'orange' }} onPress={() => handleNav('guest')}>
          GUEST USER
        </Text>
        <Text style={{ color: 'orange' }} onPress={() => handleNav('new')}>
          NEW USER
        </Text>
        <Text style={{ color: 'orange' }} onPress={() => handleNav('existing')}>
          EXISTING USER
        </Text> */}
        {/* <Text style={{ color: 'orange' }} onPress={changeTheme}>
          TEST THEMES
        </Text>
        <Text style={{ color: 'orange' }} onPress={changeLang}>
          TEST LANGUAGE
        </Text>
        <Text style={{ color: 'orange' }} onPress={() => setVisibility(!isVisible)}>
          SET VISIBILITY
        </Text> */}
      </ViewContainer>
    </>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }
});
