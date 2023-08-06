import React, { useEffect } from 'react';
import { View } from 'react-native';

import i18next, { changeLanguage } from 'i18next';
import { useSelector } from 'react-redux';
import { RootState, setThemes } from '@fe-monorepo/store';


import Button from '../../components/buttons';
import { useAnimatedProps } from 'react-native-reanimated';
import { useAppState, useUser } from '@fe-monorepo/hooks';

const GlobalControl = () =>
{
    const { themes, language } = useSelector((state: RootState) => state.app);
    const { changeThemes } = useAppState();

    const onChangeLanguage = (lang: string) => {
        changeLanguage(lang);
    };

    const onChangeTheme = (theme: string) => {
        changeThemes(theme);
    };

    return (
        <View style={{position: 'absolute', top: 0, right: 0, left: 0}}>
            <Button type='borderPrimary' style={{position: 'absolute', top: 20, right: 10, opacity: 0.2}} label={language} onPress={()=>{ onChangeLanguage(i18next.language === 'en' ? 'ar' : 'en') }}/>
            <Button type='borderPrimary' style={{position: 'absolute', top: 20, left: 10, opacity: 0.2}} label={themes} onPress={()=>{ onChangeTheme(themes === 'dark' ? 'light' : 'dark') }}/>
        </View>
    );
}

export default GlobalControl;
